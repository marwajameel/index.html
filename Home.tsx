import { WalletConnect } from "@/components/WalletConnect";
import { motion } from "framer-motion";

export default function Home() {
  const userWalletAddress = "jamilahmed.base.eth";

  return (
    <div
      className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 lg:p-8 relative overflow-hidden text-right font-sans"
      dir="rtl"
    >
      {/* Header Section */}
      <div className="w-full max-w-md mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-amber-400">SDN کرپٹو ڈیش بورڈ</h1>
        <WalletConnect />
      </div>

      <div className="w-full max-w-md mx-auto space-y-6">
        {/* 1. Binance Live Wallet Balance Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md"
        >
          <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
              ● بائنانس لائیو ایکٹیو
            </span>
            <h2 className="text-sm font-semibold text-slate-400">کل تخمینہ قدر</h2>
          </div>

          <div className="my-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight dir-ltr font-mono text-right">
              2.44711679 <span className="text-lg text-slate-300 font-sans">USDT</span>
            </div>
            <div className="text-sm text-slate-400 mt-1">
              ≈ $2.45 USD
            </div>
          </div>

          <div className="flex items-center justify-between bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 mt-4">
            <span className="text-xs text-slate-400">آج کا منافع / نقصان (PnL)</span>
            <span className="text-sm font-bold text-emerald-400 dir-ltr font-mono">
              +$0.02 (+1.00%) ↑
            </span>
          </div>
        </motion.div>

        {/* 2. On-Chain Wallet & Locked Assets Scanner Widget */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md"
        >
          <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
            <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded-full border border-cyan-500/20 font-medium">
              On-Chain Live Tracker
            </span>
            <h2 className="text-sm font-semibold text-slate-300">آن-چین والٹ و ٹوکنز سکینر</h2>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 mb-4 text-center">
            <div className="text-xs text-slate-400 mb-1">ایکٹیو بلاک چین ایڈریس:</div>
            <div className="text-sm font-mono font-bold text-cyan-400 dir-ltr tracking-wide">
              {userWalletAddress}
            </div>
          </div>

          <div className="space-y-2.5">
            <a
              href={`https://debank.com/profile/${userWalletAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center bg-slate-950/40 hover:bg-slate-800/60 p-3 rounded-xl border border-slate-800/50 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">🔍</span>
                <span className="text-xs text-slate-200 group-hover:text-amber-400 transition-colors">
                  پھنسے/اٹکے ہوئے ٹوکنز سکین کریں (DeBank)
                </span>
              </div>
              <span className="text-xs text-slate-400 dir-ltr font-mono">فتح کریں ↗</span>
            </a>

            <a
              href={`https://basescan.org/address/${userWalletAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center bg-slate-950/40 hover:bg-slate-800/60 p-3 rounded-xl border border-slate-800/50 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="text-blue-400">🌐</span>
                <span className="text-xs text-slate-200 group-hover:text-amber-400 transition-colors">
                  Base Chain ہسٹری اور ٹرانزیکشنز
                </span>
              </div>
              <span className="text-xs text-slate-400 dir-ltr font-mono">BaseScan ↗</span>
            </a>

            <a
              href={`https://bscscan.com/address/${userWalletAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center bg-slate-950/40 hover:bg-slate-800/60 p-3 rounded-xl border border-slate-800/50 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="text-amber-400">⚡</span>
                <span className="text-xs text-slate-200 group-hover:text-amber-400 transition-colors">
                  BNB Chain (BSC) بیلنس اور ٹوکنز
                </span>
              </div>
              <span className="text-xs text-slate-400 dir-ltr font-mono">BscScan ↗</span>
            </a>
          </div>
        </motion.div>

        {/* 3. BNB Chain Top RWA Assets Analytics Widget */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md"
        >
          <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
            <span className="text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full border border-amber-500/20 font-medium">
              RWA Assets List
            </span>
            <h2 className="text-sm font-semibold text-slate-300">BNB Chain RWA اثاثے</h2>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
              <span className="text-xs text-slate-200">Tether USDT (Binance Bridge)</span>
              <span className="text-xs font-bold text-emerald-400 dir-ltr font-mono">Stablecoin</span>
            </div>

            <div className="flex justify-between items-center bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
              <span className="text-xs text-slate-200">Binance-Peg BUSD / USDC</span>
              <span className="text-xs font-bold text-emerald-400 dir-ltr font-mono">Stablecoin</span>
            </div>

            <div className="flex justify-between items-center bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
              <span className="text-xs text-slate-200">Tether Gold (XAUT)</span>
              <span className="text-xs font-bold text-amber-400 dir-ltr font-mono">Commodity</span>
            </div>

            <div className="flex justify-between items-center bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
              <span className="text-xs text-slate-200">bStocks (SpaceX, Alphabet)</span>
              <span className="text-xs font-bold text-blue-400 dir-ltr font-mono">Tokenized Stocks</span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <a 
              href="https://app.rwa.xyz/networks/bnb-chain" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-amber-400 transition-colors underline"
            >
              RWA.xyz پر تمام 1,321 اثاثے دیکھیں ↗
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
