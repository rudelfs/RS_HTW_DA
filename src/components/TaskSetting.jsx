export default function TaskSetting({ t, onNext }) {
  return (
    <div className="bg-white border-4 border-charcoal p-6 md:p-10 shadow-diy max-w-2xl mx-auto animate-window-pop">
      <h2 className="text-2xl md:text-3xl font-black mb-6 uppercase tracking-tighter">{t.ts_title}</h2>
      <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium mb-8">
        {t.ts_text}
      </p>
      <button onClick={onNext} className="w-full bg-charcoal text-white border-4 border-charcoal p-4 font-black uppercase text-xl shadow-diy hover:translate-y-1 hover:shadow-none hover:bg-jade transition-all">
        {t.ts_btn}
      </button>
    </div>
  );
}