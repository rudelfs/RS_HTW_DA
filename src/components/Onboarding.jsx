import { useState } from 'react';

export default function Onboarding({ t, onNext }) {
  const [age, setAge] = useState('');
  const [occ, setOcc] = useState('');
  const [tech, setTech] = useState(3);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    // Altersbegrenzung 10 bis 110
    if (!age || isNaN(age) || age < 10 || age > 110 || !occ) {
      setError(true);
      return;
    }
    onNext({ age: parseInt(age), occupation: occ, techSkill: tech });
  };

  return (
    <div className="bg-white border-4 border-charcoal p-6 md:p-10 shadow-diy max-w-2xl mx-auto text-left">
      <h2 className="text-2xl font-black mb-4 uppercase text-charcoal">{t.ob_title}</h2>
      <p className="text-slate-600 mb-8 font-bold">{t.ob_text}</p>
      
      <div className="space-y-6">
        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label htmlFor="input-age" className="block font-bold mb-2 text-lg text-charcoal">{t.ob_age}</label>
          <input 
            id="input-age"
            type="number" 
            value={age} 
            onChange={(e) => setAge(e.target.value)}
            placeholder={t.ob_age_ph}
            className="w-full border-2 border-slate-300 p-3 font-bold focus:outline-none focus:border-jade text-charcoal"
          />
        </div>

        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label className="block font-bold mb-4 text-lg text-charcoal">{t.ob_occ}</label>
          <div className="flex flex-col gap-3">
            {t.ob_occ_opts.map((opt, i) => (
              <label key={opt} htmlFor={`occ-opt-${i}`} className="flex items-center gap-3 cursor-pointer">
                <input id={`occ-opt-${i}`} type="radio" name="occ" value={opt} checked={occ === opt} onChange={(e) => setOcc(e.target.value)} className="w-5 h-5 accent-jade" />
                <span className="font-bold text-charcoal">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label htmlFor="tech-slider" className="block font-bold mb-6 text-lg text-charcoal">{t.ob_tech}</label>
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase">
            <span>{t.ob_tech_1}</span><span>{t.ob_tech_5}</span>
          </div>
          <input id="tech-slider" type="range" min="1" max="5" value={tech} onChange={(e) => setTech(parseInt(e.target.value))} className="w-full accent-jade cursor-pointer h-2 bg-slate-300 rounded-lg appearance-none" />
          <div className="flex justify-between mt-2 px-1">
            {[1, 2, 3, 4, 5].map(num => <span key={num} className={`font-black text-lg ${tech === num ? 'text-jade' : 'text-slate-300'}`}>{num}</span>)}
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 font-bold mt-4">{t.ob_age_err}</p>}

      <button 
        onClick={handleSubmit} 
        className="w-full mt-8 bg-charcoal text-white border-4 border-charcoal p-4 font-black uppercase text-xl shadow-diy hover:bg-jade transition-all"
      >
        {t.ob_start}
      </button>
    </div>
  );
}