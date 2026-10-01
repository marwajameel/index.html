import { Connection, PublicKey } from "@solana/web3.js";
import { Actions, Keypair, createSession } from "@lazorkit/wallet-mobile-adapter";

// سولانا کنکشن سیٹ اپ کریں
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

// سیشن کے لیے عارضی کیپیر بنائیں
const sessionKp = Keypair.generate();
const currentSlot = BigInt(await connection.getSlot());

// اپنے منظور شدہ پروگرامز (Whitelisted Programs) کی پبلک کیز درج کریں
const JUPITER_PROGRAM_ID = new PublicKey("JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4");
const YOUR_CUSTOM_PROGRAM_ID = new PublicKey("YOUR_DEPLOYED_PROGRAM_ID_HERE");

async function initializeSecureSession() {
  try {
    const { sessionPda } = await createSession(
      {
        sessionKey: sessionKp.publicKey,
        expiresAtSlot: currentSlot + 216_000n, // ~24 گھنٹے کا سیشن
        actions: [
          // فی ٹرانزیکشن زیادہ سے زیادہ SOL کی حد تاکہ فیس یا بیلنس ضائع نہ ہو
          Actions.solMaxPerTx(500_000_000n), // 0.5 SOL
          
          // صرف مخصوص اور قابل اعتماد پروگرامز کی اجازت (Whitelist)
          Actions.programWhitelist(JUPITER_PROGRAM_ID),
          Actions.programWhitelist(YOUR_CUSTOM_PROGRAM_ID),
        ],
      },
      { redirectUrl: "myapp://cb" }
    );

    console.log("محفوظ سیشن کامیابی سے بن گیا ہے، PDA:", sessionPda.toBase58());
    return sessionPda;
  } catch (error) {
    console.error("سیشن بنانے میں خرابی پیش آئی:", error);
  }
}

initializeSecureSession();
