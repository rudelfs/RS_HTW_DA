import BrowserWindow from './BrowserWindow';

export default function RecipeScenario({ group, onComplete }) {
  return (
    <BrowserWindow url="omas-kochecke.de/rezepte/apfelkuchen">
      <div className="font-sans relative bg-orange-50 min-h-[800px]">
        <header className="bg-orange-600 text-white p-6 text-center"><h1 className="text-4xl font-serif">Omas Kochecke</h1></header>
        <main className="p-12 max-w-4xl mx-auto blur-md pointer-events-none">
          <div className="h-96 bg-orange-200 rounded-xl mb-8"></div>
        </main>

        <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 p-10 w-full max-w-3xl shadow-2xl rounded-2xl flex flex-col md:flex-row gap-8">
            
            <div className="flex-1 border-r border-slate-100 pr-8">
              <h2 className="text-2xl font-black mb-4">Omas Kochecke PUR</h2>
              <p className="text-sm text-slate-600 mb-6">Werbefrei lesen und ohne Werbetracking. Monatlich kündbar.</p>
              <div className="text-3xl font-black text-orange-600 mb-6">2,99 € <span className="text-sm text-slate-500 font-normal">/ Monat</span></div>
              <button onClick={() => onComplete(false)} className="w-full py-4 bg-orange-600 text-white rounded-lg font-bold">Abo abschließen</button>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-black mb-4">Kostenlos mit Werbung</h2>
              <p className="text-sm text-slate-600 mb-6">
                Wir finanzieren uns über personalisierte Werbung. Durch Klicken stimmen Sie der Nutzung von Cookies und der Weitergabe an 250 Partner zu.
              </p>
              
              {group === 'A' ? (
                <div className="space-y-3">
                  <button onClick={() => onComplete(true)} className="w-full py-4 bg-slate-900 text-white rounded-lg font-bold">Mit Werbung lesen</button>
                  <button onClick={() => onComplete(false)} className="w-full py-3 border border-slate-300 rounded-lg text-sm">Ablehnen & Verlassen</button>
                </div>
              ) : (
                <div className="space-y-4">
                  <button onClick={() => onComplete(true)} className="w-full py-5 bg-jade text-white rounded-xl font-black text-lg shadow-[0_4px_20px_rgba(59,193,74,0.4)]">
                    KOSTENLOS WEITERLESEN
                  </button>
                  <p className="text-[10px] text-slate-400 text-center">Ein Ablehnen der Cookies ist hier nicht direkt möglich. Bitte nutzen Sie das PUR-Abo.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </BrowserWindow>
  );
}