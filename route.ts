import { NextRequest, NextResponse } from 'next/server';
import { Connection, VersionedTransaction } from '@solana/web3.js';

// Solana RPC Endpoint (Mainnet)
const RPC_ENDPOINT = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
const connection = new Connection(RPC_ENDPOINT, 'confirmed');

export async function POST(req: NextRequest) {
  try {
    const { userPublicKey, inputMint, outputMint, amount, slippageBps = 100 } = await req.json();

    // 1. تمام ضروری پیرامیٹرز کی چیکنگ
    if (!userPublicKey || !inputMint || !outputMint || !amount) {
      return NextResponse.json(
        { error: 'تمام ضروری تفصیلات (userPublicKey, inputMint, outputMint, amount) فراہم کریں۔' },
        { status: 400 }
      );
    }

    const apiKey = process.env.JUPITER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'JUPITER_API_KEY فائل میں موجود نہیں ہے۔' },
        { status: 500 }
      );
    }

    // 2. Jupiter سے سواپ Quote حاصل کریں
    const quoteUrl = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`;
    
    const quoteRes = await fetch(quoteUrl, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    const quoteData = await quoteRes.json();

    if (quoteData.error) {
      return NextResponse.json({ error: `Jupiter Quote Error: ${quoteData.error}` }, { status: 400 });
    }

    // 3. Swap Transaction کا Payload حاصل کریں
    const swapRes = await fetch('https://quote-api.jup.ag/v6/swap', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quoteResponse: quoteData,
        userPublicKey: userPublicKey,
        wrapAndUnwrapSol: true,
        dynamicComputeUnitLimit: true,
        prioritizationFeeLamports: 'auto'
      })
    });

    const { swapTransaction } = await swapRes.json();

    return NextResponse.json({
      success: true,
      quote: quoteData,
      swapTransaction: swapTransaction
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'سرور میں مسئلہ پیش آیا ہے۔' },
      { status: 500 }
    );
  }
}
