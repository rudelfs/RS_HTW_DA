import { useState } from 'react';
import BrowserWindow from './BrowserWindow';

export default function FlightScenario({ group, onComplete }) {
  const [insurance, setInsurance] = useState(null);

  const handleContinue = () => {
    if (insurance === 'premium') onComplete(true);
    else onComplete(false);
  };

  return (
    <BrowserWindow url="flycheap-airlines.com/extras">
      <div className="font-sans bg-slate-100 min-h-full pb-12">
        <header className="bg-ryblue p-4 text-white flex justify-between items-center border-b-4 border-ryyellow">
          <div className="font-black text-3xl italic text-ryyellow">FLY<span className="text-white">CHEAP</span></div>
        </header>

        <main className="max-w-4xl mx-auto px-4 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border-t-8 border-ryyellow">
            <h2 className="text-3xl font-black text-ryblue mb-6 uppercase">Reiseschutz wählen</h2>
            
            {group === 'A' && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div onClick={() => setInsurance('premium')} className={`border-4 p-6 rounded cursor-pointer ${insurance === 'premium' ? 'border-ryblue bg-blue-50' : 'border-slate-200'}`}>
                    <h3 className="font-black text-xl">Rundum-Schutz (24,99 €)</h3>
                  </div>
                  <div onClick={() => setInsurance('none')} className={`border-4 p-6 rounded cursor-pointer ${insurance === 'none' ? 'border-ryblue bg-blue-50' : 'border-slate-200'}`}>
                    <h3 className="font-black text-xl">Ohne Schutz (0,00 €)</h3>
                  </div>
                </div>
                <button onClick={handleContinue} className="w-full py-4 bg-slate-800 text-white rounded font-bold uppercase" disabled={!insurance}>
                  Weiter zur Zahlung
                </button>
              </div>
            )}

            {group === 'B' && (
              <div className="space-y-6">
                <div onClick={() => setInsurance('premium')} className={`border-4 p-8 rounded-xl shadow-lg cursor-pointer transition-all ${insurance === 'premium' ? 'border-jade bg-emerald-50 scale-105' : 'border-ryyellow bg-yellow-50 hover:border-yellow-500'}`}>
                  <h3 className="font-black text-3xl text-ryblue mb-2">Rundum-Schutz (24,99 €)</h3>
                  <p className="font-bold text-emerald-700">Höchste Sicherheit für Ihre Reise!</p>
                </div>
                <div onClick={() => setInsurance('none')} className={`p-4 border-2 cursor-pointer text-center rounded-xl transition-all ${insurance === 'none' ? 'border-slate-500 bg-slate-200' : 'border-transparent hover:border-slate-300'}`}>
                  <p className="text-sm text-slate-500 font-bold uppercase">Ohne Schutz fortfahren</p>
                </div>
                <button onClick={handleContinue} className="w-full py-6 bg-ryyellow text-ryblue text-2xl rounded-xl font-black uppercase shadow-lg hover:bg-yellow-400 transition-colors" disabled={!insurance}>
                  Weiter zur Zahlung
                </button>
              </div>
            )}

            {group === 'C' && (
              <div className="space-y-6">
                <p className="text-red-600 font-bold mb-4">Hinweis: 92% unserer Kunden sichern ihre Reise ab.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div onClick={() => setInsurance('premium')} className={`border-4 p-6 rounded cursor-pointer ${insurance === 'premium' ? 'border-ryblue bg-blue-50' : 'border-slate-200'}`}>
                    <h3 className="font-black text-xl mb-2">Rundum-Schutz (24,99 €)</h3>
                    <p className="text-sm font-medium">Ja, ich möchte sicher und sorgenfrei in den Urlaub fliegen.</p>
                  </div>
                  <div onClick={() => setInsurance('none')} className={`border-4 p-6 rounded cursor-pointer ${insurance === 'none' ? 'border-ryblue bg-blue-50' : 'border-slate-200'}`}>
                    <h3 className="font-black text-xl mb-2">Ohne Schutz (0,00 €)</h3>
                    <p className="text-sm font-medium text-slate-500">Nein, ich übernehme im Notfall alle Storno- und Arztkosten von über 5.000€ selbst.</p>
                  </div>
                </div>
                <button onClick={handleContinue} className="w-full py-4 bg-slate-800 text-white rounded font-bold uppercase" disabled={!insurance}>
                  Weiter zur Zahlung
                </button>
              </div>
            )}

          </div>
        </main>
      </div>
    </BrowserWindow>
  );
}