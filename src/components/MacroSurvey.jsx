import { useState } from 'react';

export default function MacroSurvey({ t, onComplete }) {
  const [q1, setQ1] = useState(3);
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');
  const [q5, setQ5] = useState(4);
  const [q6, setQ6] = useState('');
  
  const [isRevealed, setIsRevealed] = useState(false);

  const isFormValid = q2 !== '' && q3 !== '' && q4 !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onComplete({ frequency: q1, behavior: q2, paradox: q3, systemPref: q4, manipulationRating: q5, qualitative: q6 });
    }
  };

  if (!isRevealed) {
    return (
      <div className="bg-white border-4 border-charcoal p-6 md:p-10 shadow-diy max-w-2xl mx-auto animate-window-pop text-center">
        <h2 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 uppercase tracking-tighter text-charcoal">{t.ma_rev_title}</h2>
        <p className="text-base md:text-lg text-slate-700 font-medium mb-6 md:mb-8 leading-relaxed">
          {t.ma_rev_text}
        </p>
        <button onClick={() => setIsRevealed(true)} className="w-full bg-jade text-white border-4 border-charcoal p-4 md:p-5 font-black uppercase text-lg md:text-xl shadow-diy hover:translate-y-1 hover:shadow-none transition-all">
          {t.ma_rev_btn}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border-4 border-charcoal p-4 md:p-10 shadow-diy max-w-4xl mx-auto animate-window-pop">
      <h2 className="text-2xl md:text-3xl font-black mb-6 md:mb-8 uppercase tracking-tighter">{t.ma_title}</h2>
      
      <div className="bg-slate-100 p-4 md:p-6 rounded-xl border border-slate-300 mb-8 md:mb-10 flex flex-col items-center">
        <p className="font-bold text-slate-500 uppercase tracking-widest text-[10px] md:text-xs mb-4 text-center">{t.ma_ref_title}</p>
        <div className="bg-white p-4 md:p-6 w-full max-w-sm shadow-md rounded-xl pointer-events-none select-none">
          <h3 className="font-bold mb-2 text-sm md:text-base">{t.ma_ref_modal}</h3>
          <div className="w-full py-2 md:py-3 bg-purple-600 rounded mb-2 flex items-center justify-center text-white font-bold text-xs md:text-sm">{t.cs_btn_accept}</div>
          <div className="w-full py-2 md:py-3 border-2 border-slate-300 rounded mb-2 flex items-center justify-center text-slate-500 font-bold text-xs md:text-sm">{t.cs_btn_settings}</div>
          <div className="w-full py-2 md:py-3 border-2 border-slate-300 rounded flex items-center justify-center text-slate-500 font-bold text-xs md:text-sm">{t.cs_btn_deny}</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
        
        <div className="bg-slate-50 p-4 md:p-6 border-2 border-slate-200">
          <label className="block font-bold mb-4 text-base md:text-lg">{t.ma_q1}</label>
          <div className="flex justify-between text-[10px] md:text-xs font-bold text-slate-400 mb-2 uppercase"><span>{t.ma_q1_1}</span><span>{t.ma_q1_5}</span></div>
          <input type="range" min="1" max="5" value={q1} onChange={(e) => setQ1(parseInt(e.target.value))} className="w-full accent-jade cursor-pointer h-2 bg-slate-300 rounded-lg appearance-none" />
          <div className="flex justify-between mt-2 px-1">
            {[1, 2, 3, 4, 5].map(num => <span key={num} className={`font-black text-base md:text-lg ${q1 === num ? 'text-jade' : 'text-slate-300'}`}>{num}</span>)}
          </div>
        </div>

        <div className="bg-slate-50 p-4 md:p-6 border-2 border-slate-200">
          <label className="block font-bold mb-4 text-base md:text-lg">{t.ma_q2}</label>
          <div className="space-y-3">
            {t.ma_q2_opts.map(opt => (
              <label key={opt} className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="q2" value={opt} checked={q2 === opt} onChange={(e) => setQ2(e.target.value)} className="w-5 h-5 accent-jade shrink-0" />
                <span className="font-medium text-sm md:text-base">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-4 md:p-6 border-2 border-slate-200">
          <label className="block font-bold mb-4 text-base md:text-lg">{t.ma_q3}</label>
          <div className="space-y-3">
            {t.ma_q3_opts.map(opt => (
              <label key={opt} className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="q3" value={opt} checked={q3 === opt} onChange={(e) => setQ3(e.target.value)} className="w-5 h-5 accent-jade shrink-0" />
                <span className="font-medium text-sm md:text-base">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-4 md:p-6 border-2 border-slate-200">
          <label className="block font-bold mb-4 text-base md:text-lg">{t.ma_q4}</label>
          <div className="space-y-3">
            {t.ma_q4_opts.map(opt => (
              <label key={opt} className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="q4" value={opt} checked={q4 === opt} onChange={(e) => setQ4(e.target.value)} className="w-5 h-5 accent-jade shrink-0" />
                <span className="font-medium text-sm md:text-base">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-4 md:p-6 border-2 border-slate-200 border-l-8 border-l-purple-600 overflow-hidden">
          <label className="block font-bold mb-4 text-base md:text-lg">{t.ma_q5}</label>
          <div className="flex justify-between text-[9px] md:text-xs font-bold text-slate-400 mb-2 uppercase"><span>{t.ma_q5_1}</span><span className="hidden sm:inline">{t.ma_q5_4}</span><span>{t.ma_q5_7}</span></div>
          <input type="range" min="1" max="7" value={q5} onChange={(e) => setQ5(parseInt(e.target.value))} className="w-full accent-purple-600 cursor-pointer h-2 bg-slate-300 rounded-lg appearance-none" />
          <div className="flex justify-between mt-2 px-1">
            {[1, 2, 3, 4, 5, 6, 7].map(num => <span key={num} className={`font-black text-base md:text-lg ${q5 === num ? 'text-purple-600' : 'text-slate-300'}`}>{num}</span>)}
          </div>
        </div>

        <div className="bg-slate-50 p-4 md:p-6 border-2 border-slate-200">
          <label className="block font-bold mb-4 text-base md:text-lg">{t.ma_q6}</label>
          <textarea 
            value={q6} onChange={(e) => setQ6(e.target.value)}
            className="w-full border-2 border-slate-300 p-3 rounded focus:outline-none focus:border-jade resize-none h-24 text-sm md:text-base"
            placeholder={t.ma_q6_ph}
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={!isFormValid}
          className="w-full bg-charcoal text-white border-4 border-charcoal p-4 md:p-5 font-black uppercase text-lg md:text-xl shadow-diy hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t.ma_btn}
        </button>
      </form>
    </div>
  );
}