import { useState } from 'react';

export default function MicroSurvey({ t, onComplete }) {
  const [q1, setQ1] = useState(4); // Trustworthy
  const [q2, setQ2] = useState(4); // Benevolence (Nutzerinteressen)
  const [reason, setReason] = useState('');

  return (
    <div className="bg-white border-4 border-charcoal p-6 md:p-10 shadow-diy max-w-2xl mx-auto animate-window-pop">
      <h2 className="text-2xl font-black mb-4 uppercase">{t.mi_title}</h2>
      <p className="text-slate-600 mb-8 font-bold">{t.mi_text}</p>
      
      <div className="space-y-6 text-left">
        
        {/* Item 1: Vertrauenswürdigkeit */}
        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label className="block font-bold mb-6 text-lg">{t.mi_q1}</label>
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase">
            <span>{t.mi_scale_1} (1)</span><span>{t.mi_scale_7} (7)</span>
          </div>
          <input type="range" min="1" max="7" value={q1} onChange={(e) => setQ1(parseInt(e.target.value))} className="w-full accent-jade cursor-pointer h-2 bg-slate-300 rounded-lg appearance-none" />
          <div className="flex justify-between mt-2 px-1">
            {[1, 2, 3, 4, 5, 6, 7].map(num => <span key={num} className={`font-black text-lg ${q1 === num ? 'text-jade' : 'text-slate-300'}`}>{num}</span>)}
          </div>
        </div>

        {/* Item 1b: Nutzerinteressen respektieren */}
        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label className="block font-bold mb-6 text-lg">{t.mi_q2}</label>
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase">
            <span>{t.mi_scale_1} (1)</span><span>{t.mi_scale_7} (7)</span>
          </div>
          <input type="range" min="1" max="7" value={q2} onChange={(e) => setQ2(parseInt(e.target.value))} className="w-full accent-jade cursor-pointer h-2 bg-slate-300 rounded-lg appearance-none" />
          <div className="flex justify-between mt-2 px-1">
            {[1, 2, 3, 4, 5, 6, 7].map(num => <span key={num} className={`font-black text-lg ${q2 === num ? 'text-jade' : 'text-slate-300'}`}>{num}</span>)}
          </div>
        </div>

        {/* Freitextfeld für Begründung */}
        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label className="block font-bold mb-4 text-lg">{t.mi_q_reason}</label>
          <textarea 
            value={reason} onChange={(e) => setReason(e.target.value)}
            className="w-full border-2 border-slate-300 p-3 rounded focus:outline-none focus:border-jade resize-none h-24 font-sans"
            placeholder={t.mi_q_ph}
          ></textarea>
        </div>
      </div>

      <button 
        onClick={() => onComplete({ trustworthyRating: q1, benevolenceRating: q2, reason: reason })} 
        disabled={!reason.trim()}
        className="w-full mt-8 bg-charcoal text-white border-4 border-charcoal p-4 font-black uppercase text-xl shadow-diy hover:bg-jade transition-all disabled:opacity-50"
      >
        {t.mi_btn}
      </button>
    </div>
  );
}