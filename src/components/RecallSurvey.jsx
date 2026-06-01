// src/components/RecallSurvey.jsx

import { useState } from 'react';

export default function RecallSurvey({ t, onComplete }) {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');

  const handleSubmit = () => {
    onComplete({ 
      bannerRead: q1,
      reason: q2 
    });
  };

  return (
    <div className="bg-white border-4 border-charcoal p-6 md:p-10 shadow-diy max-w-2xl mx-auto text-left animate-window-pop">
      <h2 className="text-2xl font-black mb-8 uppercase text-charcoal">{t.re_title}</h2>
      
      <div className="space-y-8">
        
        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label className="block font-bold mb-4 text-lg text-charcoal">{t.re_q1}</label>
          <div className="flex flex-col gap-3">
            {t.re_q1_opts.map((opt, idx) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="bannerRead" 
                  value={opt} 
                  checked={q1 === opt}
                  onChange={(e) => setQ1(e.target.value)}
                  className="w-5 h-5 accent-jade cursor-pointer"
                />
                <span className="font-medium text-slate-700 group-hover:text-charcoal transition-colors">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label htmlFor="recall-reason" className="block font-bold mb-4 text-lg text-charcoal">{t.re_q2}</label>
          <textarea 
            id="recall-reason"
            value={q2} 
            onChange={(e) => setQ2(e.target.value)}
            placeholder={t.re_q2_ph}
            className="w-full border-2 border-slate-300 p-3 min-h-[100px] font-bold focus:outline-none focus:border-jade text-charcoal resize-y"
          ></textarea>
        </div>

      </div>

      <button 
        onClick={handleSubmit} 
        disabled={!q1 || q2.length < 5}
        className="w-full mt-8 bg-charcoal text-white border-4 border-charcoal p-4 font-black uppercase text-xl shadow-diy hover:bg-jade transition-all disabled:opacity-50"
      >
        {t.re_btn}
      </button>
    </div>
  );
}