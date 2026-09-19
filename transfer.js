import { 
  Connection, 
  Keypair, 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL, 
  clusterApiUrl 
} from '@solana/web3.js';

async function transferSol() {
  // 1. سولانا مین نیٹ (Mainnet) سے کنکشن بنائیں
  const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

  // 2. بھیجنے والے والٹ کی پرائیویٹ کی (یہاں صرف آپ کا اپنا والٹ ہونا لازمی ہے)
  // نوٹ: سیکرٹ کی 64 بائٹس کی Uint8Array یا Base64 کی شکل میں ہوتی ہے
  const senderPrivateKey = Buffer.from("YOUR_BASE64_PRIVATE_KEY_HERE", "base64");
  const senderKeypair = Keypair.fromSecretKey(senderPrivateKey);

  // 3. وہ محفوظ والٹ ایڈریس جہاں رقم منتقل کرنی ہے (Receiver)
  const receiverPublicKey = new PublicKey("YOUR_RECEIVER_WALLET_ADDRESS_HERE");

  console.log("Sender Address:", senderKeypair.publicKey.toBase58());
  console.log("Receiver Address:", receiverPublicKey.toBase58());

  // 4. ٹرانسفر ٹرانزیکشن تیار کریں (مثال: 0.1 SOL)
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: senderKeypair.publicKey, // بھیجنے والے کا پبلک ایڈریس
      toPubkey: receiverPublicKey,         // وصول کنندہ کا پبلک ایڈریس
      lamports: 0.1 * LAMPORTS_PER_SOL,     // SOL کی مقدار
    })
  );

  // 5. ٹرانزیکشن کو دستخط (Sign) کر کے بلاک چین پر بھیجیں
  try {
    const signature = await connection.sendTransaction(transaction, [senderKeypair]);
    await connection.confirmTransaction(signature, 'confirmed');
    
    console.log("مبارک ہو! رقم کامیابی سے منتقل ہو گئی ہے۔");
    console.log("Transaction Signature:", signature);
  } catch (error) {
    console.error("ٹرانزیکشن ناکام ہو گئی:", error.message);
  }
}

transferSol();
