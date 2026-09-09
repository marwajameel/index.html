'use client';

import { useState } from 'react';
import { executeJupiterSwap } from '@/lib/jupiterSwap';

export default function SwapPage() {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleSwap = async () => {
    try {
      setLoading(true);
      setTxHash(null);

      // 1. Phantom Wallet کا ونڈو ابجیکٹ چیک کریں
      const provider = (window as any).solana;

      if (!provider || !provider.isPhantom) {
        alert('براہ کرم Phantom والٹ انسٹال کریں یا والٹ والی براؤزر ایپ میں کھولیں۔');
        return;
      }

      // 2. والٹ کنیکٹ کریں
      await provider.connect();

      // 3. Swap Parameters
      // Hastra PRIME (یا کوئی دوسرا ٹوکن Mint) -> SOL
      const inputMint = '3b8X...3Uu7'; // اپنا Mint Address لگائیں
      const outputMint = 'So11111111111111111111111111111111111111112'; // SOL Mint Address
      const amount = 100000000; // 0.1 SOL یا ٹوکن کی مقدار (Decimals کے ساتھ)

      // 4. لائیو سواپ فنکشن کال کریں
      const result = await executeJupiterSwap({
        walletProvider: provider,
        inputMint,
        outputMint,
        amount,
        slippageBps: 100 // 1% Slippage
      });

      if (result.success && result.txid) {
        setTxHash(result.txid);
        alert('ٹرانزیکشن لائیو مکمل ہو گئی!');
      } else {
        alert(`مسئلہ: ${result.error}`);
      }
    } catch (err: any) {
      alert(`ایرر: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Jupiter Live Swap Integration</h2>
      
      <button 
        onClick={handleSwap} 
        disabled={loading}
        style={{
          backgroundColor: '#ab9ff2',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Processing Transaction...' : 'Live Swap Now'}
      </button>

      {txHash && (
        <div style={{ marginTop: '20px' }}>
          <p>ٹرانزیکشن لائیو کنفرم ہو چکی ہے!</p>
          <a 
            href={`https://solscan.io/tx/${txHash}`} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#4caf50', fontWeight: 'bold' }}
          >
            Solscan پر ٹرانزیکشن دیکھیں
          </a>
        </div>
      )}
    </div>
  );
}
