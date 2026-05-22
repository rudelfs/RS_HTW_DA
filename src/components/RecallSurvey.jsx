// src/components/RecallSurvey.jsx
import { useState } from 'react';

export default function RecallSurvey({ t, onComplete }) {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');

  return (
    <div className="bg-white border-4 border-charcoal p-6 md:p-10 shadow-diy max-w-2xl mx-auto animate-window-pop">
      <h2 className="text-2xl font-black mb-6 uppercase">{t.re_title}</h2>
      
      <div className="space-y-8 mb-8">
        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label className="block font-bold mb-4 text-lg">{t.re_q1}</label>
          <div className="space-y-3">
            {t.re_q1_opts.map(opt => (
              <label key={opt} className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="q1" value={opt} checked={q1 === opt} onChange={(e) => setQ1(e.target.value)} className="w-5 h-5 accent-jade shrink-0" />
                <span className="font-medium text-base">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label className="block font-bold mb-4 text-lg">{t.re_q2}</label>
          <textarea 
            value={q2} onChange={(e) => setQ2(e.target.value)}
            className="w-full border-2 border-slate-300 p-3 rounded focus:outline-none focus:border-jade resize-none h-24"
            placeholder={t.re_q2_ph}
          ></textarea>
        </div>
      </div>

      <button onClick={() => onComplete({ bannerRead: q1, reason: q2 })} disabled={!q1 || !q2.trim()} className="w-full bg-charcoal text-white border-4 border-charcoal p-4 font-black uppercase text-xl shadow-diy disabled:opacity-50">
        {t.re_btn}
      </button>
    </div>
  );
}