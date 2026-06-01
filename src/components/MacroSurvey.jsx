import { useState } from 'react';

export default function MacroSurvey({ group, t, onComplete }) {
  const [showReveal, setShowReveal] = useState(true);
  
  const [q1, setQ1] = useState(4);
  const [q2, setQ2] = useState(4);
  const [q3, setQ3] = useState(4);
  const [q4a, setQ4a] = useState(4); // Neu: Ästhetik
  const [q4b, setQ4b] = useState(4); // Neu: Professionalität
  const [q5, setQ5] = useState(4);

  const handleSubmit = () => {
    onComplete({ 
      steerScore: q1, 
      freedomScore: q2, 
      fairnessScore: q3, 
      aestheticScore: q4a,
      professionalScore: q4b,
      respectScore: q5
    });
  };

  if (showReveal) {
    return (
      <div className="bg-white border-4 border-charcoal p-6 md:p-10 shadow-diy max-w-2xl mx-auto text-left animate-window-pop">
        <h2 className="text-2xl font-black mb-4 uppercase text-charcoal">{t.ma_reveal_title}</h2>
        <p className="text-slate-700 mb-6 font-medium leading-relaxed">
          {group === 'A' ? t.ma_reveal_A : t.ma_reveal_B}
        </p>
        
        {/* Quellenangabe */}
        <p className="text-xs text-slate-400 italic mb-8">
          {t.ma_source}
        </p>

        <div className="bg-slate-100 border-2 border-slate-200 p-4 mb-8 flex justify-center">
          <div className="w-full max-w-sm border border-slate-300 bg-white p-4 shadow-sm rounded">
            <h3 className="font-bold text-sm mb-2">{t.cs_modal_title}</h3>
            {group === 'A' ? (
              <div className="flex flex-col gap-2">
                <div className="w-full py-2 bg-purple-600 text-white text-center text-xs font-bold rounded">{t.cs_btn_accept}</div>
                <div className="w-full py-2 border border-slate-300 text-slate-600 text-center text-xs font-bold rounded">{t.cs_btn_settings}</div>
                <div className="w-full py-2 border border-slate-300 text-slate-600 text-center text-xs font-bold rounded">{t.cs_btn_deny}</div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="w-full py-2 bg-slate-100 border border-slate-300 text-slate-700 text-center text-xs font-bold rounded">{t.cs_btn_accept}</div>
                <div className="w-full py-2 bg-slate-100 border border-slate-300 text-slate-700 text-center text-xs font-bold rounded">{t.cs_btn_settings}</div>
                <div className="w-full py-2 bg-slate-100 border border-slate-300 text-slate-700 text-center text-xs font-bold rounded">{t.cs_btn_deny}</div>
              </div>
            )}
          </div>
        </div>
        
        <button onClick={() => setShowReveal(false)} className="w-full bg-charcoal text-white border-4 border-charcoal p-4 font-black uppercase text-xl shadow-diy hover:bg-jade transition-all">
          {t.ma_reveal_btn}
        </button>
      </div>
    );
  }

  const questions = [
    { label: t.ma_q1, state: q1, set: setQ1 },
    { label: t.ma_q2, state: q2, set: setQ2 },
    { label: t.ma_q3, state: q3, set: setQ3 },
    { label: t.ma_q4a, state: q4a, set: setQ4a },
    { label: t.ma_q4b, state: q4b, set: setQ4b },
    { label: t.ma_q5, state: q5, set: setQ5 },
  ];

  return (
    <div className="bg-white border-4 border-charcoal p-6 md:p-10 shadow-diy max-w-2xl mx-auto text-left animate-window-pop">
      <h2 className="text-2xl font-black mb-4 uppercase text-charcoal">{t.ma_title}</h2>
      <p className="text-slate-600 mb-8 font-bold">{t.ma_text}</p>

      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={idx} className="bg-slate-50 p-6 border-2 border-slate-200">
            <label className="block font-bold mb-6 text-base text-charcoal">{q.label}</label>
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase">
              <span>{t.mi_scale_1} (1)</span><span>{t.mi_scale_7} (7)</span>
            </div>
            <input type="range" min="1" max="7" value={q.state} onChange={(e) => q.set(parseInt(e.target.value))} className="w-full accent-jade cursor-pointer h-2 bg-slate-300 rounded-lg appearance-none" />
            <div className="flex justify-between mt-2 px-1">
              {[1, 2, 3, 4, 5, 6, 7].map(num => <span key={num} className={`font-black text-lg ${q.state === num ? 'text-jade' : 'text-slate-300'}`}>{num}</span>)}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} className="w-full mt-8 bg-charcoal text-white border-4 border-charcoal p-4 font-black uppercase text-xl shadow-diy hover:bg-jade transition-all">
        {t.ma_btn}
      </button>
    </div>
  );
}