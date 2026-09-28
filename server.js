require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Connection, PublicKey, LAMPORTS_PER_SOL } = require("@solana/web3.js");
const { ethers } = require("ethers");

const app = express();
app.use(express.json());
app.use(cors());

// ---------------------------------------------------------------------------
// 1. کریڈنشیلز، والٹ ایڈریسز اور کنفیگریشن (Credentials & Configuration)
// ---------------------------------------------------------------------------
const DISTRICT_INFO = {
  district: "Gujrat, Pakistan",
  bureauChief: "Jamil Ahmad Kalyal",
  officialAddress: "Nizamabad, Kalyal House 182, Sarai Alamgir, Gujrat"
};

const USER_WALLETS = {
  solana: process.env.USER_SOLANA_ADDRESS || "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
  evm: process.env.USER_EVM_ADDRESS || "0x2AbD1232a3ce7545Aadc6216Dd609AA665069e28",
  bitcoin: "bc1qt44xaw4shq3zazjxvzfhqnjszk6yggjl6excmy"
};

const CONFIG = {
  PORT: process.env.PORT || 5000,
  SOLANA_RPC: process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com",
  SOLSCAN_API_KEY: process.env.SOLSCAN_API_KEY || "",
  BSC_RPC_URL: "https://bsc-dataseed.binance.org/",
  AGENT_PRIVATE_KEY: process.env.AGENT_WALLET_PRIVATE_KEY || ""
};

// سولانا کنکشن انیشلائزیشن
const solanaConnection = new Connection(CONFIG.SOLANA_RPC, "confirmed");

// ---------------------------------------------------------------------------
// 2. اہم خدمات / سروسز (Core Services)
// ---------------------------------------------------------------------------

/**
 * سولانا لائیو بیلنس حاصل کرنے کا فنکشن
 */
async function getSolanaBalance(walletAddress) {
  try {
    const pubKey = new PublicKey(walletAddress);
    const balanceInLamports = await solanaConnection.getBalance(pubKey);
    return {
      success: true,
      address: walletAddress,
      balanceSol: balanceInLamports / LAMPORTS_PER_SOL,
      lamports: balanceInLamports
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Solscan API کے ذریعے ٹرانزیکشن ہسٹری حاصل کرنے کا فنکشن
 */
async function getSolscanTransfers(walletAddress, page = 1, pageSize = 10) {
  try {
    const url = `https://pro-api.solscan.io/v2.0/account/transfer?address=${walletAddress}&page=${page}&page_size=${pageSize}`;
    const response = await fetch(url, {
      headers: {
        "token": CONFIG.SOLSCAN_API_KEY
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * BSC / EVM والیٹ کا بیلنس چیک کرنے کا فنکشن (Ethers.js)
 */
async function getBscBalance(walletAddress) {
  try {
    const provider = new ethers.JsonRpcProvider(CONFIG.BSC_RPC_URL);
    const balanceWei = await provider.getBalance(walletAddress);
    const balanceBnb = ethers.formatEther(balanceWei);
    return {
      success: true,
      address: walletAddress,
      balanceBnb: balanceBnb
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ---------------------------------------------------------------------------
// 3. اے پی آئی راؤٹس (API Endpoints)
// ---------------------------------------------------------------------------

// ہوم راؤٹ - سسٹم سٹیٹس اور معلومات
app.get("/", (req, res) => {
  res.json({
    message: "SDN Web3 & Wallet Backend API چالو ہے",
    districtInfo: DISTRICT_INFO,
    supportedWallets: USER_WALLETS
  });
});

// سولانا بیلنس چیک کرنے کا راؤٹ
app.get("/api/solana/balance", async (req, res) => {
  const address = req.query.address || USER_WALLETS.solana;
  const result = await getSolanaBalance(address);
  res.json(result);
});

// Solscan ٹرانزیکشن ہسٹری حاصل کرنے کا راؤٹ
app.get("/api/solana/transfers", async (req, res) => {
  const address = req.query.address || USER_WALLETS.solana;
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;

  const transfers = await getSolscanTransfers(address, page, pageSize);
  res.json(transfers);
});

// EVM / BSC بیلنس چیک کرنے کا راؤٹ
app.get("/api/evm/balance", async (req, res) => {
  const address = req.query.address || USER_WALLETS.evm;
  const result = await getBscBalance(address);
  res.json(result);
});

// تمام والٹس کا جامع خلاصہ (Combined Dashboard API)
app.get("/api/wallet/dashboard", async (req, res) => {
  try {
    const solData = await getSolanaBalance(USER_WALLETS.solana);
    const bscData = await getBscBalance(USER_WALLETS.evm);

    res.json({
      success: true,
      district: DISTRICT_INFO,
      balances: {
        solana: solData.success ? solData.balanceSol : 0,
        bsc: bscData.success ? bscData.balanceBnb : 0
      },
      wallets: USER_WALLETS,
      status: "تمام والٹس کامیابی سے سنک ہو گئے ہیں"
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ---------------------------------------------------------------------------
// 4. سرور کی شروعات (Server Start)
// ---------------------------------------------------------------------------
app.listen(CONFIG.PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 بیک اینڈ سرور پورٹ ${CONFIG.PORT} پر کامیابی سے چل رہا ہے`);
  console.log(`📍 بیورو آفیشل: ${DISTRICT_INFO.bureauChief} (${DISTRICT_INFO.district})`);
  console.log(`====================================================`);
});
