import { createPublicClient, http, formatUnits } from 'viem';
import { base } from 'viem/chains';

// آپ کا بیس نیٹ ورک کا آفیشل ریسیونگ والٹ ایڈریس
const RECEIVING_ADDRESS = '0xcBcA630521176E76D8a5F55F78703B92336A1411';

// Base Mainnet کے لیے پبلک کلائنٹ سیٹ اپ
const client = createPublicClient({
  chain: base,
  transport: http('https://mainnet.base.org') // یا اپنا QuickNode / Helius RPC لنک لگائیں
});

// والٹ کا موجودہ ETH بیلنس چیک کرنے کا فنکشن
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

// لائیو ٹرانزیکشنز کو مانیٹر کرنے کا سیٹ اپ
function watchIncomingTransactions() {
  console.log(`Monitoring incoming transfers for address: ${RECEIVING_ADDRESS}`);
  
  client.watchBlocks({
    onBlock: async (block) => {
      console.log(`New block arrived on Base: ${block.number}`);
      // یہاں آپ ٹرانزیکشن ہیش یا لاگز کو فلٹر کر کے ریسیونگ ٹریک کر سکتے ہیں
    },
    onError: (error) => console.error('Block watch error:', error)
  });
}

// فنکشن کو کال کریں
checkWalletBalance();
watchIncomingTransactions();
