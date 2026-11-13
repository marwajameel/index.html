// ==============================================================================
// SDN NEWS & MJ04 - AMZNc AUTO TRANSFER & PROFIT TRACKING (EXISTING .ENV MATCH)
// Owner & Management: Jamil Ahmed Kalyal | www.SDNNews.com
// ==============================================================================

require("dotenv").config();
const { ethers } = require("ethers");

// آپ کی موجودہ .env فائل سے براہ راست ویری ایبلز لوڈ ہو رہے ہیں
const BASE_RPC_URL = process.env.BASE_RPC_URL || "https://mainnet.base.org";
const AMZNC_TOKEN_CONTRACT = process.env.AMZNC_TOKEN_CONTRACT || "0xb200000000000000000000d9192b6B456483C2E8";

// آپ کی موجودہ .env فائل کی WALLET_PRIVATE_KEY کو استعمال کیا جا رہا ہے
const SENDER_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || process.env.SENDER_PRIVATE_KEY;
const DESTINATION_WALLET = process.env.NEXT_PUBLIC_EVM_WALLET_ADDRESS || process.env.DESTINATION_WALLET;

const STOP_LIMIT_THRESHOLD = process.env.STOP_LIMIT_THRESHOLD || "0.5";
const MIN_GAS_BALANCE_ETH = process.env.MIN_GAS_BALANCE_ETH || "0.00005";

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function transfer(address to, uint amount) returns (bool)"
];

async function executeAutoTransferWithProfit() {
  try {
    if (!SENDER_PRIVATE_KEY) {
      console.error("❌ ایرر: .env فائل میں WALLET_PRIVATE_KEY درج نہیں ہے!");
      return;
    }
    if (!DESTINATION_WALLET) {
      console.error("❌ ایرر: منزل کا والٹ ایڈریس (Destination Wallet) متعین نہیں ہے!");
      return;
    }

    const provider = new ethers.JsonRpcProvider(BASE_RPC_URL);
    const wallet = new ethers.Wallet(SENDER_PRIVATE_KEY, provider);
    const tokenContract = new ethers.Contract(AMZNC_TOKEN_CONTRACT, ERC20_ABI, wallet);

    console.log(`👤 مینیجمنٹ / اونر: جمیل احمد کلیال (MJ04)`);
    console.log(`🌐 ڈومین: jamilahmed.base.eth`);
    console.log(`🔍 پرافٹ اور آٹومیشن اسکین جاری ہے: ${wallet.address}`);

    // 1. گیس بیلنس چیک ($9.33 بجٹ وائز)
    const ethBalanceWei = await provider.getBalance(wallet.address);
    const ethBalance = ethers.formatEther(ethBalanceWei);
    console.log(`⛽ گیس بیلنس (ETH): ${ethBalance}`);

    if (parseFloat(ethBalance) < parseFloat(MIN_GAS_BALANCE_ETH)) {
      console.log(`❌ گیس فیس کم ہے! کم از کم ${MIN_GAS_BALANCE_ETH} ETH درکار ہیں۔`);
      return;
    }

    // 2. ٹوکن بیلنس اور پرافٹ کا تخمینہ
    const symbol = await tokenContract.symbol();
    const decimals = await tokenContract.decimals();
    const rawBalance = await tokenContract.balanceOf(wallet.address);
    const formattedBalance = ethers.formatUnits(rawBalance, decimals);

    console.log(`💰 موجودہ ٹوکن بیلنس: ${formattedBalance} ${symbol}`);

    if (parseFloat(formattedBalance) < parseFloat(STOP_LIMIT_THRESHOLD)) {
      console.log(`⚠️ اسٹاپ لمٹ فعال: بیلنس (${formattedBalance}) مقررہ حد (${STOP_LIMIT_THRESHOLD}) سے کم ہے۔`);
      return;
    }

    // 3. آٹومیٹڈ ٹرانسفر اور پرافٹ ریکارڈ
    if (rawBalance > 0n) {
      console.log(`🚀 پرافٹ کی رقم اور ٹوکنز کو ${DESTINATION_WALLET} پر ٹرانسفر کیا جا रहा है...`);
      
      const gasEstimate = await tokenContract.transfer.estimateGas(DESTINATION_WALLET, rawBalance);
      const tx = await tokenContract.transfer(DESTINATION_WALLET, rawBalance, {
        gasLimit: gasEstimate
      });

      console.log(`⏳ ٹرانزیکشن ہیش: ${tx.hash}`);
      const receipt = await tx.wait();
      
      console.log(`✅ ٹرانسفر اور پرافٹ اپ ڈیٹ کامیابی سے مکمل! بلاک: ${receipt.blockNumber}`);
    } else {
      console.log(`⚠️ ٹرانسفر کے لیے کوئی بیلنس موجود نہیں۔`);
    }
  } catch (error) {
    console.error("❌ سسٹم ایرر:", error.message);
  }
}

console.log("⚙️ محفوظ (.env) پرافٹ ٹریکنگ اور آٹو ٹرانسفر سسٹم فعال ہو گیا ہے...");
executeAutoTransferWithProfit();
setInterval(executeAutoTransferWithProfit, 60000);
