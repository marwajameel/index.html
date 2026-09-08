import { WalletConnect } from "@/components/WalletConnect";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl w-full flex flex-col items-center text-center space-y-12 z-10"
      >
        <header className="space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block"
          >
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase border border-primary/20">
              Web3 Dashboard
            </span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground font-urdu leading-tight md:leading-snug drop-shadow-sm">
            SDN کرپٹو ڈیش بورڈ
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-urdu leading-relaxed">
            اپنے ڈیجیٹل اثاثوں کو محفوظ طریقے سے منظم کریں۔ شروع کرنے کے لیے اپنا والٹ کنیکٹ کریں۔
          </p>
        </header>

        <main className="w-full">
          <WalletConnect />
        </main>
        
        <footer className="pt-12 text-center text-sm text-muted-foreground/60">
          <p>© 2026 SDN Crypto. All rights reserved.</p>
        </footer>
      </motion.div>
    </div>
  );
}
import { motion } from 'framer-motion';

export default function CryptoBalanceDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 font-sans text-right" dir="rtl">
      {/* Wallet Summary Card with Responsive Zoom Scale */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md transition-all hover:scale-[1.02]"
      >
        <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
          <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
            ● بائنانس لائیو ایکٹیو
          </span>
          <h2 className="text-sm font-semibold text-slate-400">کل تخمینہ قدر</h2>
        </div>

        {/* Balance Display with Dynamic Text Zoom */}
        <div className="my-4">
          <div className="text-3xl md:text-4xl font-extrabold text-amber-400 tracking-tight">
            2.44711679 <span className="text-lg text-slate-300">USDT</span>
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
