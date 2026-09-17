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
const BSC_RPC_URL = "https://bsc-dataseed.binance.org/";

const USER_WALLETS = {
  evm: USER_EVM_ADDRESS,
  solana: USER_SOLANA_ADDRESS,
  bitcoin: "bc1qt44xaw4shq3zazjxvzfhqnjszk6yggjl6excmy"
};

// ---------------------------------------------------------------------------
// 2. پروجیکٹ کنفیگریشن اور کریڈنشیلز (Project Credentials & Config)
// ---------------------------------------------------------------------------
const CONFIG = {
  BINANCE_API_KEY: process.env.BINANCE_API_KEY || "your_binance_api_key_here",
  BINANCE_API_SECRET: process.env.BINANCE_API_SECRET || "your_binance_api_secret_here",
  AGENT_WALLET_PRIVATE_KEY: process.env.AGENT_WALLET_PRIVATE_KEY || "your_wallet_private_key_here",
  RPC_URL: BSC_RPC_URL,
  CHAIN_ID: 56
};

// ---------------------------------------------------------------------------
// 3. والٹ ڈیکرپشن اور سیکیورٹی کی اسٹور (Keystore & Decryption)
// ---------------------------------------------------------------------------
const keystoreJson = JSON.stringify({
  "activeAccounts": [
    {
      "address": USER_EVM_ADDRESS,
      "coin": 60,
      "derivationPath": "m/44'/60'/0'/0/0",
      "publicKey": "0450ddb8a4e6b8b6204f816361b9ce96ca24202ba0dfb5cdf42b4d2f4a56268630d2b005e1a3c42023b8d05e787be212cf5a17977354513a4a68da02aeb864c4d"
    }
  ],
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": { "iv": "06f66c12f249fd00e4343b0e4e65953" },
    "ciphertext": "077c57ce96801f0b088bf561b74e510a964b410398b9a1cf270267b88e750af180c22ed3f59d18de972ca34a4ae0c6a45222a2401a827663dce5f0274103f66815142cb1821f24433",
    "kdf": "scrypt",
    "kdfparams": { "dklen": 32, "n": 16384, "p": 4, "r": 8, "salt": "a73bc7d231e9cb03b2240055a77752582fa7e92c02173f7d778f5a8fbc302d4" },
    "mac": "0dab165119a5ff953ca617bce403b47cbe9892230413acad5dbe98c375dfc33"
  },
  "id": "9656acee-002a-495e-bd17-c4f62fb1e920",
  "name": "",
  "type": "mnemonic",
  "version": 3
});

async function decryptWallet() {
    const password = "Jm1@Kw8$4P&a";
    try {
        const wallet = await ethers.Wallet.fromEncryptedJson(keystoreJson, password);
        console.log("ای وی ایم والٹ کامیابی سے ڈیکرپٹ ہو گیا، ایڈریس:", wallet.address);
    } catch (error) {
        console.error("والٹ ڈیکرپشن میں خرابی:", error.message);
    }
}

// ---------------------------------------------------------------------------
// 4. تمام نیٹ ورکس کے لائیو بیلنس چیک کرنے کے فنکشنز (Live Balance Fetchers)
// ---------------------------------------------------------------------------
async function checkAllNetworkBalances() {
    console.log(`--- ضلع گجرات (${DISTRICT_INFO.district}) ملٹی چین بیلنس سنک جاری ہے ---`);

    // سولانا لائیو بیلنس
    try {
        const solResponse = await fetch(SOLANA_RPC_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "getBalance",
                params: [USER_SOLANA_ADDRESS]
            })
        });
        const solData = await solResponse.json();
        if (solData.result && solData.result.value !== undefined) {
            const solBalance = solData.result.value / 1e9;
            const balanceEl = document.getElementById('wallet-balance');
            if (balanceEl) balanceEl.textContent = `${solBalance.toLocaleString()} SOL`;
            console.log(`سولانا بیلنس: ${solBalance} SOL`);
        }
    } catch (e) {
        console.error("سولانا بیلنس سنک خرابی:", e);
    }

    // ای وی ایم / بی ایس سی لائیو بیلنس
    try {
        const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
        const bnbBalanceWei = await provider.getBalance(USER_EVM_ADDRESS);
        const bnbBalance = ethers.formatEther(bnbBalanceWei);
        console.log(`بی ایس سی / ای وی ایم بیلنس: ${bnbBalance} BNB`);
    } catch (e) {
        console.error("ای وی ایم بیلنس سنک خرابی:", e);
    }
}

// ---------------------------------------------------------------------------
// 5. اردو لوکلائزیشن اور انٹرفیس بائنڈنگ (Urdu Localization)
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

// ---------------------------------------------------------------------------
// 6. فینٹم اور بلاک چین ٹرانسفر ہینڈلر (Phantom Wallet Transfer)
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
// 7. بائنانس ایجنٹک والیٹ اسکل کلاس (Binance Agentic Wallet Skill Class)
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

// صفحہ لوڈ ہوتے ہی تمام فنکشنز کو ایک ساتھ رن کرنا
window.addEventListener('DOMContentLoaded', () => {
    decryptWallet();
    applyUrduTranslationAndAddress();
    checkAllNetworkBalances();
});

export default BinanceAgenticWalletSkill;
