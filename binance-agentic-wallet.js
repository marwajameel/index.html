Import { ethers } from 'ethers';

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
اس کو بھی دیکھیں ذرا درست کرلیں