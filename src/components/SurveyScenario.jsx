import { useState } from 'react';

export default function SurveyScenario({ onComplete }) {
  const [rating, setRating] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete({ placeholderRating: rating });
  };

  return (
    <div className="bg-white border-4 border-charcoal p-10 shadow-diy max-w-2xl mx-auto mt-10 animate-window-pop">
      <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter">Kurze Umfrage</h2>
      <p className="mb-8 font-bold text-slate-600">Bitte beantworten Sie abschließend diese Frage zu Ihrem Erlebnis.</p>
      
      <form onSubmit={handleSubmit} className="space-y-12">
        <div>
          <label className="block font-black mb-6 text-lg">(Placeholder) Wie bewerten Sie die Übersichtlichkeit?</label>
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase">
            <span>Gar nicht übersichtlich (1)</span>
            <span>Sehr übersichtlich (5)</span>
          </div>
          <input 
            type="range" 
            min="1" max="5" 
            value={rating} 
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="w-full accent-jade cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
          />
          <div className="text-center font-black text-4xl mt-6 text-charcoal">{rating}</div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-charcoal text-white border-4 border-charcoal p-5 font-black uppercase text-xl shadow-diy hover:translate-y-1 hover:shadow-none hover:bg-jade transition-all"
        >
          Umfrage abschließen
        </button>
      </form>
    </div>
  );
}