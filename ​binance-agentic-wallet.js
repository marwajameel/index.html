import { ethers } from 'ethers';

// ---------------------------------------------------------------------------
// 1. آپ کے اصل ملٹی چین والٹ ایڈریسز (User Wallet Addresses)
// ---------------------------------------------------------------------------
const USER_WALLETS = {
  evm: "0xcBcA630521176E76D8a5F55F78703B92336A1411", // Smart Account / EVM
  solana: "DtY9ntn8FtxWgUnir28tHnRJ2XME5rM9vRMfHHBE2hHa", // Solana Address
  bitcoin: "bc1qt44xaw4shq3zazjxvzfhqnjszk6yggjl6excmy"  // Bitcoin Address
};

// ---------------------------------------------------------------------------
// 2. پروجیکٹ کنفیگریشن اور کریڈنشیلز (Project Credentials & Config)
// ---------------------------------------------------------------------------
const CONFIG = {
  BINANCE_API_KEY: process.env.BINANCE_API_KEY || "your_binance_api_key_here",
  BINANCE_API_SECRET: process.env.BINANCE_API_SECRET || "your_binance_api_secret_here",
  AGENT_WALLET_PRIVATE_KEY: process.env.AGENT_WALLET_PRIVATE_KEY || "your_wallet_private_key_here",
  RPC_URL: "https://bsc-dataseed.binance.org/", // BNB Chain RPC
  CHAIN_ID: 56
};

// ---------------------------------------------------------------------------
// 3. بائنانس ایجنٹک والٹ اسکل کلاس (Binance Agentic Wallet Skill Class)
// ---------------------------------------------------------------------------
class BinanceAgenticWalletSkill {
  constructor() {
    this.apiKey = CONFIG.BINANCE_API_KEY;
    this.privateKey = CONFIG.AGENT_WALLET_PRIVATE_KEY;
    this.provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
    this.wallets = USER_WALLETS;

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
// 4. ایگزیکیوشن اور ٹیسٹنگ (Execution Main Function)
// ---------------------------------------------------------------------------
async function main() {
  console.log("=== Binance Agentic Wallet Initializing ===");
  const agenticWallet = new BinanceAgenticWalletSkill();

  // تمام رجسٹرڈ ایڈریسز پرنٹ کریں
  console.log("--- Registered Wallets ---");
  console.log(`EVM / Smart Account : ${agenticWallet.wallets.evm}`);
  console.log(`Solana Address      : ${agenticWallet.wallets.solana}`);
  console.log(`Bitcoin Address     : ${agenticWallet.wallets.bitcoin}`);
  console.log("--------------------------");

  try {
    if (agenticWallet.wallet) {
      console.log(`Active BNB Address: ${agenticWallet.wallet.address}`);
      const balance = await agenticWallet.getBalance();
      console.log(`BNB Balance: ${balance} BNB`);
    } else {
      console.log("نوٹ: پرائیویٹ کی درج کریں تاکہ BNB والٹ فعال ہو سکے۔");
    }
  } catch (error) {
    console.error("ایرر:", error.message);
  }
}

// ایجنٹ چلائیں
main();
