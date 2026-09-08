import { ethers } from 'ethers';

// ---------------------------------------------------------------------------
// 1. پروجیکٹ کنفیگریشن اور کریڈنشیلز (Project Credentials & Config)
// ---------------------------------------------------------------------------
const CONFIG = {
  // Binance API Credentials
  BINANCE_API_KEY: process.env.BINANCE_API_KEY || "your_binance_api_key_here",
  BINANCE_API_SECRET: process.env.BINANCE_API_SECRET || "your_binance_api_secret_here",

  // Web3 Wallet Setup
  AGENT_WALLET_PRIVATE_KEY: process.env.AGENT_WALLET_PRIVATE_KEY || "your_wallet_private_key_here",
  RPC_URL: "https://bsc-dataseed.binance.org/", // BNB Chain RPC
  CHAIN_ID: 56
};

// ---------------------------------------------------------------------------
// 2. بائنانس ایجنٹک والٹ اسکل کلاس (Binance Agentic Wallet Skill Class)
// ---------------------------------------------------------------------------
class BinanceAgenticWalletSkill {
  constructor() {
    this.apiKey = CONFIG.BINANCE_API_KEY;
    this.privateKey = CONFIG.AGENT_WALLET_PRIVATE_KEY;
    this.provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);

    if (this.privateKey && this.privateKey !== "your_wallet_private_key_here") {
      this.wallet = new ethers.Wallet(this.privateKey, this.provider);
    } else {
      this.wallet = null;
    }
  }

  // والٹ بیلنس چیک کرنے کا فنکشن
  async getBalance() {
    if (!this.wallet) {
      throw new Error("والٹ کی پرائیویٹ کی (Private Key) سیٹ نہیں ہے۔");
    }
    const balance = await this.provider.getBalance(this.wallet.address);
    return ethers.formatEther(balance);
  }

  // خودکار ٹرانزیکشن بھیجنے کا فنکشن
  async sendTransaction(toAddress, amountInBNB) {
    if (!this.wallet) {
      throw new Error("والٹ کی پرائیویٹ کی (Private Key) سیٹ نہیں ہے۔");
    }
    const tx = await this.wallet.sendTransaction({
      to: toAddress,
      value: ethers.parseEther(amountInBNB)
    });
    return tx.hash;
  }
}

// ---------------------------------------------------------------------------
// 3. ایگزیکیوشن اور ٹیسٹنگ (Execution Main Function)
// ---------------------------------------------------------------------------
async function main() {
  console.log("=== Binance Agentic Wallet Initializing ===");
  const agenticWallet = new BinanceAgenticWalletSkill();

  try {
    if (agenticWallet.wallet) {
      console.log(`Address: ${agenticWallet.wallet.address}`);
      const balance = await agenticWallet.getBalance();
      console.log(`BNB Balance: ${balance} BNB`);
    } else {
      console.log("نوٹ: پرائیویٹ کی درج کریں تاکہ والٹ فعال ہو سکے۔");
    }
  } catch (error) {
    console.error("ایرر:", error.message);
  }
}

// ایجنٹ چلائیں
main();
