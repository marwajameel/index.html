import React from 'react';
import { pay } from '@base-org/account';

export default function BasePayButton() {
  const handlePayment = async () => {
    try {
      const payment = await pay({
        amount: "10.00", // رقم کی مقدار (USDC میں)
        to: "jamilahmed.base.eth", // آپ کا وصول کنندہ ایڈریس / Basename
        testnet: false // اصلی پیسے ٹرانسفر کرنے کے لیے false رکھیے
      });

      console.log("ٹرانزیکشن کی تفصیلات:", payment);
      alert("ادائیگی کامیابی سے مکمل ہو گئی ہے!");
    } catch (error) {
      console.error("ادائیگی میں مسئلہ آیا:", error);
      alert("ٹرانزیکشن ناکام ہو گئی یا منسوخ کر دی گئی۔");
    }
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        backgroundColor: '#0052FF',
        color: '#FFFFFF',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
    >
      Base Pay کے ذریعے ادائیگی کریں ($10)
    </button>
  );
}
