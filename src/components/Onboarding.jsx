// src/components/Onboarding.jsx
import { useState } from 'react';

export default function Onboarding({ t, onNext }) {
  const [age, setAge] = useState('');
  const [tech, setTech] = useState(3);
  const [error, setError] = useState('');

  const handleStart = () => {
    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum < 0 || ageNum > 99) {
      setError(t.ob_age_err);
      return;
    }
    setError('');
    onNext({ age: ageNum, techSavvy: tech });
  };

  return (
    <div className="bg-white border-4 border-charcoal p-6 md:p-8 shadow-diy max-w-md mx-auto animate-window-pop relative">
      <h2 className="text-2xl md:text-3xl font-black mb-6 md:mb-8 uppercase tracking-tighter">{t.ob_title}</h2>
      
      <div className="space-y-6 md:space-y-8">
        <div>
          <label className="block font-bold mb-2">{t.ob_age}</label>
          <input 
            type="number" min="0" max="99"
            value={age} onChange={(e) => setAge(e.target.value)}
            className="w-full border-4 border-charcoal p-3 focus:outline-none focus:bg-jade focus:text-white transition-colors"
            placeholder={t.ob_age_ph}
          />
        </div>

        <div>
          <label className="block font-bold mb-2">{t.ob_tech}</label>
          <div className="flex justify-between text-[10px] md:text-xs text-slate-500 mb-2 uppercase font-bold">
            <span>{t.ob_tech_1}</span>
            <span>{t.ob_tech_5}</span>
          </div>
          <input type="range" min="1" max="5" value={tech} onChange={(e) => setTech(e.target.value)} className="w-full accent-jade cursor-pointer" />
          <div className="text-center font-black text-xl md:text-2xl mt-2">{tech}</div>
        </div>

        {error && <p className="text-red-600 font-bold text-xs mt-2 bg-red-50 p-3 border-l-4 border-red-600">{error}</p>}

        <button onClick={handleStart} className="w-full bg-jade text-white border-4 border-charcoal p-4 font-black uppercase text-lg md:text-xl shadow-diy hover:translate-y-1 hover:shadow-none transition-all">
          {t.ob_start}
        </button>
      </div>
    </div>
  );
}