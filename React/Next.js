import { useState } from 'react';
import { ethers } from 'ethers';

export default function RewardTransaction({ walletAddress }) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const sendReward = async () => {
    setLoading(true);
    setStatus('ٹرانزیکشن کی تیاری کی جا رہی ہے...');

    try {
      if (!window.ethereum) {
        throw new Error("Web3 والٹ موجود نہیں ہے");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // 1. والٹ میں گیس فیس (ETH) کا جائزہ
      const balance = await provider.getBalance(walletAddress);
      if (balance.isZero()) {
        throw new Error("آپ کے والٹ میں گیس فیس (ETH) کے لیے بیلنس موجود نہیں ہے");
      }

      // 2. ٹرانزیکشن بھیجنے کی کوشش
      setStatus('ٹرانزیکشن والٹ میں بھیجی جا رہی ہے، براہِ کرم کنفرم کریں...');
      
      const tx = await signer.sendTransaction({
        to: walletAddress,
        value: ethers.utils.parseEther("0.0001"), // مطلوبہ رقم یا ٹوکن کی مقدار
      });

      setStatus('ٹرانزیکشن پروسیس ہو رہی ہے...');
      await tx.wait(); // بلاک چین پر کنفرمیشن کا انتظار

      setStatus(`کامیابی! ریوارڈ بھیج دیا گیا ہے۔ Hash: ${tx.hash.substring(0, 10)}...`);
    } catch (error) {
      console.error("Transaction Error:", error);
      
      // صارفین کے لیے آسان اور واضح ایرر میسج
      if (error.code === 4001) {
        setStatus('ایرر: آپ نے والٹ میں ٹرانزیکشن کینسل کر دی۔');
      } else if (error.message.includes('گیس فیس')) {
        setStatus(`ایرر: ${error.message}`);
      } else {
        setStatus('ایرر: ٹرانزیکشن مکمل نہ ہو سکی۔ براہِ کرم نیٹ ورک کنکشن اور گیس فیس چیک کر کے دوبارہ کوشش کریں۔');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '15px', textAlign: 'center' }}>
      <button 
        onClick={sendReward} 
        disabled={loading}
        style={{
          backgroundColor: '#2563eb',
          color: '#fff',
          padding: '12px 20px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        {loading ? 'پروسیسنگ...' : 'ریوارڈ دوبارہ کلیم کریں'}
      </button>

      {status && (
        <p style={{ 
          marginTop: '10px', 
          color: status.includes('ایرر') ? '#ef4444' : '#4ade80',
          fontSize: '14px' 
        }}>
          {status}
        </p>
      )}
    </div>
  );
}
