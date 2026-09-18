import { Connection, PublicKey } from '@solana/web3.js';
import { TatumSDK, Network, Solana } from '@tatumio/tatum';

// ==========================================
// 1. کنفیگریشن اور API کییز
// ==========================================
const TATUM_API_KEY = 'T-6aada5ee2e4a995e01b3fdf6-edd59d5d95ee46688291765c';
const TATUM_SOLANA_RPC = 'https://solana-mainnet.gateway.tatum.io';
const SPL_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';

// Tatum RPC کے ساتھ Solana Connection قائم کریں
const connection = new Connection(TATUM_SOLANA_RPC, {
  commitment: 'confirmed',
  httpHeaders: {
    'x-api-key': TATUM_API_KEY,
  },
});

// ==========================================
// 2. لائیو بیلنس اور ٹوکن فیچنگ فنکشن
// ==========================================
export async function fetchLiveWalletData(walletAddress: string) {
  console.log(`\n🔍 والٹ کا لائیو ڈیٹا حاصل کیا جا رہا ہے: ${walletAddress}`);
  console.log('--------------------------------------------------');

  try {
    const pubKey = new PublicKey(walletAddress);

    // 1. لائیو SOL بیلنس حاصل کریں
    const lamports = await connection.getBalance(pubKey);
    const solBalance = lamports / 1e9;
    console.log(`💰 لائیو SOL بیلنس: ${solBalance} SOL`);

    // 2. تمام لائیو SPL ٹوکنز حاصل کریں
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(pubKey, {
      programId: new PublicKey(SPL_PROGRAM_ID),
    });

    console.log(`\n🪙 کل ایکٹو ٹوکنز کی تعداد: ${tokenAccounts.value.length}`);
    
    const tokensList = tokenAccounts.value.map((account, index) => {
      const parsedInfo = account.account.data.parsed.info;
      const mint = parsedInfo.mint;
      const amount = parsedInfo.tokenAmount.uiAmount;

      console.log(`  [${index + 1}] Mint: ${mint} | مقدار: ${amount}`);
      return { mint, amount };
    });

    return {
      solBalance,
      tokens: tokensList,
    };
  } catch (error) {
    console.error('❌ RPC ڈیٹا حاصل کرنے میں خرابی:', error);
    throw error;
  }
}

// ==========================================
// 3. Tatum Webhook (لائیو نوٹیفیکیشن) سبسکرپشن
// ==========================================
export async function subscribeToLiveTransactions(walletAddress: string, webhookUrl: string) {
  console.log(`\n🔔 لائیو ٹرانزیکشن نوٹیفیکیشن سیٹ اپ کی جا رہی ہے...`);

  try {
    const tatum = await TatumSDK.init<Solana>({
      network: Network.SOLANA,
      apiKey: {
        v4: TATUM_API_KEY,
      },
    });

    // لائیو اینکم نگ ٹرانزیکشن کی سبسکرپشن
    const res = await tatum.notification.subscribe.incomingNativeTx({
      address: walletAddress,
      url: webhookUrl,
    });

    console.log(`✅ سبسکرپشن کامیابی سے مکمل ہو گئی!`);
    console.log(`🆔 Subscription ID: ${res.data.id}`);
    return res.data;
  } catch (error) {
    console.error('❌ Webhook سبسکرپشن میں خرابی:', error);
  }
}

// ==========================================
// 4. مین ایگزیکیوشن (Execute Main Code)
// ==========================================
async function main() {
  const targetWallet = '9Ud1hn6e4PptCY57jgczZQRHWohh5VvDhje46cjU7sXD';
  const webhookEndpoint = 'https://your-domain.com/api/webhook'; // اپنے سرور کا URL دیں

  // 1. لائیو بیلنس ٹریک کریں
  await fetchLiveWalletData(targetWallet);

  // 2. لائیو نوٹیفکیشن سیٹ کریں (ضرورت کے مطابق آن کریں)
  // await subscribeToLiveTransactions(targetWallet, webhookEndpoint);
}

// اسکرپٹ چلائیں
main();
