import React, { useState } from 'react';
import { pay } from '@base-org/account';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

export default function CryptoPaymentPortal() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  // 1. Base Pay (USDC / ETH) کے ذریعے ادائیگی
  const handleBasePayment = async () => {
    setLoading(true);
    setStatus('Base Pay پروسیس ہو رہا ہے...');
    try {
      const payment = await pay({
        amount: "10.00", // $10 USDC
        to: "jamilahmed.base.eth", // آپ کا Basename
        testnet: false // اصلی رقم منتقل کرنے کے لیے
      });

      console.log("Base Payment Success:", payment);
      setStatus('Base Pay ادائیگی کامیابی سے مکمل ہو گئی!');
      alert("Base Pay ادائیگی کامیابی سے منتقل ہو گئی!");
    } catch (error) {
      console.error("Base Payment Error:", error);
      setStatus('Base Pay ادائیگی ناکام ہو گئی یا منسوخ کر دی گئی۔');
      alert("Base Pay ادائیگی منسوخ ہو گئی یا غلطی پیش آئی۔");
    } finally {
      setLoading(false);
    }
  };

  // 2. Solana (SOL) کے ذریعے ادائیگی
  const handleSolanaPayment = async () => {
    setLoading(true);
    setStatus('Solana ٹرانزیکشن کا انتظار ہے...');
    try {
      const provider = window.solana; // Phantom یا Backpack Wallet

      if (provider) {
        await provider.connect();

        const connection = new Connection("https://api.mainnet-beta.solana.com");
        const senderPublicKey = provider.publicKey;
        
        // آپ کا اصلی سولانا والٹ ایڈریس
        const receiverPublicKey = new PublicKey("iGgNJhmyQEnSMean7NfHgEm4RAU72hSNBWvYb1ybynq");

        // 0.1 SOL کا ٹرانسفر
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: senderPublicKey,
            toPubkey: receiverPublicKey,
            lamports: 0.1 * LAMPORTS_PER_SOL
          })
        );

        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = senderPublicKey;

        const signedTransaction = await provider.signAndSendTransaction(transaction);
        setStatus(`Solana ادائیگی مکمل! Signature: ${signedTransaction.signature.slice(0, 10)}...`);
        alert(`Solana ادائیگی مکمل ہو گئی! Transaction ID: ${signedTransaction.signature}`);
      } else {
        alert("برائے مہربانی Phantom یا Backpack والٹ انسٹال کریں!");
        setStatus('سولانا والٹ دستیاب نہیں ہے۔');
      }
    } catch (error) {
      console.error("Solana Payment Error:", error);
      setStatus('Solana ادائیگی ناکام ہو گئی یا منسوخ کر دی گئی۔');
      alert("Solana ادائیگی منسوخ ہو گئی یا غلطی پیش آئی۔");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '480px',
      margin: '40px auto',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <h2 style={{ color: '#111827', marginBottom: '8px', fontSize: '22px' }}>
        SDN / مروہ کرپٹو پیمنٹ گیٹ وے
      </h2>
      <p style={{ color: '#6B7280', marginBottom: '24px', fontSize: '14px' }}>
        اپنے پسندیدہ نیٹ ورک کا انتخاب کر کے براہ راست ادائیگی کریں:
      </p>

      {/* بٹنز کا سیکشن */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Base Pay Button */}
        <button
          onClick={handleBasePayment}
          disabled={loading}
          style={{
            backgroundColor: '#0052FF',
            color: '#FFFFFF',
            padding: '14px 20px',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            borderRadius: '10px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(0, 82, 255, 0.25)'
          }}
        >
          Base Pay ($10 USDC)
        </button>

        {/* Solana Pay Button */}
        <button
          onClick={handleSolanaPayment}
          disabled={loading}
          style={{
            backgroundColor: '#512DA8',
            color: '#FFFFFF',
            padding: '14px 20px',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            borderRadius: '10px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(81, 45, 168, 0.25)'
          }}
        >
          Solana Pay (0.1 SOL)
        </button>
      </div>

      {/* اسٹیٹس میسج */}
      {status && (
        <div style={{
          marginTop: '20px',
          padding: '10px',
          borderRadius: '8px',
          backgroundColor: '#F3F4F6',
          color: '#374151',
          fontSize: '13px'
        }}>
          {status}
        </div>
      )}
    </div>
  );
}
