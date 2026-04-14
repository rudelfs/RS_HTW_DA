import { useState } from 'react';

export default function Onboarding({ t, onNext }) {
  const [age, setAge] = useState('');
  const [tech, setTech] = useState(3);

  return (
    <div className="bg-white border-4 border-charcoal p-8 shadow-diy">
      <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter">{t.onboarding_title}</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block font-bold mb-2">{t.age_label}</label>
          <input 
            type="number" 
            value={age} 
            onChange={(e) => setAge(e.target.value)}
            className="w-full border-4 border-charcoal p-3 focus:outline-none focus:bg-jade focus:text-white"
          />
        </div>

        <div>
          <label className="block font-bold mb-2">{t.tech_label}</label>
          <input 
            type="range" min="1" max="5" value={tech} 
            onChange={(e) => setTech(e.target.value)}
            className="w-full accent-jade"
          />
          <div className="text-center font-black text-2xl mt-2">{tech}</div>
        </div>

        <button 
          onClick={() => age && onNext({ age, techSavvy: tech })}
          className="w-full bg-jade text-white border-4 border-charcoal p-4 font-black uppercase text-xl shadow-diy hover:translate-y-1 hover:shadow-none transition-all"
        >
          {t.start_btn}
        </button>
      </div>
    </div>
  );
}