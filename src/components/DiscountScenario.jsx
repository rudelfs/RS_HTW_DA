import { useState } from 'react';
import BrowserWindow from './BrowserWindow';

export default function DiscountScenario({ group, onComplete }) {
  const [showSecondModal, setShowSecondModal] = useState(false);

  const handleRejectFirst = () => {
    if (group === 'A') {
      onComplete(false);
    } else {
      setShowSecondModal(true);
    }
  };

  return (
    <BrowserWindow url="urban-styles-berlin.de/shop">
      <div className="font-sans relative bg-slate-50 min-h-[800px] overflow-hidden">
        
        <header className="bg-slate-900 text-white p-6 flex justify-between items-center shadow-md">
          <h1 className="text-3xl font-black uppercase tracking-tighter">Urban Styles</h1>
          <div className="hidden md:flex gap-6 font-bold text-sm uppercase">
            <span>Herren</span><span>Damen</span><span className="text-red-500">Sale %</span>
          </div>
        </header>
        
        <main className="p-8 max-w-5xl mx-auto blur-md pointer-events-none grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="h-96 bg-slate-200 rounded-xl"></div>
          <div className="h-96 bg-slate-200 rounded-xl"></div>
          <div className="h-96 bg-slate-200 rounded-xl"></div>
        </main>

        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          
          {!showSecondModal && (
            <div className="bg-white p-10 w-full max-w-lg shadow-2xl rounded-2xl relative text-center">
              <h2 className="text-4xl font-black mb-2 uppercase tracking-tight">Warte!</h2>
              <p className="text-slate-600 mb-8 text-lg font-medium">
                Melde dich für unseren Newsletter an und sichere dir sofort <strong className="text-red-600 text-xl">10% Rabatt</strong> auf deine Bestellung.
              </p>

              {group === 'A' && (
                <div className="flex flex-col gap-4">
                  <button onClick={() => onComplete(true)} className="w-full py-4 border-2 border-slate-800 text-slate-800 rounded-lg font-bold text-lg hover:bg-slate-50 transition-colors">
                    Für Newsletter anmelden (10% Rabatt)
                  </button>
                  <button onClick={handleRejectFirst} className="w-full py-4 border-2 border-slate-800 text-slate-800 rounded-lg font-bold text-lg hover:bg-slate-50 transition-colors">
                    Nein danke, ohne Rabatt weiter
                  </button>
                </div>
              )}

              {group === 'B' && (
                <div className="flex flex-col items-center">
                  <button 
                    onClick={handleRejectFirst} 
                    className="absolute top-4 right-4 text-slate-300 hover:text-slate-400 font-bold p-2 text-xl"
                  >
                    X
                  </button>
                  <button 
                    onClick={() => onComplete(true)} 
                    className="w-full py-6 bg-red-600 text-white rounded-xl font-black text-2xl shadow-lg transition-colors hover:bg-red-700"
                  >
                    10% RABATT SICHERN
                  </button>
                </div>
              )}

              {group === 'C' && (
                <div className="flex flex-col gap-4">
                  <button onClick={() => onComplete(true)} className="w-full py-4 bg-slate-900 text-white rounded-lg font-bold text-lg">
                    10% Rabatt sichern
                  </button>
                  <button onClick={handleRejectFirst} className="w-full py-4 border-2 border-slate-300 text-slate-600 rounded-lg font-bold hover:bg-slate-50 transition-colors leading-snug px-4">
                    Nein, ich möchte lieber den vollen Preis bezahlen
                  </button>
                </div>
              )}
            </div>
          )}

          {showSecondModal && (
            <div className="bg-white p-8 w-full max-w-md shadow-2xl rounded-2xl relative text-center border-t-8 border-red-600 animate-window-pop">
              <h2 className="text-2xl font-black mb-4 uppercase">Bist du sicher?</h2>
              <p className="text-slate-700 mb-8 font-medium">
                Dieser Gutschein für Newsletter-Abonnenten gilt <span className="underline decoration-red-500 decoration-2">nur heute</span> und verfällt unwiderruflich!
              </p>

              {group === 'B' && (
                <div className="flex flex-col items-center">
                  <button 
                    onClick={() => onComplete(false)} 
                    className="absolute top-2 right-3 text-lg text-slate-300 p-2 hover:text-slate-500 font-bold"
                  >
                    X
                  </button>
                  <button onClick={() => onComplete(true)} className="w-full py-5 bg-red-600 text-white rounded-xl font-black text-xl shadow-lg hover:bg-red-700 transition-colors">
                    DOCH SPAREN
                  </button>
                </div>
              )}

              {group === 'C' && (
                <div className="flex flex-col gap-4">
                  <button onClick={() => onComplete(true)} className="w-full py-4 bg-slate-900 text-white rounded-lg font-bold text-lg">
                    Doch sparen
                  </button>
                  <button onClick={() => onComplete(false)} className="w-full py-3 text-sm text-slate-500 underline hover:text-slate-800 transition-colors">
                    Ja, ich verzichte auf meinen Vorteil
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </BrowserWindow>
  );
}