import { NextResponse } from 'next/server';
import { BitgetWalletSkill } from 'bitget-wallet-skill';

export async function POST(request) {
  try {
    const { fromToken, toToken, amount } = await request.json();

    // Bitget Wallet Skill سیٹ اپ
    const skill = new BitgetWalletSkill({
      apiKey: process.env.BITGET_APP_ID,
    });

    // سولانا نیٹ ورک (Chain ID: solana) کے لیے سوپ کوٹ حاصل کرنا
    const quote = await skill.swapQuote({
      chainId: 'solana',
      fromToken: fromToken || 'So11111111111111111111111111111111111111112', // ڈیفالٹ SOL ٹوکن
      toToken: toToken || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',   // ڈیفالٹ USDC (Solana)
      amount: amount || '100000000', // مقدار (Lamports میں)
      slippage: '0.5',
    });

    // .env.local سے آپ کا پبلک سولانا ایڈریس استعمال ہو رہا ہے
    const userAddress = process.env.NEXT_PUBLIC_SOLANA_WALLET_ADDRESS;
    
    const result = await skill.swapSend({
      ...quote,
      userAddress: userAddress,
    });

    return NextResponse.json({
      success: true,
      txHash: result.txHash,
      message: 'سولانا نیٹ ورک پر فنڈز کی لین دین کامیابی سے مکمل ہو گئی!',
    });

  } catch (error) {
    console.error('Solana Swap Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
