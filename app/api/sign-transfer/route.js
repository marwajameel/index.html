import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

export async function POST(request) {
  try {
    const { toAddress, amountInEth, rpcUrl } = await request.json();

    // 1. `.env.local` سے خفیہ پرائیویٹ کی حاصل کرنا
    const privateKey = process.env.PRIVATE_KEY;

    if (!privateKey) {
      return NextResponse.json(
        { success: false, error: 'سرور پر پرائیویٹ کی موجود نہیں ہے۔' },
        { status: 400 }
      );
    }

    // 2. نیٹ ورک پرووائডার اور والٹ (سائنر) کی تشکیل
    // Base یا دیگر EVM نیٹ ورک کا RPC یو آر ایل استعمال کریں
    const provider = new ethers.JsonRpcProvider(rpcUrl || 'https://mainnet.base.org');
    const wallet = new ethers.Wallet(privateKey, provider);

    // 3. ٹرانزیکشن کی تفصیلات
    const tx = {
      to: toAddress,
      value: ethers.parseEther(amountInEth || '0.001'), // بھیجی جانے والی رقم (ETH میں)
    };

    // 4. خودکار طریقے سے ٹرانزیکشن سائن اور سینڈ کرنا
    const transactionResponse = await wallet.sendTransaction(tx);
    
    // ٹرانزیکشن مکمل ہونے کا انتظار
    const receipt = await transactionResponse.wait();

    return NextResponse.json({
      success: true,
      txHash: receipt.hash,
      message: 'ٹرانزیکشن کامیابی کے ساتھ سائن ہو کر نیٹ ورک پر منتقل ہو گئی ہے!',
    });

  } catch (error) {
    console.error('Signing Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
