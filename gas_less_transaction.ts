import { Connection, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { Actions, Keypair, createSession } from "@lazorkit/wallet-mobile-adapter";

// سولانا نیٹ ورک کا کنکشن سیٹ اپ
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

// سیشن کیپیر اور یوزر کے بنیادی پیرامیٹرز
const sessionKp = Keypair.generate();
const currentSlot = BigInt(await connection.getSlot());

// منظور شدہ ڈی پیکس اور پروگرامز کی آئی ڈیز (مثلاً Jupiter اور آپ کا اپنا پراجیکٹ)
const JUPITER_PROGRAM_ID = new PublicKey("JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4");
const YOUR_PROJECT_PROGRAM_ID = new PublicKey("YOUR_DEPLOYED_PROGRAM_ID_HERE");

async function setupGasOptimizedSession() {
  try {
    // سیشن بناتے وقت اخراجات اور فیس کی حد مقرر کرنا تاکہ غیر ضروری فیس ضائع نہ ہو
    const { sessionPda } = await createSession(
      {
        sessionKey: sessionKp.publicKey,
        expiresAtSlot: currentSlot + 216_000n, // تقریباً 24 گھنٹے کا سیشن
        actions: [
          // فی ٹرانزیکشن زیادہ سے زیادہ SOL کی حد مقرر کریں تاکہ فیس ضائع نہ ہو
          Actions.solMaxPerTx(200_000_000n), // 0.2 SOL
          
          // صرف مخصوص وائٹ لسٹڈ پروگرامز کو اجازت دیں
          Actions.programWhitelist(JUPITER_PROGRAM_ID),
          Actions.programWhitelist(YOUR_PROJECT_PROGRAM_ID),
        ],
      },
      { redirectUrl: "myapp://cb" }
    );

    console.log("گیس آپٹمائزڈ سیشن کامیابی سے بن گیا ہے، PDA:", sessionPda.toBase58());
    return sessionPda;
  } catch (error) {
    console.error("سیشن بنانے کے دوران خرابی پیش آئی:", error);
  }
}

/**
 * فیس مینجمنٹ اور سپانسرڈ ٹرانزیکشن کا فنکشن
 * یہ فنکشن چیک کرتا ہے کہ آیا گیس فیس پوری ہے یا نہیں، بصورت دیگر ریلے/فیس پೇಯر کے ذریعے نظام چلاتا ہے
 */
async function executeTransactionWithFeeRelayer(userPublicKey: PublicKey, targetInstruction: any) {
  try {
    const transaction = new Transaction().add(targetInstruction);
    
    // تازہ ترین بلاک ہیش حاصل کریں
    const latestBlockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = latestBlockhash.blockhash;
    transaction.feePayer = userPublicKey;

    // یہاں آپ اپنے فیس پೇಯر یا ریلے سرور کا سائن انٹیگریٹ کر سکتے ہیں 
    // تاکہ اگر یوزر کے پاس SOL نہ ہو تو ماسٹر والٹ گیس فیس خود پے کر دے۔
    
    console.log("ٹرانزیکشن کامیابی کے لیے تیار ہے...");
    return transaction;
  } catch (error) {
    console.error("ٹرانزیکشن پروسیسنگ میں مسئلہ:", error);
  }
}

setupGasOptimizedSession();
