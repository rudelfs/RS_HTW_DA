// src/components/ControlSurvey.jsx
import { useState } from 'react';

export default function ControlSurvey({ t, onComplete }) {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState(4);

  const isValid = q1 !== '' && q2 !== '';

  return (
    <div className="bg-white border-4 border-charcoal p-6 md:p-10 shadow-diy max-w-3xl mx-auto animate-window-pop">
      <h2 className="text-2xl font-black mb-8 uppercase">{t.co_title}</h2>
      
      <div className="space-y-8 mb-8">
        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label className="block font-bold mb-4 text-lg">{t.co_q1}</label>
          <div className="space-y-3">
            {t.co_q1_opts.map(opt => (
              <label key={opt} className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="c_q1" value={opt} checked={q1 === opt} onChange={(e) => setQ1(e.target.value)} className="w-5 h-5 accent-jade shrink-0" />
                <span className="font-medium text-base">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label className="block font-bold mb-4 text-lg">{t.co_q2}</label>
          <div className="space-y-3">
            {t.co_q2_opts.map(opt => (
              <label key={opt} className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="c_q2" value={opt} checked={q2 === opt} onChange={(e) => setQ2(e.target.value)} className="w-5 h-5 accent-jade shrink-0" />
                <span className="font-medium text-base">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label className="block font-bold mb-6 text-lg">{t.co_q3}</label>
          <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase">
            <span>{t.co_scale_1} (1)</span><span>{t.co_scale_7} (7)</span>
          </div>
          <input 
            type="range" min="1" max="7" 
            value={q3} onChange={(e) => setQ3(parseInt(e.target.value))} 
            className="w-full accent-jade cursor-pointer h-2 bg-slate-300 rounded-lg appearance-none" 
          />
          <div className="flex justify-between mt-2 px-1">
            {[1, 2, 3, 4, 5, 6, 7].map(n => (
              <span key={n} className={`font-black text-lg ${q3 === n ? 'text-jade' : 'text-slate-300'}`}>{n}</span>
            ))}
          </div>
        </div>
      </div>

      <button onClick={() => onComplete({ frequency: q1, preference: q2, knowledge: q3 })} disabled={!isValid} className="w-full bg-jade text-white border-4 border-charcoal p-4 font-black uppercase text-xl shadow-diy disabled:opacity-50">
        {t.co_btn}
      </button>
    </div>
  );
}