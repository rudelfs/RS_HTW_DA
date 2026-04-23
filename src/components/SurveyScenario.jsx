// src/components/SurveyScenario.jsx
import { useState } from 'react';

export default function SurveyScenario({ onComplete }) {
  const [q1, setQ1] = useState(3);
  const [q2, setQ2] = useState({
    graphics: false,
    text: false,
    hidden: false,
    none: false
  });
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState(3);
  const [q5, setQ5] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCheckboxChange = (field) => {
    if (field === 'none') {
      setQ2({ graphics: false, text: false, hidden: false, none: !q2.none });
    } else {
      setQ2({ ...q2, [field]: !q2[field], none: false });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white border-4 border-charcoal p-10 shadow-diy max-w-2xl mx-auto mt-10 animate-window-pop">
        <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter text-charcoal">Vielen Dank! (Wichtige Aufklärung)</h2>
        <div className="space-y-4 text-slate-700 font-medium mb-8 leading-relaxed">
          <p>Ihre Antworten wurden erfolgreich gespeichert.</p>
          <p>
            Zu Beginn wurde Ihnen mitgeteilt, es handele sich um einen reinen Usability-Test. Tatsächlich untersucht diese wissenschaftliche Arbeit die <strong>Wirkung von "Dark Patterns"</strong> auf das Nutzerverhalten.
          </p>
          <p>
            Ihre Daten werden vollständig anonymisiert und rein für akademische Zwecke ausgewertet.
          </p>
        </div>
        <button     
          onClick={() => onComplete({ q1, q2, q3, q4, q5 })}
          className="w-full bg-charcoal text-white border-4 border-charcoal p-5 font-black uppercase text-xl shadow-diy hover:translate-y-1 hover:shadow-none hover:bg-jade transition-all"
        >
          Studie beenden & Daten freigeben
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border-4 border-charcoal p-10 shadow-diy max-w-3xl mx-auto mt-10 animate-window-pop">
      <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter">Abschließende Evaluation</h2>
      
      <form onSubmit={handleSubmit} className="space-y-12">
        
        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label className="block font-black mb-6 text-lg text-charcoal">
            1. Rückblickend auf die drei Aufgaben: Hatten Sie das Gefühl, dass die Website Sie bei Ihren Entscheidungen absichtlich in eine Richtung drängen wollte?
          </label>
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-3 uppercase">
            <span>Nein, gar nicht (1)</span>
            <span>Ja, sehr stark (5)</span>
          </div>
          <input type="range" min="1" max="5" value={q1} onChange={(e) => setQ1(parseInt(e.target.value))} className="w-full accent-jade cursor-pointer h-2 bg-slate-300 rounded-lg appearance-none" />
          <div className="flex justify-between mt-2 px-1">
            {[1, 2, 3, 4, 5].map(num => <span key={num} className={`font-black text-lg ${q1 === num ? 'text-jade' : 'text-slate-300'}`}>{num}</span>)}
          </div>
        </div>

        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label className="block font-black mb-6 text-lg text-charcoal">
            2. Wenn Sie den Versuch einer Beeinflussung gespürt haben, wodurch wurde dieser Ihrer Erinnerung nach primär ausgelöst? (Mehrfachnennung möglich)
          </label>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={q2.graphics} onChange={() => handleCheckboxChange('graphics')} className="w-5 h-5 accent-jade" />
              <span className="font-medium text-slate-700">Durch die grafische Gestaltung (Farben, Größen der Buttons).</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={q2.text} onChange={() => handleCheckboxChange('text')} className="w-5 h-5 accent-jade" />
              <span className="font-medium text-slate-700">Durch die Formulierung der Texte (z. B. Vorwürfe).</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={q2.hidden} onChange={() => handleCheckboxChange('hidden')} className="w-5 h-5 accent-jade" />
              <span className="font-medium text-slate-700">Durch das Verstecken von Optionen.</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={q2.none} onChange={() => handleCheckboxChange('none')} className="w-5 h-5 accent-jade" />
              <span className="font-medium text-slate-700">Ich habe keinen Versuch einer Beeinflussung wahrgenommen.</span>
            </label>
          </div>
        </div>

        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label className="block font-black mb-6 text-lg text-charcoal">
            3. Haben Sie in den Aufgaben mindestens einmal eine Option angeklickt, die Sie eigentlich nicht wählen wollten, weil es der scheinbar einfachere Weg war?
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer font-bold">
              <input type="radio" name="q3" value="Ja" checked={q3 === 'Ja'} onChange={(e) => setQ3(e.target.value)} className="w-5 h-5 accent-jade" /> Ja
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-bold">
              <input type="radio" name="q3" value="Nein" checked={q3 === 'Nein'} onChange={(e) => setQ3(e.target.value)} className="w-5 h-5 accent-jade" /> Nein
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-bold">
              <input type="radio" name="q3" value="Weiß nicht mehr" checked={q3 === 'Weiß nicht mehr'} onChange={(e) => setQ3(e.target.value)} className="w-5 h-5 accent-jade" /> Weiß nicht mehr
            </label>
          </div>
        </div>

        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label className="block font-black mb-6 text-lg text-charcoal">
            4. Wie würde eine solche Gestaltung der Auswahlmöglichkeiten Ihr Vertrauen in ein echtes Unternehmen beeinflussen?
          </label>
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-3 uppercase">
            <span>Stark sinken (1)</span>
            <span>Stark steigen (5)</span>
          </div>
          <input type="range" min="1" max="5" value={q4} onChange={(e) => setQ4(parseInt(e.target.value))} className="w-full accent-jade cursor-pointer h-2 bg-slate-300 rounded-lg appearance-none" />
          <div className="flex justify-between mt-2 px-1">
            {[1, 2, 3, 4, 5].map(num => <span key={num} className={`font-black text-lg ${q4 === num ? 'text-jade' : 'text-slate-300'}`}>{num}</span>)}
          </div>
        </div>

        <div className="bg-slate-50 p-6 border-2 border-slate-200">
          <label className="block font-black mb-4 text-lg text-charcoal">
            5. Gibt es ein bestimmtes Design-Element oder einen Satz, der Ihnen besonders negativ im Gedächtnis geblieben ist? (Optional)
          </label>
          <textarea 
            value={q5} 
            onChange={(e) => setQ5(e.target.value)}
            className="w-full border-2 border-slate-300 p-3 rounded-lg focus:outline-none focus:border-jade resize-none h-24"
            placeholder="Ihre Antwort..."
          ></textarea>
        </div>

        <button     
          type="submit" 
          disabled={!q3}
          className="w-full bg-charcoal text-white border-4 border-charcoal p-5 font-black uppercase text-xl shadow-diy hover:translate-y-1 hover:shadow-none hover:bg-jade transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Antworten absenden
        </button>
      </form>
    </div>
  );
}