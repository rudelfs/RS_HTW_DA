import { useState } from 'react';

export default function MicroSurvey({ t, onComplete }) {
  const [q1, setQ1] = useState(3);
  const [q2, setQ2] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete({ clarity: q1, ease: q2 });
  };

  return (
    <div className="bg-white border-4 border-charcoal p-6 md:p-10 shadow-diy max-w-2xl mx-auto animate-window-pop">
      <h2 className="text-xl md:text-2xl font-black mb-6 uppercase tracking-tighter">{t.mi_title}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
        <div className="bg-slate-50 p-4 md:p-6 border-2 border-slate-200">
          <label className="block font-bold mb-4 text-base md:text-lg">{t.mi_q1}</label>
          <div className="flex justify-between text-[10px] md:text-xs font-bold text-slate-400 mb-2 uppercase">
            <span>{t.mi_scale_1}</span>
            <span>{t.mi_scale_5}</span>
          </div>
          <input 
            type="range" min="1" max="5" value={q1} onChange={(e) => setQ1(parseInt(e.target.value))}
            className="w-full accent-jade cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
          />
          <div className="flex justify-between mt-2 px-1">
            {[1, 2, 3, 4, 5].map(num => <span key={num} className={`font-black text-base md:text-lg ${q1 === num ? 'text-jade' : 'text-slate-300'}`}>{num}</span>)}
          </div>
        </div>

        <div className="bg-slate-50 p-4 md:p-6 border-2 border-slate-200">
          <label className="block font-bold mb-4 text-base md:text-lg">{t.mi_q2}</label>
          <div className="flex justify-between text-[10px] md:text-xs font-bold text-slate-400 mb-2 uppercase">
            <span>{t.mi_scale_1}</span>
            <span>{t.mi_scale_5}</span>
          </div>
          <input 
            type="range" min="1" max="5" value={q2} onChange={(e) => setQ2(parseInt(e.target.value))}
            className="w-full accent-jade cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
          />
          <div className="flex justify-between mt-2 px-1">
            {[1, 2, 3, 4, 5].map(num => <span key={num} className={`font-black text-base md:text-lg ${q2 === num ? 'text-jade' : 'text-slate-300'}`}>{num}</span>)}
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-charcoal text-white border-4 border-charcoal p-4 font-black uppercase text-lg md:text-xl shadow-diy hover:translate-y-1 hover:shadow-none hover:bg-jade transition-all"
        >
          {t.mi_btn}
        </button>
      </form>
    </div>
  );
}