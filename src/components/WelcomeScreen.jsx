
export default function WelcomeScreen({ t, onNext }) {
  return (
    <div className="bg-white border-4 border-charcoal p-6 md:p-12 shadow-diy max-w-2xl mx-auto text-center animate-window-pop">
      <h1 className="text-3xl md:text-4xl font-black mb-6 uppercase text-charcoal tracking-tighter">{t.ws_title}</h1>
      <p className="text-lg font-bold text-slate-700 mb-8 leading-relaxed whitespace-pre-line">
        {t.ws_text}
      </p>
      <button 
        onClick={onNext}
        className="w-full bg-jade text-white border-4 border-charcoal p-5 font-black uppercase text-xl shadow-diy hover:bg-emerald-600 transition-all"
      >
        {t.ws_btn}
      </button>
    </div>
  );
}