import { useState } from 'react';
import BrowserWindow from './BrowserWindow';

export default function FlightScenario({ group, onComplete }) {
  const [insurance, setInsurance] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleContinue = () => {
    if (insurance) {
      onComplete(true);
    } else if (group === 'B') {
      setShowModal(true);
    } else {
      onComplete(false);
    }
  };

  return (
    <BrowserWindow url="flycheap-airlines.com/booking/extras">
      <div className="font-sans bg-slate-100 min-h-full pb-12">
        
        {/* Aggressives Ryanair-Design */}
        <header className="bg-ryblue p-4 text-white flex justify-between items-center shadow-md border-b-4 border-ryyellow">
          <div className="font-black text-3xl tracking-tighter italic text-ryyellow">
            FLY<span className="text-white">CHEAP</span>
          </div>
          <div className="text-sm font-bold bg-white text-ryblue px-4 py-1 rounded-full uppercase">
            3. EXTRAS WÄHLEN
          </div>
        </header>

        <div className="bg-white border-b border-slate-300 py-4 px-6 flex justify-between items-center mb-8 shadow-sm">
          <div className="flex items-center gap-6">
            <img src="https://via.placeholder.com/60x60?text=BER" alt="BER" className="w-12 h-12 rounded bg-slate-200 object-cover border border-slate-300" />
            <div className="flex flex-col">
              <span className="text-2xl font-black text-ryblue">BER ➔ LHR</span>
              <span className="text-sm text-slate-500 font-bold">Flug FR4921 • 1 Passagier</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 font-bold uppercase">Warenkorb</p>
            <p className="font-black text-3xl text-ryblue">39,99 €</p>
          </div>
        </div>

        <main className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-8 border-ryyellow border-x border-b border-slate-200">
              <h2 className="text-3xl font-black text-ryblue mb-2 uppercase">Reiseschutz dringend empfohlen!</h2>
              <p className="text-slate-700 mb-6 font-medium">92% unserer Kunden buchen den Rundum-Schutz, um teure Stornogebühren zu vermeiden.</p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div onClick={() => setInsurance('premium')} className={`border-4 p-6 rounded cursor-pointer relative overflow-hidden transition-all ${insurance === 'premium' ? 'border-ryblue bg-blue-50' : 'border-slate-200 hover:border-ryyellow'}`}>
                  <div className="absolute top-0 right-0 bg-ryyellow text-ryblue font-black text-[10px] uppercase px-3 py-1">Bestseller</div>
                  <h3 className="font-black text-2xl mb-1 text-ryblue">Rundum-Schutz</h3>
                  <span className="text-ryblue font-black text-3xl block mb-4">24,99 €</span>
                  <ul className="text-sm space-y-3 text-slate-700 font-medium">
                    <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> Storno ohne Gründe</li>
                    <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> 24/7 Notfall-Arzt</li>
                    <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> Gepäckverlust</li>
                  </ul>
                </div>

                <div onClick={() => setInsurance('basic')} className={`border-4 p-6 rounded cursor-pointer transition-all ${insurance === 'basic' ? 'border-ryblue bg-blue-50' : 'border-slate-200 hover:border-ryyellow'}`}>
                  <h3 className="font-black text-2xl mb-1 text-ryblue">Basis-Schutz</h3>
                  <span className="text-slate-600 font-black text-3xl block mb-4">14,99 €</span>
                  <ul className="text-sm space-y-3 text-slate-700 font-medium">
                    <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> Storno bei Krankheit</li>
                    <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> Notfallhilfe</li>
                    <li className="flex items-center gap-2 opacity-50"><span className="text-red-500 font-bold">✗</span> Kein Gepäckschutz</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 border-t border-slate-200 pt-8">
                <button 
                  onClick={handleContinue}
                  className={`w-full py-5 rounded font-black text-2xl uppercase transition-all shadow-md ${
                    insurance 
                    ? 'bg-ryyellow text-ryblue hover:bg-yellow-400' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                  disabled={!insurance && group === 'B'}
                >
                  {insurance ? 'Weiter zur Zahlung' : 'Bitte Schutz wählen'}
                </button>

                {group === 'A' ? (
                  <button onClick={() => onComplete(false)} className="text-ryblue font-bold hover:underline">
                    Ohne Schutz fortfahren
                  </button>
                ) : (
                  <button 
                    onClick={handleContinue} 
                    className="text-[11px] text-slate-400 underline hover:text-slate-600 mt-2"
                  >
                    Ich möchte das volle Risiko tragen und keinen Schutz buchen
                  </button>
                )}
              </div>
            </div>
          </div>

          <aside className="hidden lg:block space-y-6">
            <img src="https://via.placeholder.com/300x250?text=Mietwagen+Ad" alt="Ad" className="w-full rounded shadow-sm border border-slate-200" />
            <img src="https://via.placeholder.com/300x250?text=Hotel+Ad" alt="Ad" className="w-full rounded shadow-sm border border-slate-200" />
          </aside>

        </main>

        {showModal && (
          <div className="absolute inset-0 bg-ryblue/90 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-10 max-w-lg w-full rounded-lg text-center shadow-2xl border-t-8 border-red-600">
              <div className="text-6xl mb-4 animate-bounce">⚠️</div>
              <h3 className="text-3xl font-black text-red-600 mb-4 uppercase tracking-tight">Halt, sind Sie sicher?</h3>
              <p className="text-slate-700 mb-8 font-medium text-lg">
                Ein Arztbesuch im Ausland kostet schnell <strong>über 5.000 €</strong>. Sie haben aktuell <span className="underline decoration-red-500 decoration-4">keinen Schutz</span> ausgewählt und müssen alle Kosten selbst tragen.
              </p>
              <div className="flex flex-col gap-4">
                <button onClick={() => { setInsurance('premium'); setShowModal(false); }} className="w-full py-5 bg-ryyellow text-ryblue rounded font-black text-xl uppercase shadow-md hover:bg-yellow-400">
                  Schutz hinzufügen (Empfohlen)
                </button>
                <button onClick={() => onComplete(false)} className="w-full py-3 text-slate-400 text-sm font-bold underline hover:text-slate-600">
                  Ja, ich übernehme das volle Risiko
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </BrowserWindow>
  );
}