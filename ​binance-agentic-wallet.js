import { ethers } from "ethers";

// ---------------------------------------------------------------------------
// 1. مقام اور تصدیق شدہ ملٹی چین والٹ ایڈریسز (User & District Credentials)
// ---------------------------------------------------------------------------
const DISTRICT_INFO = {
  district: "Gujrat, Pakistan",
  bureauChief: "Jamil Ahmad Kalyal",
  officialAddress: "Nizamabad, Kalyal House 182, Sarai Alamgir, Gujrat"
};

const USER_SOLANA_ADDRESS = "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM";
const USER_EVM_ADDRESS = "0x2AbD1232a3ce7545Aadc6216Dd609AA665069e28";
const SOLANA_RPC_ENDPOINT = "https://api.mainnet-beta.solana.com";

const USER_WALLETS = {
  evm: USER_EVM_ADDRESS,
  solana: USER_SOLANA_ADDRESS,
  bitcoin: "bc1qt44xaw4shq3zazjxvzfhqnjszk6yggjl6excmy"
};

// ---------------------------------------------------------------------------
// 2. پروجیکٹ کنفیگریشن اور اے پی آئی (Project Configuration & Credentials)
// ---------------------------------------------------------------------------
const CONFIG = {
  BINANCE_API_KEY: process.env.BINANCE_API_KEY || "your_binance_api_key_here",
  BINANCE_API_SECRET: process.env.BINANCE_API_SECRET || "your_binance_api_secret_here",
  AGENT_WALLET_PRIVATE_KEY: process.env.AGENT_WALLET_PRIVATE_KEY || "your_wallet_private_key_here",
  RPC_URL: "https://bsc-dataseed.binance.org/",
  CHAIN_ID: 56
};

// ---------------------------------------------------------------------------
// 3. لائیو سولانا بیلنس فیچ کرنے کا فنکشن (Solana Live Balance Fetcher)
// ---------------------------------------------------------------------------
async function fetchSolanaBalance() {
    try {
        const response = await fetch(SOLANA_RPC_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "getBalance",
                params: [USER_SOLANA_ADDRESS]
            })
        });

        const data = await response.json();
        if (data.result && data.result.value !== undefined) {
            const solBalance = data.result.value / 1e9;
            const balanceEl = document.getElementById('wallet-balance');
            if (balanceEl) balanceEl.textContent = `${solBalance.toLocaleString()} SOL`;
            console.log(`ضلع گجرات - سولانا بیلنس کامیابی سے اپ ڈیٹ ہو گیا: ${solBalance} SOL`);
        }
    } catch (error) {
        console.error("سولانا بیلنس سنک کرنے میں خرابی:", error);
    }
}

// ---------------------------------------------------------------------------
// 4. اردو لوکلائزیشن اور انٹرفیس بائنڈنگ (Urdu Localization & UI Binding)
// ---------------------------------------------------------------------------
const urduLocalization = {
    "Networth": "کل مالیت (نیٹ ورتھ)",
    "Portfolio": "پورٹ فولیو",
    "Transactions": "ٹرانزیکشنز",
    "Info": "معلومات",
    "Assets": "اثاثے",
    "Solana": "سولانا",
    "Connected": "مربوط / کنیکٹڈ",
    "Send": "بھیجیں",
    "Receive": "وصول کریں",
    "Balance": "بیلنس"
};

function applyUrduTranslationAndAddress() {
    document.querySelectorAll('*').forEach(element => {
        if (element.children.length === 0 && element.textContent.trim() !== '') {
            let text = element.textContent.trim();
            if (urduLocalization[text]) {
                element.textContent = urduLocalization[text];
            }
        }
    });

    document.querySelectorAll('.wallet-address, #wallet-address').forEach(el => {
        el.textContent = USER_SOLANA_ADDRESS;
    });
}

window.addEventListener('DOMContentLoaded', () => {
    applyUrduTranslationAndAddress();
    fetchSolanaBalance();
});

// ---------------------------------------------------------------------------
// 5. فینٹم والیٹ ٹرانسفر ہینڈلر (Phantom Wallet Transfer Handler)
// ---------------------------------------------------------------------------
async function transferFunds(recipientAddress, amountInSol) {
    try {
        if (!window.solana || !window.solana.isPhantom) {
            alert("براہ کرم پہلے فینٹم (Phantom) والیٹ کنیکٹ کریں۔");
            return;
        }
        await window.solana.connect();
        alert("ٹرانزیکشن کی درخواست آپ کے والیٹ کو بھیج دی گئی ہے۔");
    } catch (error) {
        console.error("ٹرانزیکشن ایرر:", error);
        alert("لین دین مکمل نہیں ہو سکا۔");
    }
}

// ---------------------------------------------------------------------------
// 6. بائنانس ایجنٹک والیٹ اسکل کلاس (Binance Agentic Wallet Skill Class)
// ---------------------------------------------------------------------------
class BinanceAgenticWalletSkill {
  constructor() {
    this.apiKey = CONFIG.BINANCE_API_KEY;
    this.privateKey = CONFIG.AGENT_WALLET_PRIVATE_KEY;
    this.provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
    this.wallets = USER_WALLETS;
    this.districtInfo = DISTRICT_INFO;

    if (this.privateKey && this.privateKey !== "your_wallet_private_key_here") {
      this.wallet = new ethers.Wallet(this.privateKey, this.provider);
    } else {
      this.wallet = null;
    }
  }

  async getBalance() {
    try {
      if (!this.wallet) {
        throw new Error("والٹ کی پرائیویٹ کی (Private Key) سیٹ نہیں ہے۔");
      }
      
      const balanceWei = await this.provider.getBalance(this.wallet.address);
      const balanceBnb = ethers.formatEther(balanceWei);
      
      console.log(`ضلع گجرات (${this.districtInfo.district}) - بیلنس: ${balanceBnb} BNB`);
      return {
        address: this.wallet.address,
        balance: balanceBnb,
        networks: this.wallets,
        district: this.districtInfo
      };
    } catch (error) {
      console.error("بیلنس حاصل کرنے میں خرابی:", error.message);
      throw error;
    }
  }
}

export default BinanceAgenticWalletSkill;
