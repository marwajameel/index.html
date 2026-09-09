import { VersionedTransaction, Connection } from '@solana/web3.js';

// سولانا کنکشن
const RPC_ENDPOINT = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
const connection = new Connection(RPC_ENDPOINT, 'confirmed');

interface SwapParams {
  walletProvider: any; // Phantom / Provider Object
  inputMint: string;    // بھیجے جانے والے ٹوکن کا Mint Address
  outputMint: string;   // حاصل کیے جانے والے ٹوکن کا Mint Address
  amount: number;       // Lamports میں رقم (مثلاً 1 SOL = 1,000,000,000)
  slippageBps?: number; // Slippage (مثال: 100 = 1%)
}

export async function executeJupiterSwap({
  walletProvider,
  inputMint,
  outputMint,
  amount,
  slippageBps = 100
}: SwapParams) {
  try {
    if (!walletProvider || !walletProvider.publicKey) {
      throw new Error('براہ کرم پہلے والٹ کنیکٹ کریں۔');
    }

    // 1. ہمارے تیار کردہ Backend API Route کو کال کریں
    const response = await fetch('/api/jupiter/swap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userPublicKey: walletProvider.publicKey.toString(),
        inputMint,
        outputMint,
        amount,
        slippageBps
      })
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'سواپ پروسیس کرنے میں ناکامی ہوئی۔');
    }

    // 2. Base64 ٹرانزیکشن کو Deserialize کریں
    const swapTransactionBuf = Buffer.from(data.swapTransaction, 'base64');
    const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

    // 3. والٹ سے سائن کروائیں (Phantom Pop-up)
    const signedTransaction = await walletProvider.signTransaction(transaction);

    // 4. سولانا نیٹ ورک پر لائیو براڈکاسٹ کریں
    const rawTransaction = signedTransaction.serialize();
    const txid = await connection.sendRawTransaction(rawTransaction, {
      skipPreflight: true,
      maxRetries: 3
    });

    console.log(`ٹرانزیکشن لائیو مکمل ہو گئی! TX ID: https://solscan.io/tx/${txid}`);
    return { success: true, txid };

  } catch (error: any) {
    console.error('Swap Error:', error);
    return { success: false, error: error.message || 'ٹرانزیکشن فیل ہو گئی۔' };
  }
}
