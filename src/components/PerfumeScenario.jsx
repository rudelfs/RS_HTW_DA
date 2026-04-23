import { useState } from 'react';
import BrowserWindow from './BrowserWindow';

export default function PerfumeScenario({ group, onComplete }) {
  const [upsell, setUpsell] = useState(group === 'A' || group === 'B');
  const [shipping, setShipping] = useState('standard');

  const basePrice = 85.00;
  const shippingCost = shipping === 'express' ? 9.90 : 0.00;
  const upsellCost = upsell ? 4.99 : 0;
  const total = basePrice + shippingCost + upsellCost;

  return (
    <BrowserWindow url="scent-and-co.com/checkout">
      <div className="font-sans text-slate-800 p-4 md:p-8 flex flex-col lg:flex-row gap-8 lg:gap-16">
        
        <div className="flex-1">
          <h2 className="text-3xl font-serif border-b-2 border-slate-100 pb-4 mb-8 uppercase tracking-widest text-slate-900">
            Kasse
          </h2>
          <div className="space-y-8 max-w-lg">
            <div>
              <h3 className="font-serif text-lg text-slate-500 mb-4">1. Lieferadresse</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Vorname" defaultValue="Max" className="border border-slate-300 p-3 rounded-md text-sm bg-white outline-none w-full" />
                <input type="text" placeholder="Nachname" defaultValue="Mustermann" className="border border-slate-300 p-3 rounded-md text-sm bg-white outline-none w-full" />
                <input type="text" placeholder="Straße & Hausnummer" defaultValue="Musterstraße 12" className="col-span-2 border border-slate-300 p-3 rounded-md text-sm bg-white outline-none w-full" />
              </div>
            </div>
            <div>
              <h3 className="font-serif text-lg text-slate-500 mb-4">2. Zahlungsart</h3>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Kreditkarte (endet auf 4421)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[450px]">
          <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl sticky top-8">
            <h3 className="font-bold mb-6 border-b border-slate-200 pb-3 uppercase text-sm tracking-wider">Ihre Bestellung</h3>
            
            <div className="flex gap-4 mb-6">
              <div className="flex-1 flex flex-col justify-center">
                <span className="font-serif text-lg">Midnight Mirage</span>
                <span className="text-slate-500 text-xs mb-2">Eau de Parfum • 50ml</span>
                <span className="font-bold">85,00 €</span>
              </div>
            </div>

            {group === 'A' && (
              <div className="py-4 border-y border-slate-200 my-4 space-y-3">
                <p className="font-bold text-sm">Zusatzoptionen:</p>
                <button 
                  onClick={() => setUpsell(true)}
                  className={`w-full py-3 border-2 rounded text-sm font-bold ${upsell ? 'border-slate-800 bg-slate-100' : 'border-slate-300 bg-white'}`}
                >
                  Premium Versand-Schutz (+4,99 €)
                </button>
                <button 
                  onClick={() => setUpsell(false)}
                  className={`w-full py-3 border-2 rounded text-sm font-bold ${!upsell ? 'border-slate-800 bg-slate-100' : 'border-slate-300 bg-white'}`}
                >
                  Standard-Versand (+0,00 €)
                </button>
              </div>
            )}

            {group === 'B' && (
              <div className="py-4 border-y border-slate-200 my-4">
                <p className="font-bold text-sm mb-3">Zusatzoptionen:</p>
                <button 
                  onClick={() => setUpsell(true)}
                  className={`w-full py-4 rounded font-bold text-lg text-white transition-all shadow-md ${upsell ? 'bg-jade border-4 border-emerald-700' : 'bg-jade hover:bg-emerald-600'}`}
                >
                  Premium Versand-Schutz (+4,99 €)
                </button>
                <button 
                  onClick={() => setUpsell(false)}
                  className={`w-full mt-3 py-2 text-sm text-slate-500 underline hover:text-slate-700 transition-colors ${!upsell ? 'font-bold text-slate-800' : ''}`}
                >
                  Ohne Schutz fortfahren
                </button>
              </div>
            )}

            {group === 'C' && (
              <div className="py-4 border-y border-slate-200 my-4 space-y-3">
                <p className="font-bold text-sm text-red-600 mb-2">Achtung: Paketverlust möglich</p>
                <button 
                  onClick={() => setUpsell(true)}
                  className={`w-full py-3 border-2 rounded text-sm font-bold ${upsell ? 'border-slate-800 bg-slate-100' : 'border-slate-300 bg-white'}`}
                >
                  Ja, ich möchte meine Bestellung sicher absichern (+4,99 €)
                </button>
                <button 
                  onClick={() => setUpsell(false)}
                  className={`w-full py-3 border-2 rounded text-sm font-bold ${!upsell ? 'border-slate-800 bg-slate-100' : 'border-slate-300 bg-white'}`}
                >
                  Nein, ich riskiere einen unversicherten Totalverlust der Ware
                </button>
              </div>
            )}

            <div className="border-t border-slate-200 pt-4 mb-6 flex justify-between font-bold text-2xl font-serif">
              <span>Gesamtsumme</span>
              <span>{total.toFixed(2).replace('.', ',')} €</span>
            </div>

            <button 
              onClick={() => onComplete(upsell)} 
              className="w-full py-4 rounded-md font-bold uppercase tracking-widest bg-slate-900 hover:bg-slate-800 text-white transition-all"
            >
              Bestellen
            </button>
          </div>
        </div>
      </div>
    </BrowserWindow>
  );
}