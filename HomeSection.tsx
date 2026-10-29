export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 text-white">
      <main className="text-center p-8 max-w-2xl bg-slate-800/60 rounded-2xl border border-slate-700/50 shadow-2xl backdrop-blur-md">
        <h1 className="text-5xl font-extrabold text-blue-400 mb-4 tracking-tight">
          SDN News — باخبر، ہر لمحہ
        </h1>
        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
          سرائے عالمگیر اور گردونواح کی بریکنگ نیوز اور شفاف ڈیجیٹل صحافت کا اعتماد۔
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://marwajameel.github.io/sdn-news"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            تازہ ترین خبریں
          </a>
          <button className="px-6 py-3 border border-blue-500/50 hover:bg-blue-600/20 text-blue-300 font-semibold rounded-lg transition-all">
            رابطہ کریں
          </button>
        </div>
      </main>
    </div>
  )
}
