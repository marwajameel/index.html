const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

/**
 * صارف کے ڈیٹا کو محفوظ بنانے والا فنکشن
 * یہ فنکشن کسی بھی خطرناک اسکرپٹ یا کوڈ کو سادہ ٹیکسٹ میں بدل دیتا ہے
 */
function escapeHTML(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

// B20 آمدنی اور وائٹ لسٹ کنفیگریشن
const B20_CONFIG = {
  contractAddress: process.env.B20_REVENUE_CONTRACT || "0x81938166aC38709dcdf0746d2064bA237178F29E",
  tokenAddress: process.env.B20_TOKEN_ADDRESS || "0x81938166aC38709dcdf0746d2064bA237178F29E",
  abi: [
    "function deposit(uint256 _amount) external",
    "function oneClickClaimAndWithdraw() external",
    "function userStaked(address) view returns (uint256)",
    "function userRewards(address) view returns (uint256)"
  ]
};

// API: آمدنی کا اسٹیٹس حاصل کریں
app.get('/api/revenue-status', (req, res) => {
  const address = escapeHTML(req.query.address);
  res.json({
    success: true,
    contractAddress: B20_CONFIG.contractAddress,
    userAddress: address,
    status: "Active",
    timestamp: new Date().toISOString()
  });
});

// API: ون کلک کلیم ڈیٹا حاصل کریں
app.post('/api/claim-payload', (req, res) => {
  const userWallet = escapeHTML(req.body.wallet);
  if (!userWallet) {
    return res.status(400).json({ error: "والٹ ایڈریس فراہم کریں" });
  }
  
  res.json({
    success: true,
    action: "oneClickClaimAndWithdraw",
    targetContract: B20_CONFIG.contractAddress,
    recipient: userWallet,
    status: "Ready for On-Chain Execution"
  });
});

app.listen(port, () => {
  console.log(`B20 Revenue Application running on port ${port}`);
});
