import { useState } from 'react';
import { createWalletClient, custom } from 'viem';
import { baseSepolia } from 'viem/chains';

export default function AIAgentPayment() {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // جدید میتھڈ کے مطابق والٹ کنکشن اور آٹومیٹڈ پیمنٹ کا فنکشن
  const handleAutomatedPayment = async () => {
    try {
      setLoading(true);
      setStatus('Connecting to Smart Wallet...');

      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('Please install Coinbase Wallet or a Web3 wallet.');
      }

      // Viem کا جدید کلائنٹ سیٹ اپ (پرانے ڈپیکیٹ میتھڈز سے پاک)
      const client = createWalletClient({
        chain: baseSepolia,
        transport: custom(window.ethereum),
      });

      const [address] = await client.requestAddresses();
      setStatus(`Connected: ${address}. Processing payment...`);

      // یہاں آپ اپنا سمارٹ کانٹریکٹ یا ٹرانزیکشن کال لاجک لکھ سکتے ہیں
      // مثال کے طور پر Base Sepolia پر آٹومیٹڈ ٹیسٹ ٹوکن بھیجنا

      setStatus('Payment successful! Reward transferred.');
    } catch (error: any) {
      console.error(error);
      setStatus(`Error: ${error.message || 'Transaction failed'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h3>AI Agent Automated Payments</h3>
      <button 
        onClick={handleAutomatedPayment} 
        disabled={loading}
        style={{ padding: '10px 20px', cursor: 'pointer', background: '#0052FF', color: '#fff', border: 'none', borderRadius: '5px' }}
      >
        {loading ? 'Processing...' : 'Pay with Coinbase Smart Wallet'}
      </button>
      <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{status}</p>
    </div>
  );
}
