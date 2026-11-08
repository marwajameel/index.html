import { createPublicClient, http, formatUnits } from 'viem';
import { base } from 'viem/chains';

// آپ کا بیس نیٹ ورک کا آفیشل ریسیونگ والٹ ایڈریس (SDN News)
const RECEIVING_ADDRESS = '0xcBcA630521176E76D8a5F55F78703B92336A1411';

// Base Mainnet کے لیے پبلک کلائنٹ سیٹ اپ (بغیر کسی پیڈ API کے)
const client = createPublicClient({
  chain: base,
  transport: http('https://mainnet.base.org')
});

// والٹ کا موجودہ بیلنس چیک کرنے کا فنکشن
async function checkWalletBalance() {
  try {
    const balance = await client.getBalance({
      address: RECEIVING_ADDRESS,
    });
    console.log(`Wallet Balance: ${formatUnits(balance, 18)} ETH`);
    return balance;
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
}

// لائیو بلاکس کو مانیٹر کرنے کا فنکشن
function watchIncomingTransactions() {
  console.log(`Monitoring incoming transfers for SDN News address: ${RECEIVING_ADDRESS}`);
  
  client.watchBlocks({
    onBlock: async (block) => {
      console.log(`New block arrived on Base: ${block.number}`);
    },
    onError: (error) => console.error('Block watch error:', error)
  });
}

// فنکشنز کو کال کریں
checkWalletBalance();
watchIncomingTransactions();
