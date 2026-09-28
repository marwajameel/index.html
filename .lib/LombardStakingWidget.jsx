import React, { useState } from 'react';
import { createLombardSDK, Chain, AssetId, DeployProtocol } from '@lombard.finance/sdk';

// ==========================================
// 1. Lombard SDK Config & Service Logic
// ==========================================
const config = {
  environment: 'mainnet', // یا 'testnet'
};

// SDK انیشلائزیشن
const sdk = createLombardSDK(config);

// اسٹیکنگ اور ایڈریس جنریٹ کرنے کا فنکشن
async function executeStakeAndDeploy(amountBTC, recipientAddress) {
  try {
    // پروٹوکول اور چین سیٹ کرنا
    const stakeAndDeploy = sdk.chain.btc.stakeAndDeploy({
      destChain: Chain.ETHEREUM,
      assetOut: AssetId.LBTC,
      protocol: DeployProtocol.Veda,
    });

    // رقم اور ایڈریس تیار کرنا
    await stakeAndDeploy.prepare({
      amount: amountBTC,
      recipient: recipientAddress,
    });

    // سیکیورٹی آتھورائزیشن
    await stakeAndDeploy.authorizeDeposit();

    // بٹ کوائن ایڈریس حاصل کرنا
    const depositAddress = await stakeAndDeploy.generateDepositAddress();
    return depositAddress;
  } catch (error) {
    console.error("Lombard SDK Error:", error);
    throw error;
  }
}

// ==========================================
// 2. React UI Component (ویب سائٹ پر دکھانے کے لیے)
// ==========================================
export default function LombardStakingWidget() {
  const [amount, setAmount] = useState('0.1');
  const [recipient, setRecipient] = useState('0xcBcA630521176E76D8a5F55F78703B92336A1411');
  const [depositAddress, setDepositAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStake = async () => {
    setLoading(true);
    setError('');
    setDepositAddress('');

    try {
      const address = await executeStakeAndDeploy(amount, recipient);
      setDepositAddress(address);
    } catch (err) {
      setError('ایڈریس جنریٹ کرنے میں ناکامی ہوئی۔ برائے مہربانی نیٹ ورک یا کیش چیک کریں۔');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      border: '1px solid #e2e8f0',
      padding: '24px',
      borderRadius: '12px',
      maxWidth: '480px',
      margin: '20px auto',
      fontFamily: 'sans-serif',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff'
    }}>
      <h2 style={{ marginTop: 0, color: '#1a202c', textAlign: 'center' }}>
        Lombard BTC Staking
      </h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
          BTC مقدار (Amount):
        </label>
        <input 
          type="text" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #cbd5e0',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
          ETH وصول کنندہ کا ایڈریس (Recipient):
        </label>
        <input 
          type="text" 
          value={recipient} 
          onChange={(e) => setRecipient(e.target.value)} 
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #cbd5e0',
            boxSizing: 'border-box',
            fontSize: '13px'
          }}
        />
      </div>

      <button 
        onClick={handleStake} 
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: loading ? '#a0aec0' : '#3182ce',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'پروسیسنگ جاری ہے...' : 'ڈپازٹ ایڈریس حاصل کریں'}
      </button>

      {/* اگر ایڈریس کامیابی سے مل جائے */}
      {depositAddress && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f0fff4',
          border: '1px solid #9ae6b4',
          borderRadius: '6px'
        }}>
          <strong style={{ color: '#276749' }}>بی ٹی سی (BTC) اس ایڈریس پر بھیجیں:</strong>
          <p style={{
            wordBreak: 'break-all',
            fontFamily: 'monospace',
            backgroundColor: '#ffffff',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #e2e8f0',
            marginTop: '8px'
          }}>
            {depositAddress}
          </p>
        </div>
      )}

      {/* اگر کوئی ایرر آئے */}
      {error && (
        <div style={{
          marginTop: '20px',
          padding: '12px',
          backgroundColor: '#fff5f5',
          border: '1px solid #feb2b2',
          borderRadius: '6px',
          color: '#c53030'
        }}>
          {error}
        </div>
      )}
    </div>
  );
}
