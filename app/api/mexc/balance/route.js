import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { apiKey, apiSecret } = await req.json();

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "API Key اور Secret فراہم نہیں کیے گئے!" },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const queryString = `timestamp=${timestamp}`;
    
    // MEXC API کی HMAC SHA256 دستخط (Signature) بنانا
    const signature = crypto
      .createHmac("sha256", apiSecret)
      .update(queryString)
      .digest("hex");

    const response = await fetch(
      `https://api.mexc.com/api/v3/account?${queryString}&signature=${signature}`,
      {
        method: "GET",
        headers: {
          "X-MEXC-APIKEY": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.msg || "MEXC سے ڈیٹا حاصل کرنے میں ناکامی" },
        { status: response.status }
      );
    }

    // صرف وہ ٹوکن جن کا بیلنس 0 سے زیادہ ہے filter کریں
    const activeBalances = (data.balances || []).filter(
      (b) => parseFloat(b.free) > 0 || parseFloat(b.locked) > 0
    );

    return NextResponse.json({ success: true, balances: activeBalances });
  } catch (error) {
    return NextResponse.json(
      { error: "سرور کی خرابی: " + error.message },
      { status: 500 }
    );
  }
}
