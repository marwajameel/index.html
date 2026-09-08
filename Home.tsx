import { WalletConnect } from "@/components/WalletConnect";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-background to-secondary/30 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden text-right"
      dir="rtl"
    >
      {/* Top Header / Wallet Connection Section */}
      <div className="w-full max-w-md mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-amber-400">SDN کرپٹو ڈیش بورڈ</h1>
        <WalletConnect />
      </div>

      {/* Main Card with Zoom Scale Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md"
      >
        <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
          <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
            ● بائنانس لائیو ایکٹیو
          </span>
          <h2 className="text-sm font-semibold text-slate-400">کل تخمینہ قدر</h2>
        </div>

        {/* Balance Display with Dynamic Text Zoom */}
        <div className="my-4">
          <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight dir-ltr font-mono text-right">
            2.44711679 <span className="text-lg text-slate-300 font-sans">USDT</span>
          </div>
          <div className="text-sm text-slate-400 mt-1">
            ≈ $2.45 USD
          </div>
        </div>

        {/* PnL Indicator Box */}
        <div className="flex items-center justify-between bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 mt-4">
          <span className="text-xs text-slate-400">آج کا منافع / نقصان (PnL)</span>
          <span className="text-sm font-bold text-emerald-400 dir-ltr font-mono">
            +$0.02 (+1.00%) ↑
          </span>
        </div>
      </motion.div>
    </div>
  );
}
