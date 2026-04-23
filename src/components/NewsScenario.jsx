import BrowserWindow from './BrowserWindow';

export default function NewsScenario({ group, onComplete }) {
  return (
    <BrowserWindow url="berliner-zeitgeist.de/wirtschaft">
      <div className="font-sans relative bg-white min-h-[800px]">
        <header className="border-b border-slate-200 py-6 px-12"><h1 className="text-4xl font-black italic">Berliner Zeitgeist</h1></header>
        <main className="px-12 py-8 max-w-5xl mx-auto blur-sm pointer-events-none">
          <h2 className="text-5xl font-black mb-6">Wirtschaftsbericht</h2>
        </main>

        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white p-10 w-full max-w-2xl shadow-2xl rounded-xl">
            <h2 className="text-3xl font-black mb-4">Privatsphäre & Cookies</h2>
            
            {group === 'A' && (
              <>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                  Wir verwenden Cookies, um Inhalte zu personalisieren und die Zugriffe zu analysieren.
                </p>
                <div className="flex gap-4">
                  <button onClick={() => onComplete(false)} className="flex-1 py-4 border-2 border-slate-800 text-slate-800 rounded-lg font-bold hover:bg-slate-50 transition-colors">Nur Essenzielle</button>
                  <button onClick={() => onComplete(true)} className="flex-1 py-4 border-2 border-slate-800 text-slate-800 rounded-lg font-bold hover:bg-slate-50 transition-colors">Alle Akzeptieren</button>
                </div>
              </>
            )}

            {group === 'B' && (
              <>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                  Wir verwenden Cookies, um Inhalte zu personalisieren und die Zugriffe zu analysieren.
                </p>
                <div className="flex gap-4">
                  <button onClick={() => onComplete(false)} className="flex-1 py-4 bg-slate-200 text-slate-500 rounded-lg font-bold hover:bg-slate-300 transition-colors">Nur Essenzielle</button>
                  <button onClick={() => onComplete(true)} className="flex-1 py-4 bg-jade text-white rounded-lg font-bold hover:bg-emerald-600 transition-colors shadow-md">Alle Akzeptieren</button>
                </div>
              </>
            )}

            {group === 'C' && (
              <>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                  Freier Journalismus kostet Geld. Bitte helfen Sie uns, durch personalisierte Werbung unsere Redaktion zu finanzieren.
                </p>
                <div className="flex flex-col gap-4">
                  <button onClick={() => onComplete(true)} className="w-full py-4 border-2 border-slate-800 text-slate-800 rounded-lg font-bold hover:bg-slate-50 transition-colors">
                    Alle Akzeptieren (Ich unterstütze die Redaktion)
                  </button>
                  <button onClick={() => onComplete(false)} className="w-full py-4 border-2 border-slate-800 text-slate-800 rounded-lg font-bold hover:bg-slate-50 transition-colors">
                    Nur Essenzielle (Ich möchte die Autoren nicht unterstützen)
                  </button>
                </div>
              </>
            )}
            
          </div>
        </div>
      </div>
    </BrowserWindow>
  );
}