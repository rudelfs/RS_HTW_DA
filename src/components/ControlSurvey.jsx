import { useState } from 'react';

export default function ControlSurvey({ t, onComplete }) {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState(4);
  const [q4, setQ4] = useState(4); 

  const handleSubmit = () => {
    onComplete({ 
      cookieEncounterFreq: q1, 
      cookiePreference: q2, 
      cookieKnowledge: q3,
      timePressureFelt: q4
    });
  };

  const isComplete = q1 !== '' && q2 !== '';

  return (
    <div className="bg-white border-4 border-charcoal p-6 md:p-10 shadow-diy max-w-2xl mx-auto text-left">
      <h2 className="text-2xl font-black mb-4 uppercase text-charcoal">{t.co_title}</h2>
      
      <div className="space-y-6">
        
        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label className="block font-bold mb-4 text-lg text-charcoal">{t.co_q1}</label>
          <div className="flex flex-col gap-3">
            {t.co_q1_opts.map((opt, i) => (
              <label key={opt} htmlFor={`co1-opt-${i}`} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-100 rounded">
                <input id={`co1-opt-${i}`} type="radio" name="co_q1" value={opt} checked={q1 === opt} onChange={(e) => setQ1(e.target.value)} className="w-5 h-5 accent-jade" />
                <span className="font-bold text-slate-700">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label className="block font-bold mb-4 text-lg text-charcoal">{t.co_q2}</label>
          <div className="flex flex-col gap-3">
            {t.co_q2_opts.map((opt, i) => (
              <label key={opt} htmlFor={`co2-opt-${i}`} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-100 rounded">
                <input id={`co2-opt-${i}`} type="radio" name="co_q2" value={opt} checked={q2 === opt} onChange={(e) => setQ2(e.target.value)} className="w-5 h-5 accent-jade" />
                <span className="font-bold text-slate-700">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label htmlFor="knowledge-slider" className="block font-bold mb-6 text-lg text-charcoal">{t.co_q3}</label>
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase">
            <span>{t.co_scale_1} (1)</span><span>{t.co_scale_7} (7)</span>
          </div>
          <input id="knowledge-slider" type="range" min="1" max="7" value={q3} onChange={(e) => setQ3(parseInt(e.target.value))} className="w-full accent-jade cursor-pointer h-2 bg-slate-300 rounded-lg appearance-none" />
          <div className="flex justify-between mt-2 px-1">
            {[1, 2, 3, 4, 5, 6, 7].map(num => <span key={num} className={`font-black text-lg ${q3 === num ? 'text-jade' : 'text-slate-300'}`}>{num}</span>)}
          </div>
        </div>

        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label htmlFor="pressure-slider" className="block font-bold mb-6 text-lg text-charcoal">{t.co_q4}</label>
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase">
            <span>{t.co_scale_1} (1)</span><span>{t.co_scale_7} (7)</span>
          </div>
          <input id="pressure-slider" type="range" min="1" max="7" value={q4} onChange={(e) => setQ4(parseInt(e.target.value))} className="w-full accent-jade cursor-pointer h-2 bg-slate-300 rounded-lg appearance-none" />
          <div className="flex justify-between mt-2 px-1">
            {[1, 2, 3, 4, 5, 6, 7].map(num => <span key={num} className={`font-black text-lg ${q4 === num ? 'text-jade' : 'text-slate-300'}`}>{num}</span>)}
          </div>
        </div>

      </div>

      <button 
        onClick={handleSubmit} 
        disabled={!isComplete}
        className="w-full mt-8 bg-charcoal text-white border-4 border-charcoal p-4 font-black uppercase text-xl shadow-diy hover:bg-jade transition-all disabled:opacity-50"
      >
        {t.co_btn}
      </button>
    </div>
  );
}