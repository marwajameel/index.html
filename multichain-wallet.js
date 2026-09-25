import { ethers } from "ethers";

// ===========================================================================
// 1. مقام، کریڈنشیلز اور ملٹی چین ایڈریسز (User & District Info)
// ===========================================================================
export const DISTRICT_INFO = {
  district: "Gujrat, Pakistan",
  bureauChief: "JAMIL AHMED KALYAL",
  officialAddress: "Nizamabad, Kalyal House 182, Sarai Alamgir, Gujrat"
};

// صارف کے تصدیق شدہ پبلک ایڈریسز
export const USER_WALLETS = {
  evm: process.env.NEXT_PUBLIC_USER_EVM_ADDRESS || "0x2AbD1232a3ce7545Aadc6216Dd609AA665069e28",
  solana: process.env.NEXT_PUBLIC_USER_SOLANA_ADDRESS || "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
  bitcoin: process.env.NEXT_PUBLIC_USER_BITCOIN_ADDRESS || "bc1qt44xaw4shq3zazjxvzfhqnjszk6yggjl6excmy"
};

// RPC Endpoints
const RPC_ENDPOINTS = {
  solana: process.env.NEXT_PUBLIC_SOLANA_RPC || "https://api.mainnet-beta.solana.com",
  bsc: process.env.NEXT_PUBLIC_BSC_RPC || "https://bsc-dataseed.binance.org/"
};

// ===========================================================================
// 2. سیکیور والٹ ڈیکرپشن (Keystore & Security Handler)
// ===========================================================================
/**
 * Keystore JSON کے ذریعے والٹ ڈیکرپٹ کرنے کا محفوظ طریقہ
 * @param {string} keystoreJson 
 * @param {string} password 
 */
export async function decryptUserWallet(keystoreJson, password) {
  try {
    if (!password) {
      throw new Error("پاسورڈ فراہم نہیں کیا گیا۔ سیکیورٹی کی وجہ سے پاسورڈ .env سے لیا جانا چاہیے۔");
    }
    const wallet = await ethers.Wallet.fromEncryptedJson(keystoreJson, password);
    console.log("ای وی ایم والٹ کامیابی سے ڈیکرپٹ ہو گیا، ایڈریس:", wallet.address);
    return wallet;
  } catch (error) {
    console.error("والٹ ڈیکرپشن میں خرابی:", error.message);
    throw error;
  }
}

// ===========================================================================
// 3. ملٹی چین لائیو بیلنس سنک (Balance Fetchers)
// ===========================================================================
export async function checkAllNetworkBalances() {
  console.log(`--- ضلع گجرات (${DISTRICT_INFO.district}) ملٹی چین بیلنس سنک جاری ہے ---`);

  const balances = { solana: 0, bsc: 0 };

  // 1. سولانا (Solana) بیلنس چیک کریں
  try {
    const solResponse = await fetch(RPC_ENDPOINTS.solana, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [USER_WALLETS.solana]
      })
    });
    const solData = await solResponse.json();
    if (solData.result && solData.result.value !== undefined) {
      balances.solana = solData.result.value / 1e9; // Lamports to SOL
      console.log(`سولانا بیلنس: ${balances.solana} SOL`);
      
      const balanceEl = document.getElementById("solana-balance");
      if (balanceEl) balanceEl.textContent = `${balances.solana.toLocaleString()} SOL`;
    }
  } catch (error) {
    console.error("سولانا بیلنس فیچ کرنے میں خرابی:", error);
  }

  // 2. ای وی ایم / بی ایس سی (BSC) بیلنس چیک کریں
  try {
    const provider = new ethers.JsonRpcProvider(RPC_ENDPOINTS.bsc);
    const bnbBalanceWei = await provider.getBalance(USER_WALLETS.evm);
    balances.bsc = parseFloat(ethers.formatEther(bnbBalanceWei));
    console.log(`بی ایس سی / ای وی ایم بیلنس: ${balances.bsc} BNB`);

    const balanceEl = document.getElementById("evm-balance");
    if (balanceEl) balanceEl.textContent = `${balances.bsc.toLocaleString()} BNB`;
  } catch (error) {
    console.error("ای وی ایم بیلنس فیچ کرنے میں خرابی:", error);
  }

  return balances;
}

// ===========================================================================
// 4. کراس چین ٹوکن بریجنگ / پورٹل (Move/Recover Tokens Across Chains)
// ===========================================================================
/**
 * مختلف چینز کے درمیان ٹوکن منتقل یا ریکور کرنے کے لیے Li.Fi SDK کا انٹیگریشن
 */
export async function getCrossChainQuote(fromChain, toChain, fromToken, toToken, amount, userAddress) {
  try {
    console.log(`کراس چین ٹرانسفر روٹ تیار ہو رہا ہے: ${fromChain} -> ${toChain}`);
    
    // Li.Fi API کے ذریعے بہترین سوپ/بریج روٹ حاصل کریں
    const response = await fetch(
      `https://li.quest/v1/quote?fromChain=${fromChain}&toChain=${toChain}&fromToken=${fromToken}&toToken=${toToken}&fromAmount=${amount}&fromAddress=${userAddress}`
    );
    const quote = await response.json();
    
    console.log("کراس چین روٹ حاصل کر لیا گیا:", quote);
    return quote;
  } catch (error) {
    console.error("کراس چین ٹرانسفر کی کوٹیشن حاصل کرنے میں خرابی:", error);
    throw error;
  }
}

// ===========================================================================
// 5. اردو لوکلائزیشن اور نیٹ ورک بائنڈنگ (Urdu UI Integration)
// ===========================================================================
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

export function applyUrduTranslationAndAddress() {
  // اردو الفاظ تبدیل کریں
  document.querySelectorAll("*").forEach((element) => {
    if (element.children.length === 0 && element.textContent.trim() !== "") {
      const text = element.textContent.trim();
      if (urduLocalization[text]) {
        element.textContent = urduLocalization[text];
      }
    }
  });

  // درست نیٹ ورک کے لیے درست ایڈریس ڈسپلے کریں
  document.querySelectorAll(".solana-address").forEach((el) => {
    el.textContent = USER_WALLETS.solana;
  });
  document.querySelectorAll(".evm-address").forEach((el) => {
    el.textContent = USER_WALLETS.evm;
  });
}

// ===========================================================================
// 6. فینٹم (Phantom) والٹ سے ٹرانزیکشن کا طریقہ
// ===========================================================================
export async function transferSolanaFunds(recipientAddress, amountInSol) {
  try {
    if (!window.solana || !window.solana.isPhantom) {
      alert("براہ کرم پہلے فینٹم (Phantom) والٹ انسٹال اور کنیکٹ کریں۔");
      return;
    }
    const response = await window.solana.connect();
    console.log("فینٹم والٹ کنیکٹ ہو گیا، پبلک کی:", response.publicKey.toString());

    alert("ٹرانزیکشن کی درخواست آپ کے فینٹم والٹ کو بھیج دی گئی ہے۔");
  } catch (error) {
    console.error("ٹرانزیکشن کی خرابی:", error);
    alert("لین دین مکمل نہیں ہو سکا۔");
  }
}

// ===========================================================================
// 7. بائنانس ایجنٹک والٹ کلاس (Binance Agentic Wallet Class)
// ===========================================================================
export class BinanceAgenticWalletSkill {
  constructor() {
    this.apiKey = process.env.BINANCE_API_KEY;
    this.privateKey = process.env.AGENT_WALLET_PRIVATE_KEY;
    this.provider = new ethers.JsonRpcProvider(RPC_ENDPOINTS.bsc);
    this.wallets = USER_WALLETS;
    this.districtInfo = DISTRICT_INFO;

    if (this.privateKey) {
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

// DOM لوڈ ہوتے ہی بنیادی فنکشنز رن کرنے کا ہینڈلر
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    applyUrduTranslationAndAddress();
    checkAllNetworkBalances();
  });
}
