import { useState, useEffect } from "react";
import { WalletConnect } from "@/components/WalletConnect";
import { motion } from "framer-motion";

export default function Home() {
  // آپ کے لائیو پبلک ایڈریسز (سیکور طریقہ)
  const evmWalletAddress = "0xd1597C721500659fD4A34f7fB7a3B50B0EAb484a";
  const solanaWalletAddress = "9SRTywssWCxcqzsN7J6UVDG28yae4j6UACjqZcHrR5kV";
  const btcWalletAddress = "bc1qmzgew3flv5lemf6ahsaqmx3th473lsz0zsgw50";

  // لائیو بیلنس اسٹیٹس
  const [solBalance, setSolBalance] = useState<string>("لوڈنگ...");
  const [ethBalance, setEthBalance] = useState<string>("لوڈنگ...");

  // سولانا اور EVM کا لائیو آن-چین ڈیٹا فیچ کرنے والا فنکشن
  useEffect(() => {
    async function fetchLiveBalances() {
      try {
        // 1. Solana Live Balance Fetch
        const solRes = await fetch("https://api.mainnet-beta.solana.com", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "getBalance",
            params: [solanaWalletAddress],
          }),
        });
        const solData = await solRes.json();
        if (solData?.result?.value !== undefined) {
          const lamports = solData.result.value;
          setSolBalance((lamports / 1e9).toFixed(4) + " SOL");
        } else {
          setSolBalance("0.0000 SOL");
        }
      } catch (err) {
        setSolBalance("آن لائن سکینر پر دیکھیں");
      }

      try {
        // 2. Base Chain / EVM Live Balance Fetch
        const evmRes = await fetch("https://mainnet.base.org", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getBalance",
            params: [evmWalletAddress, "latest"],
          }),
        });
        const evmData = await evmRes.json();
        if (evmData?.result) {
          const wei = parseInt(evmData.result, 16);
          setEthBalance((wei / 1e18).toFixed(4) + " ETH");
        } else {
          setEthBalance("0.0000 ETH");
        }
      } catch (err) {
        setEthBalance("آن لائن سکینر پر دیکھیں");
      }
    }

    fetchLiveBalances();
  }, [solanaWalletAddress, evmWalletAddress]);

  return (
    <div
      className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 lg:p-8 relative overflow-hidden text-right font-sans"
      dir="rtl"
    >
      {/* Header Section */}
      <div className="w-full max-w-md mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-amber-400">SDN کرپٹو ڈیش بورڈ (لائیو)</h1>
        <WalletConnect />
      </div>

      <div className="w-full max-w-md mx-auto space-y-6">
        {/* 1. Live On-Chain Wallet Balances Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md"
        >
          <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
              ● لائیو آن-چین کنکشن
            </span>
            <h2 className="text-sm font-semibold text-slate-400">آپ کا لائیو آن-چین بیلنس</h2>
          </div>

          <div className="space-y-3 my-2">
            <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-purple-800/40">
              <span className="text-xs text-purple-300 font-bold">Solana (SOL) لائیو:</span>
              <span className="text-sm font-mono font-bold text-amber-400 dir-ltr">
                {solBalance}
              </span>
            </div>

            <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-blue-800/40">
              <span className="text-xs text-blue-300 font-bold">Base Chain (ETH) لائیو:</span>
              <span className="text-sm font-mono font-bold text-cyan-400 dir-ltr">
                {ethBalance}
              </span>
            </div>
          </div>
        </motion.div>

        {/* 2. On-Chain Tracker (Solana, EVM & Bitcoin) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md"
        >
          <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
            <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded-full border border-cyan-500/20 font-medium">
              Live Multi-Chain Scanner
            </span>
            <h2 className="text-sm font-semibold text-slate-300">تمام بلاک چین سکینرز</h2>
          </div>

          <div className="space-y-2.5">
            <a
              href={`https://solscan.io/account/${solanaWalletAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center bg-slate-950/40 hover:bg-slate-800/60 p-3 rounded-xl border border-purple-800/40 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="text-purple-400">🟣</span>
                <span className="text-xs text-slate-200 group-hover:text-amber-400 transition-colors">
                  Solana (Solscan) لائیو ٹوکنز و ٹرانزیکشنز
                </span>
              </div>
              <span className="text-xs text-purple-400 dir-ltr font-mono">Solscan ↗</span>
            </a>

            <a
              href={`https://debank.com/profile/${evmWalletAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center bg-slate-950/40 hover:bg-slate-800/60 p-3 rounded-xl border border-slate-800/50 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">🔍</span>
                <span className="text-xs text-slate-200 group-hover:text-amber-400 transition-colors">
                  EVM پھنسے/اٹکے ٹوکنز سکینر (DeBank)
                </span>
              </div>
              <span className="text-xs text-slate-400 dir-ltr font-mono">DeBank ↗</span>
            </a>

            <a
              href={`https://basescan.org/address/${evmWalletAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center bg-slate-950/40 hover:bg-slate-800/60 p-3 rounded-xl border border-slate-800/50 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="text-blue-400">🌐</span>
                <span className="text-xs text-slate-200 group-hover:text-amber-400 transition-colors">
                  Base Chain (BaseScan) ٹرانزیکشنز
                </span>
              </div>
              <span className="text-xs text-slate-400 dir-ltr font-mono">BaseScan ↗</span>
            </a>

            <a
              href={`https://mempool.space/address/${btcWalletAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center bg-slate-950/40 hover:bg-slate-800/60 p-3 rounded-xl border border-slate-800/50 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="text-amber-400">₿</span>
                <span className="text-xs text-slate-200 group-hover:text-amber-400 transition-colors">
                  Bitcoin (Mempool) لائیو ایکسپلورر
                </span>
              </div>
              <span className="text-xs text-slate-400 dir-ltr font-mono">BTC Explorer ↗</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
