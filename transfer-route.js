import { ethers } from "ethers";

export async function POST(request) {
  try {
    const { privateKey, exchangeDepositAddress, amountToSend } = await request.json();

    // 1. Base Mainnet RPC کا کنکشن
    const provider = new ethers.providers.JsonRpcProvider("https://mainnet.base.org");
    
    // 2. صارف کا والٹ سائنر بنانا
    const wallet = new ethers.Wallet(privateKey, provider);

    // 3. گیس فیس کی অপ্টিمাইজیشن (Gas Price Fetch)
    const gasPrice = await provider.getGasPrice();
    const gasLimit = 21000; // عام ETH/Native ٹرانسفر کے لیے استاندارد لمیٹ
    const gasCost = gasPrice.mul(gasLimit);

    // 4. ٹرانزیکشن کی رقم اور گیس کا حساب
    const parsedAmount = ethers.utils.parseEther(amountToSend.toString());
    
    // اگر والٹ میں گیس فیس سے کم رقم ہے تو روک دیں
    const balance = await wallet.getBalance();
    if (balance.lt(parsedAmount.add(gasCost))) {
      return Response.json({ success: false, error: "والٹ میں گیس فیس یا رقم ناکافی ہے" }, { status: 400 });
    }

    // 5. خودکار ٹرانسفر کی کمانڈ (ایکسچینج اسپاٹ والٹ یا ڈپازٹ ایڈریس کے لیے)
    const tx = await wallet.sendTransaction({
      to: exchangeDepositAddress,
      value: parsedAmount,
      gasPrice: gasPrice,
      gasLimit: gasLimit
    });

    return Response.json({
      success: true,
      message: "رقم کامیابی سے ایکسچینج ڈپازٹ پر منتقل ہو گئی ہے!",
      txHash: tx.hash
    });

  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
