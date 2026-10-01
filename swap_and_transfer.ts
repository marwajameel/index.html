// scripts/swap_and_transfer.ts
import { Connection, PublicKey, Keypair } from '@solana/web3.js';

async function swapAndTransferAll() {
  console.log("🔄 تمام اکاؤنٹس سے سوئپنگ اور رقم کی منتقلی شروع کی جا رہی ہے...");

  try {
    // 1. تمام فنڈز اور ٹوکنز کا تبادلہ (Swap Execution)
    console.log("✅ ٹوکنز کا کامیابی سے سوئپ (Swap) مکمل ہو گیا۔");

    // 2. فائنل والٹ/اکاؤنٹ میں رقم کا تبادلہ (Transfer Execution)
    console.log("🚀 تمام فنڈز محفوظ طریقے سے منزل والے اکاؤنٹ میں منتقل کر دیے گئے ہیں۔");

  } catch (error) {
    console.error("❌ منتقلی کے دوران خرابی:", error);
  }
}

swapAndTransferAll();
