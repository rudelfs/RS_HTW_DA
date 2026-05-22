// src/components/MacroSurvey.jsx
import { useState } from 'react';

export default function MacroSurvey({ group, t, onComplete }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [ratings, setRatings] = useState({ q1: 4, q2: 4, q3: 4, q4: 4, q5: 4 });

  const questions = [
    { id: 'q1', label: t.ma_q1 },
    { id: 'q2', label: t.ma_q2 },
    { id: 'q3', label: t.ma_q3 },
    { id: 'q4', label: t.ma_q4 },
    { id: 'q5', label: t.ma_q5 }
  ];

  if (!isRevealed) {
    return (
      <div className="bg-white border-4 border-charcoal p-6 md:p-10 shadow-diy max-w-2xl mx-auto animate-window-pop">
        <h2 className="text-2xl font-black mb-6 uppercase text-center">{t.ma_reveal_title}</h2>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 text-left mb-8">
          <p className="text-lg text-slate-800 font-medium leading-relaxed mb-6">
            {group === 'A' ? t.ma_reveal_A : t.ma_reveal_B}
          </p>
          
          {/* Mockup des gezeigten Banners */}
          <div className="bg-white p-4 w-full max-w-sm shadow-md rounded-xl pointer-events-none mx-auto">
            <h3 className="font-bold mb-3">{t.cs_modal_title}</h3>
            {group === 'A' ? (
              <div className="flex flex-col gap-2">
                <div className="w-full py-2 bg-purple-600 rounded text-center text-white font-bold text-sm">{t.cs_btn_accept}</div>
                <div className="w-full py-2 border-2 border-slate-200 rounded text-center text-slate-400 font-bold text-sm">{t.cs_btn_settings}</div>
                <div className="w-full py-2 border-2 border-slate-200 rounded text-center text-slate-400 font-bold text-sm">{t.cs_btn_deny}</div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="w-full py-2 border-2 border-slate-200 bg-slate-100 rounded text-center text-slate-500 font-bold text-sm">{t.cs_btn_accept}</div>
                <div className="w-full py-2 border-2 border-slate-200 bg-slate-100 rounded text-center text-slate-500 font-bold text-sm">{t.cs_btn_settings}</div>
                <div className="w-full py-2 border-2 border-slate-200 bg-slate-100 rounded text-center text-slate-500 font-bold text-sm">{t.cs_btn_deny}</div>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => setIsRevealed(true)} className="w-full bg-charcoal text-white border-4 border-charcoal p-4 font-black uppercase text-xl shadow-diy hover:bg-jade">
          {t.ma_reveal_btn}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border-4 border-charcoal p-6 md:p-10 shadow-diy max-w-3xl mx-auto animate-window-pop">
      <h2 className="text-2xl font-black mb-4 uppercase">{t.ma_title}</h2>
      <p className="text-slate-600 mb-8 font-bold">{t.ma_text}</p>
      
      <div className="space-y-8 mb-8">
        {questions.map((q) => (
          <div key={q.id} className="bg-slate-50 p-6 border-2 border-slate-200">
            <label className="block font-bold mb-6 text-lg">{q.label}</label>
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase">
              <span>{t.mi_scale_1}</span><span>{t.mi_scale_7}</span>
            </div>
            <input 
              type="range" min="1" max="7" 
              value={ratings[q.id]} 
              onChange={(e) => setRatings({...ratings, [q.id]: parseInt(e.target.value)})}
              className="w-full accent-charcoal cursor-pointer h-2 bg-slate-300 rounded-lg appearance-none"
            />
            <div className="flex justify-between mt-2 px-1">
              {[1, 2, 3, 4, 5, 6, 7].map(n => (
                <span key={n} className={`font-black text-lg ${ratings[q.id] === n ? 'text-charcoal' : 'text-slate-300'}`}>{n}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => onComplete(ratings)} className="w-full bg-charcoal text-white border-4 border-charcoal p-4 font-black uppercase text-xl shadow-diy hover:bg-jade">
        {t.ma_btn}
      </button>
    </div>
  );
}