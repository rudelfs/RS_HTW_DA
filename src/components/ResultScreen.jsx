export default function ResultScreen({ t, results }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 animate-window-pop">
      <div className="bg-white border-4 border-charcoal p-8 shadow-diy max-w-3xl w-full">
        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter text-charcoal">{t.rs_title}</h2>
        <p className="text-slate-600 mb-6 font-bold">
          {t.rs_text}
        </p>
        <div className="bg-gray-900 border-4 border-charcoal p-6 rounded-lg">
          <pre className="text-green-400 text-xs md:text-sm font-mono overflow-auto max-h-[600px]">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}