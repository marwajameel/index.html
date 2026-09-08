{
  "name": "solana-validator-dashboard",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@solana/web3.js": "^1.95.0",
    "lucide-react": "^0.300.0",
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1"
'use client';

import { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Activity, ShieldCheck, Wallet, RefreshCw, ExternalLink } from 'lucide-react';

const RPC_ENDPOINT = 'https://api.mainnet-beta.solana.com';
const VALIDATOR_ADDRESS = 'CjmXSapt1ouz3CZzgkRJckBEwMSo5fVdVrizLeRscwYD';

export default function ValidatorDashboard() {
  const [balance, setBalance] = useState(null);
  const [accountInfo, setAccountInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const connection = new Connection(RPC_ENDPOINT, 'confirmed');
      const pubkey = new PublicKey(VALIDATOR_ADDRESS);

      // 1. Fetch SOL Balance
      const balanceLamports = await connection.getBalance(pubkey);
      setBalance((balanceLamports / 1e9).toFixed(4));

      // 2. Fetch Account Info
      const info = await connection.getAccountInfo(pubkey);
      setAccountInfo({
        owner: info?.owner.toBase58(),
        executable: info?.executable ? 'Yes' : 'No',
        rentEpoch: info?.rentEpoch,
      });

      // 3. Fetch Recent Transactions
      const sigs = await connection.getSignaturesForAddress(pubkey, { limit: 8 });
      setTransactions(sigs);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans dir-rtl">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center pb-8 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <Activity className="w-6 h-6" /> Solana Validator Live Monitor
          </h1>
          <p className="text-sm text-slate-400 mt-1 font-mono">{VALIDATOR_ADDRESS}</p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'ری لوڈ ہو رہا ہے...' : 'ڈیٹا اپڈیٹ کریں'}
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto mt-8 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-sm">SOL بیلنس</span>
              <Wallet className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold mt-3 text-white">
              {balance !== null ? `${balance} SOL` : '---'}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-sm">والیڈیٹر اسٹیٹس</span>
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-xl font-bold mt-3 text-emerald-400">
              Active Validator Node
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-sm">آن چین آنر پروگرام</span>
              <Activity className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-xs font-mono mt-4 text-slate-300 truncate">
              {accountInfo?.owner || '---'}
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-200 mb-4">حالیہ لائیو ٹرانزیکشنز / ووٹس</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">ٹرانزیکشن سگنیچر</th>
                  <th className="p-3">سلاٹ (Slot)</th>
                  <th className="p-3">اسٹیٹس</th>
                  <th className="p-3">Solscan پر دیکھیں</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                {transactions.map((tx, idx) => (
                  <tr key={tx.signature} className="hover:bg-slate-800/50">
                    <td className="p-3 text-slate-500">{idx + 1}</td>
                    <td className="p-3 text-slate-300 truncate max-w-xs">{tx.signature}</td>
                    <td className="p-3 text-slate-400">{tx.slot}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${tx.err ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                        {tx.err ? 'Failed' : 'Success'}
                      </span>
                    </td>
                    <td className="p-3">
                      <a
                        href={`https://solscan.io/tx/${tx.signature}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        کھولیں <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

  }
}
