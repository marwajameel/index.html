'use client';

import { useState } from 'react';

export default function SwapComponent() {
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  // EVM (Base) Swapping Handler
  const handleEvmSwap = async () => {
    setLoading(true);
    setResultMessage('');

    try {
      const response = await fetch('/api/swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chainId: '1',
          fromToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // ETH
          toToken: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',   // USDC
          amount: '1000000000000000000',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setResultMessage(`EVM کامیابی! ٹرانزیکشن ہیش: ${data.txHash}`);
      } else {
        setResultMessage(`EVM خرابی: ${data.error}`);
      }
    } catch (error) {
      setResultMessage(`نیٹ ورک کی خرابی: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Solana Swapping Handler
  const handleSolanaSwap = async () => {
    setLoading(true);
    setResultMessage('');

    try {
      const response = await fetch('/api/solana-swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromToken: 'So11111111111111111111111111111111111111112', // SOL
          toToken: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',   // USDC (Solana)
          amount: '100000000', // 0.1 SOL
        }),
      });

      const data = await response.json();
      if (data.success) {
        setResultMessage(`سولانا کامیابی! ٹرانزیکشن ہیش: ${data.txHash}`);
      } else {
        setResultMessage(`سولانا خرابی: ${data.error}`);
      }
    } catch (error) {
      setResultMessage(`نیٹ ورک کی خرابی: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '450px', margin: 'auto', textAlign: 'center', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2>Mj04 خودکار ملٹی چین ڈیش بورڈ</h2>
      <p style={{ color: '#666' }}>EVM اور Solana ایڈریسز کے لیے خودکار لین دین کریں</p>
      
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '20px 0' }}>
        <button
          onClick={handleEvmSwap}
          disabled={loading}
          style={{
            padding: '12px 20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            flex: 1
          }}
        >
          {loading ? 'پروسیسنگ...' : 'EVM (Base) سوپ'}
        </button>

        <button
          onClick={handleSolanaSwap}
          disabled={loading}
          style={{
            padding: '12px 20px',
            backgroundColor: '#14F195',
            color: '#000',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            flex: 1
          }}
        >
          {loading ? 'پروسیسنگ...' : 'Solana (سولانا) سوپ'}
        </button>
      </div>

      {resultMessage && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px', wordBreak: 'break-all', fontSize: '14px' }}>
          {resultMessage}
        </div>
      )}
    </div>
  );
}
