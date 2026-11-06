app.jsgit init
git add .
git commit -m "Add Base Pay integration code"
git branch -M main
git remote add origin آپ_کی_گیٹ_ہب_ریپوزیٹری_کا_لنک
git push -u origin main
import LombardStakingWidget from './LombardStakingWidget';

function App() {
  return (
    <div>
      <LombardStakingWidget />
    </div>
  );
}

export default App;
// لائیو بیس نیٹ ورک اور ٹوکن کانٹریکٹ کی ترتیبات
const BASE_COMMERCE_COLLECTOR = "0x8612dfdc421f80336cd14E8EF9cb1E765dB5ab88"; // ERC3009PaymentCollector ایڈریس
const LIVE_TOKEN_ADDRESS = "YOUR_TOKEN_ADDRESS_HERE"; // یہاں اپنا اصل ٹوکن ایڈریس محفوظ کریں

async function saveAndExecuteLiveTransaction(signer) {
    try {
        const contractABI = [
            "function charge(address token, uint256 amount) external returns (bool)"
        ];

        const commerceContract = new ethers.Contract(
            BASE_COMMERCE_COLLECTOR,
            contractABI,
            signer
        );

        // ٹوکن کی طے شدہ مقدار (مثلاً 5 ٹوکنز)
        const tokenAmount = ethers.utils.parseUnits("5", 18);

        console.log("لائیو ٹرانزیکشن سیو اور پروسیس کی جا رہی ہے...");
        
        const tx = await commerceContract.charge(LIVE_TOKEN_ADDRESS, tokenAmount, {
            gasLimit: 150000
        });

        console.log("کامیاب ٹرانزیکشن ہیش:", tx.hash);
        await tx.wait();
        
        console.log("پیمنٹ کامیابی کے ساتھ محفوظ اور مکمل ہو گئی ہے!");
    } catch (error) {
        console.error("خرابی کا سامنا:", error);
    }
}
'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [account, setAccount] = useState('');
  const [walletName, setWalletName] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  // والٹ کی خودکار شناخت (Auto-Detection on Load)
  useEffect(() => {
    checkIfWalletIsConnected();

    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        } else {
          setAccount('');
          setIsConnected(false);
        }
      });
    }
  }, []);

  const detectWalletProvider = () => {
    if (typeof window === 'undefined' || !window.ethereum) return null;
    if (window.ethereum.isOkxWallet) return 'OKX Wallet';
    if (window.ethereum.isCoinbaseWallet) return 'Coinbase Wallet';
    if (window.ethereum.isMetaMask) return 'MetaMask';
    return 'Web3 Wallet';
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const providerName = detectWalletProvider();
        setWalletName(providerName);
        
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      }
    } catch (error) {
      console.error("Auto-connect error:", error);
    }
  };

  const connectWallet = async () => {
    setLoading(true);
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const providerName = detectWalletProvider();
        setAccount(accounts[0]);
        setWalletName(providerName);
        setIsConnected(true);
      } else {
        alert("کوئی Web3 والٹ (OKX / MetaMask / Coinbase) انسٹال نہیں ہے!");
      }
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    setIsConnected(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>جمیل کلیال ڈیجیٹل والٹ ڈیش بورڈ</h1>
        <p style={styles.subtitle}>Base Network & Web3 Smart Integration</p>

        {isConnected ? (
          <div style={styles.walletBox}>
            <span style={styles.badge}>متصل (Connected): {walletName}</span>
            <p style={styles.label}>آپ کا والٹ ایڈریس:</p>
            <div style={styles.addressBox}>
              <code>{account}</code>
            </div>
            
            <div style={styles.actions}>
              <a 
                href={`https://basescan.org/address/${account}`} 
                target="_blank" 
                rel="noreferrer"
                style={styles.linkButton}
              >
                Basescan پر پورٹ فولیو دیکھیں
              </a>
              <button onClick={disconnectWallet} style={styles.disconnectBtn}>
                والٹ ڈسکیکٹ کریں
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.connectBox}>
            <p style={styles.infoText}>
              اپنے OKX، Coinbase یا MetaMask والٹ کو خودکار طریقے سے اٹیچ کرنے کے لیے نیچے دیے گئے بٹن پر کلک کریں۔
            </p>
            <button 
              onClick={connectWallet} 
              disabled={loading}
              style={styles.connectBtn}
            >
              {loading ? 'کنیکٹ ہو رہا ہے...' : 'آٹو والیٹ کنیکٹ کریں'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    color: '#fff',
    fontFamily: 'sans-serif',
    padding: '20px',
    direction: 'rtl'
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '30px',
    borderRadius: '16px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
    border: '1px solid #334155'
  },
  title: {
    fontSize: '22px',
    color: '#38bdf8',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '14px',
    color: '#94a3b8',
    marginBottom: '24px'
  },
  walletBox: {
    backgroundColor: '#0f172a',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #0284c7'
  },
  badge: {
    backgroundColor: '#0369a1',
    color: '#e0f2fe',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    display: 'inline-block',
    marginBottom: '12px'
  },
  label: {
    fontSize: '14px',
    color: '#cbd5e1',
    marginBottom: '6px'
  },
  addressBox: {
    backgroundColor: '#1e293b',
    padding: '10px',
    borderRadius: '8px',
    wordBreak: 'break-all',
    color: '#4ade80',
    fontSize: '13px',
    marginBottom: '16px'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  connectBtn: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '14px 24px',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    fontWeight: 'bold'
  },
  linkButton: {
    backgroundColor: '#0d9488',
    color: '#fff',
    padding: '10px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '14px'
  },
  disconnectBtn: {
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  infoText: {
    fontSize: '14px',
    color: '#94a3b8',
    marginBottom: '16px'
  }
};

