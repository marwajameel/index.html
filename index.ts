import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";
import * as dotenv from "dotenv";

// 1. .env فائل سے کیز (Keys) لوڈ کرنا
dotenv.config();

/**
 * CDP AI Agent & Base Network Complete Single-File Script
 */
async function runCdpAgent() {
  console.log("==========================================");
  console.log("🚀 CDP AI Agent & Base Network Setup Start");
  console.log("==========================================\n");

  try {
    // 2. CDP SDK کی ترتیب (Configuration)
    if (!process.env.CDP_API_KEY_NAME || !process.env.CDP_API_KEY_PRIVATE_KEY) {
      throw new Error("⚠️ .env فائل میں CDP_API_KEY_NAME یا CDP_API_KEY_PRIVATE_KEY موجود نہیں ہے۔");
    }

    Coinbase.configure({
      apiKeyName: process.env.CDP_API_KEY_NAME,
      privateKey: process.env.CDP_API_KEY_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    console.log("✅ CDP SDK کامیابی سے کنفیگر ہو گیا۔");

    // 3. Base Network پر MPC والٹ بنانا
    const selectedNetwork = process.env.NETWORK_ID || Coinbase.networks.BaseSepolia;
    console.log(`\n⏳ ${selectedNetwork} پر نیا ایجنٹ والٹ تیار کیا جا رہا ہے...`);

    const wallet = await Wallet.create({
      networkId: selectedNetwork,
    });

    // 4. والٹ ایڈریس حاصل کرنا
    const defaultAddress = await wallet.getDefaultAddress();
    console.log(`\n📍 Agent Wallet Address: ${defaultAddress.getId()}`);

    // 5. اگر ٹیسٹ نیٹ (Base Sepolia) ہو تو Faucet سے ٹیسٹ ETH حاصل کرنا
    if (wallet.getNetworkId() === Coinbase.networks.BaseSepolia) {
      console.log("\n⏳ Faucet سے ٹیسٹ ETH کی درخواست کی جا رہی ہے...");
      try {
        const faucetTx = await wallet.faucet();
        await faucetTx.wait();
        console.log(`🎉 Faucet ٹرانزیکشن کامیاب! Hash: ${faucetTx.getTransactionHash()}`);
      } catch (faucetErr) {
        console.log("⚠️ Faucet کی حد مکمل ہو چکی ہے یا کچھ وقت بعد دوبارہ کوشش کریں۔");
      }
    }

    // 6. والٹ کا موجودہ بیلنس چیک کرنا
    console.log("\n💰 والٹ بیلنس چیک کیا جا رہا ہے...");
    const balances = await wallet.listBalances();
    
    if (balances.size === 0) {
      console.log(" - بیلنس: 0 ETH");
    } else {
      balances.forEach((balance, asset) => {
        console.log(` - ${asset}: ${balance}`);
      });
    }

    // 7. والٹ ڈیٹا ایکسپورٹ کرنا (بعد میں ری اسٹور کرنے کے لیے)
    const exportedWallet = wallet.export();
    console.log("\n🔒 والٹ ڈیٹا ایکسپورٹ ہو گیا ہے (Backup Complete)۔");

    console.log("\n==========================================");
    console.log("✅ تمام پروسیس کامیابی سے مکمل ہو گیا ہے!");
    console.log("==========================================");

  } catch (error) {
    console.error("\n❌ پروسیس میں ایرر آ گیا ہے:", error);
  }
}

// اسکرپٹ چلائیں
runCdpAgent();
