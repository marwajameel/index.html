const { ethers } = require("ethers");
require("dotenv").config(); // ماحول کی خفیہ معلومات لوڈ کرنے کے لیے

// 1. نیٹ ورک اور سیکیورٹی کنفیگریشن (پرائیویٹ کی کو ہمیشہ .env میں رکھیں)
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const privateKey = process.env.PRIVATE_KEY; // یہاں آپ کی پرائیویٹ کی لوڈ ہوگی
const wallet = new ethers.Wallet(privateKey, provider);

/**
 * گیس فیس خود بخود کاٹ کر ٹرانزیکشن بھیجنے کا محفوظ فنکشن
 * @param {string} recipientAddress - وصول کرنے والے کا ایڈریس
 * @param {string} totalAmountToSend - کل بھیجی جانے والی رقم (ایتھ یا ٹوکن میں)
 */
async function sendTransactionWithAutoFee(recipientAddress, totalAmountToSend) {
    try {
        // نیٹ ورک سے موجودہ گیس کی قیمت اور تخمینہ معلوم کرنا
        const feeData = await provider.getFeeData();
        const gasLimit = 21000n; // عام ای وی ایم ٹرانزیکشن کے لیے معیاری گیس کی حد
        const estimatedFee = feeData.gasPrice * gasLimit; // کل گیس فیس (Wei میں)

        // رقم کو Wei میں تبدیل کریں
        const totalAmountWei = ethers.parseEther(totalAmountToSend);

        // چیک کریں کہ آیا کل رقم اتنی ہے کہ فیس ادا کی جا سکے
        if (totalAmountWei <= estimatedFee) {
            throw new Error("رقم اتنی کم ہے کہ گیس فیس بھی پوری نہیں ہو سکتی!");
        }

        // فیس نکالنے کے بعد اصل بھیجنے والی رقم
        const netAmountToSend = totalAmountWei - estimatedFee;

        console.log(`کل رقم: ${ethers.formatEther(totalAmountWei)}`);
        console.log(`گیس فیس: ${ethers.formatEther(estimatedFee)}`);
        console.log(`وصول کنندہ کو ملنے والی حتمی رقم: ${ethers.formatEther(netAmountToSend)}`);

        // 2. ٹرانزیکشن کی تیاری
        const tx = {
            to: recipientAddress,
            value: netAmountToSend,
            gasLimit: gasLimit,
            gasPrice: feeData.gasPrice
        };

        // 3. ٹرانزیکشن پر دستخط کر کے نیٹ ورک پر بھیجنا
        const transactionResponse = await wallet.sendTransaction(tx);
        console.log(`ٹرانزیکشن کامیابی سے بھیج دی گئی! ہیش: ${transactionResponse.hash}`);

        // ٹرانزیکشن کے کنفرم ہونے کا انتظار
        const receipt = await transactionResponse.wait();
        console.log(`ٹرانزیکشن بلاک میں شامل ہو گئی، بلاک نمبر: ${receipt.blockNumber}`);

        return receipt;

    } catch (error) {
        console.error("ٹرانزیکشن میں خرابی پیش آگئی:", error.message);
        throw error;
    }
}

// فنکشن کو کال کرنے کی مثال:
// sendTransactionWithAutoFee("0xRecipientAddressHere", "0.1");
