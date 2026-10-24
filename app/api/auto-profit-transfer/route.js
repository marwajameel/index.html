import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

export async function POST(request) {
  try {
    const { recipientAddress, amountInEth, rpcUrl } = await request.json();

    // 1. `.env.local` سے خفیہ پرائیویٹ کی حاصل کرنا
    const privateKey = process.env.PRIVATE_KEY;

    if (!privateKey) {
      return NextResponse.json(
        { success: false, error: 'سرور پر پرائیویٹ کی کنفیگر نہیں کی گئی ہے۔' },
        { status: 400 }
      );
    }

    // 2. نیٹ ورک پرووائডার اور والٹ سیٹ اپ (Base Mainnet)
    const provider = new ethers.JsonRpcProvider(rpcUrl || 'https://mainnet.base.org');
    const wallet = new ethers.Wallet(privateKey, provider);

    // 3. والٹ کا موجودہ بیلنس چیک کرنا
    const balance = await provider.getBalance(wallet.address);
    
    // اگر مخصوص رقم نہ دی گئی ہو تو گیس فیس کے لیے کچھ حصہ چھوڑ کر سارا پرافٹ/بیلنس ٹرانسفر کریں
    const transferAmount = amountInEth 
      ? ethers.parseEther(amountInEth) 
      : balance - ethers.parseEther('0.0005'); // گیس فیس کے لیے ریزرو

    if (transferAmount <= 0) {
      return NextResponse.json(
        { success: false, error: 'اکاؤنٹ میں ٹرانسفر کے لیے ناکافی بیلنس موجود ہے۔' },
        { status: 400 }
      );
    }

    // 4. ٹرانزیکشن کی تشکیل اور نیوز پورٹل والٹ پر بھیجنا
    const tx = {
      to: recipientAddress || process.env.NEXT_PUBLIC_EVM_WALLET_ADDRESS,
      value: transferAmount,
    };

    const transactionResponse = await wallet.sendTransaction(tx);
    const receipt = await transactionResponse.wait();

    return NextResponse.json({
      success: true,
      txHash: receipt.hash,
      message: 'پرافٹ کامیابی کے ساتھ نیوز پورٹل والٹ میں منتقل کر دیا گیا ہے!',
    });

  } catch (error) {
    console.error('Auto Transfer Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
