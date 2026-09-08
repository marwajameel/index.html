import { ethers } from 'ethers';

// ------------------------------------------------------------------
// 1. پروجیکٹ کنفیگریشن اور کریڈنشیلز (Project Credentials & Config)
// ------------------------------------------------------------------

const CONFIG = {
  // Binance API Credentials
  BINANCE_API_KEY: process.env.BINANCE_API_KEY || "YOUR_BINANCE_API_KEY",
  BINANCE_SECRET_KEY: process.env.BINANCE_SECRET_KEY || "YOUR_BINANCE_SECRET_KEY",

  // Web3 & RPC Configurations
  RPC_URL: process.env.RPC_URL || "https://bsc-dataseed.binance.org/",
  CHAIN_ID: 56, // BNB Smart Chain Mainnet

  // Application Details
  APP_NAME: "SDN Agentic Wallet",
  VERSION: "1.0.0"
};

// ------------------------------------------------------------------
// 2. ایجنٹک والٹ کلاس (Agentic Wallet Logic)
// ------------------------------------------------------------------

class BinanceAgenticWallet {
  constructor(config = CONFIG) {
    this.config = config;
    this.provider = new ethers.JsonRpcProvider(this.config.RPC_URL);
    this.wallet = null;
  }

  // والٹ انیشیلائزیشن
  async initializeWallet(privateKey) {
    try {
      if (!privateKey) {
        throw new Error("پرائیویٹ کی (Private Key) فراہم نہیں کی گئیہ۔");
      }
      this.wallet = new ethers.Wallet(privateKey, this.provider);
      console.log(`والٹ کامیابی سے کنیکٹ ہو گیا: ${this.wallet.address}`);
      return this.wallet.address;
    } catch (error) {
      console.error("والٹ کنیکٹ کرنے میں ناکامی:", error.message);
      throw error;
    }
  }

  // بیلنس چیک کرنے کا فنکشن
  async getBalance(address = null) {
    try {
      const targetAddress = address || (this.wallet ? this.wallet.address : null);
      if (!targetAddress) {
        throw new Error("والٹ ایڈریس موجود نہیں ہے۔");
      }
      const balance = await this.provider.getBalance(targetAddress);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error("بیلنس معلوم کرنے میں مسئلہ:", error.message);
      throw error;
    }
  }

  // خودمختار / ایجنٹک ٹرانزیکشن کی عملداری
  async executeAgentTransaction(toAddress, amountInBnb) {
    try {
      if (!this.wallet) {
        throw new Error("پہلے والٹ کو کنیکٹ کریں۔");
      }

      console.log(`${amountInBnb} BNB کی ٹرانزیکشن بھیجی جا رہی ہے ایڈریس: ${toAddress}`);

      const tx = await this.wallet.sendTransaction({
        to: toAddress,
        value: ethers.parseEther(amountInBnb.toString())
      });

      console.log(`ٹرانزیکشن بھیج دی گئی! ہیش: ${tx.hash}`);
      await tx.wait();
      console.log("ٹرانزیکشن بلاک چین پر کنفرم ہو گئی ہے۔");
      
      return tx.hash;
    } catch (error) {
      console.error("ٹرانزیکشن کی عملداری میں ناکامی:", error.message);
      throw error;
    }
  }
}

// ------------------------------------------------------------------
// 3. ماڈیول ایکسپورٹ
// ------------------------------------------------------------------

export default BinanceAgenticWallet;
export { CONFIG, BinanceAgenticWallet };
