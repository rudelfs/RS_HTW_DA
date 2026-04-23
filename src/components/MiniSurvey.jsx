import { useState } from 'react';

export default function MiniSurvey({ onComplete }) {
  const [clarity, setClarity] = useState(3);
  const [appropriateness, setAppropriateness] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete({ clarity, appropriateness });
  };

  return (
    <div className="bg-white border-4 border-charcoal p-10 shadow-diy max-w-2xl mx-auto mt-10 animate-window-pop">
      <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter">Kurzes Feedback</h2>
      <p className="mb-8 font-bold text-slate-600">Bitte bewerten Sie die soeben gesehene Seite.</p>
      
      <form onSubmit={handleSubmit} className="space-y-10">
        <div>
          <label className="block font-black mb-4 text-lg">„Es war direkt klar, welche Optionen mir zur Verfügung stehen.“</label>
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase">
            <span>Stimme gar nicht zu (1)</span>
            <span>Stimme voll zu (5)</span>
          </div>
          <input 
            type="range" min="1" max="5" 
            value={clarity} 
            onChange={(e) => setClarity(parseInt(e.target.value))}
            className="w-full accent-jade cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
          />
          <div className="flex justify-between mt-2 px-1">
            {[1, 2, 3, 4, 5].map(num => (
              <span key={num} className={`font-black text-lg ${clarity === num ? 'text-jade' : 'text-slate-300'}`}>{num}</span>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-black mb-4 text-lg">„Ich empfand die Gestaltung und den Text der Auswahl als angemessen.“</label>
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase">
            <span>Stimme gar nicht zu (1)</span>
            <span>Stimme voll zu (5)</span>
          </div>
          <input 
            type="range" min="1" max="5" 
            value={appropriateness} 
            onChange={(e) => setAppropriateness(parseInt(e.target.value))}
            className="w-full accent-jade cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
          />
          <div className="flex justify-between mt-2 px-1">
            {[1, 2, 3, 4, 5].map(num => (
              <span key={num} className={`font-black text-lg ${appropriateness === num ? 'text-jade' : 'text-slate-300'}`}>{num}</span>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-charcoal text-white border-4 border-charcoal p-5 font-black uppercase text-xl shadow-diy hover:translate-y-1 hover:shadow-none hover:bg-jade transition-all"
        >
          Weiter
        </button>
      </form>
    </div>
  );
}