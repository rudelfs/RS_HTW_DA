import { useState } from 'react';
import BrowserWindow from './BrowserWindow';

export default function PerfumeScenario({ group, onComplete }) {
  const [upsell, setUpsell] = useState(group === 'B');
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
                <input type="text" placeholder="Vorname" defaultValue="Max" className="border border-slate-300 p-3 rounded-md text-sm bg-white focus:ring-1 focus:ring-slate-400 outline-none w-full" />
                <input type="text" placeholder="Nachname" defaultValue="Mustermann" className="border border-slate-300 p-3 rounded-md text-sm bg-white focus:ring-1 focus:ring-slate-400 outline-none w-full" />
                <input type="text" placeholder="Straße & Hausnummer" defaultValue="Musterstraße 12" className="col-span-2 border border-slate-300 p-3 rounded-md text-sm bg-white outline-none w-full" />
                <input type="text" placeholder="PLZ" defaultValue="10115" className="border border-slate-300 p-3 rounded-md text-sm bg-white outline-none w-full" />
                <input type="text" placeholder="Stadt" defaultValue="Berlin" className="border border-slate-300 p-3 rounded-md text-sm bg-white outline-none w-full" />
              </div>
            </div>

            <div>
              <h3 className="font-serif text-lg text-slate-500 mb-4">2. Versandart</h3>
              <div className="space-y-3">
                <label className={`flex justify-between items-center p-4 border rounded-md cursor-pointer transition-colors ${shipping === 'standard' ? 'border-slate-800 bg-slate-50' : 'border-slate-200 hover:border-slate-400'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" checked={shipping === 'standard'} onChange={() => setShipping('standard')} className="accent-slate-800 w-4 h-4" />
                    <span className="font-medium">Standard Versand (3-5 Werktage)</span>
                  </div>
                  <span>Kostenlos</span>
                </label>
                <label className={`flex justify-between items-center p-4 border rounded-md cursor-pointer transition-colors ${shipping === 'express' ? 'border-slate-800 bg-slate-50' : 'border-slate-200 hover:border-slate-400'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" checked={shipping === 'express'} onChange={() => setShipping('express')} className="accent-slate-800 w-4 h-4" />
                    <span className="font-medium">Express Lieferung (24h)</span>
                  </div>
                  <span>9,90 €</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-lg text-slate-500 mb-4">3. Zahlungsart</h3>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-5 bg-slate-300 rounded-sm"></div>
                  <span className="text-sm font-medium text-slate-700">Kreditkarte (endet auf 4421)</span>
                </div>
                <button className="text-xs text-slate-400 underline">Ändern</button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[450px]">
          <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl sticky top-8">
            <h3 className="font-bold mb-6 border-b border-slate-200 pb-3 uppercase text-sm tracking-wider">Ihre Bestellung</h3>
            
            <div className="flex gap-4 mb-6">
              <img src="https://via.placeholder.com/100x120?text=Midnight+Mirage" alt="Midnight Parfum" className="w-20 h-24 object-cover rounded border border-slate-200 shadow-sm" />
              <div className="flex-1 flex flex-col justify-center">
                <span className="font-serif text-lg">Midnight Mirage</span>
                <span className="text-slate-500 text-xs mb-2">Eau de Parfum • 50ml</span>
                <span className="font-bold">85,00 €</span>
              </div>
            </div>

            <div className="space-y-2 mb-6 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Zwischensumme</span>
                <span>85,00 €</span>
              </div>
              <div className="flex justify-between">
                <span>Versand ({shipping === 'express' ? 'Express' : 'Standard'})</span>
                <span>{shippingCost > 0 ? `${shippingCost.toFixed(2).replace('.', ',')} €` : 'Kostenlos'}</span>
              </div>
            </div>

            {group === 'B' && upsell && (
              <div className="flex justify-between items-center text-xs mb-4 text-emerald-800 font-bold bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                <div className="flex flex-col gap-1">
                  <span className="text-sm">✓ Premium Versand-Schutz</span>
                  <span className="font-normal text-[10px] text-emerald-600">Absicherung gegen Verlust inkl. Luxus-Duftprobe</span>
                </div>
                <span className="text-sm whitespace-nowrap">+ 4,99 €</span>
              </div>
            )}

            {group === 'A' && (
              <label className="flex justify-between items-center text-xs mb-4 p-4 rounded-lg border border-slate-200 bg-white cursor-pointer hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={upsell} onChange={(e) => setUpsell(e.target.checked)} className="accent-slate-800 w-4 h-4" />
                  <span className="font-medium text-slate-700">Premium Versand-Schutz hinzufügen</span>
                </div>
                <span>4,99 €</span>
              </label>
            )}

            <div className="border-t border-slate-200 pt-4 mb-6 flex justify-between font-bold text-2xl font-serif">
              <span>Gesamtsumme</span>
              <span>{total.toFixed(2).replace('.', ',')} €</span>
            </div>

            {group === 'B' && upsell && (
              <button 
                onClick={() => setUpsell(false)}
                className="w-full text-[10px] text-slate-400 mb-4 underline hover:text-slate-600 text-center"
              >
                Versand-Schutz entfernen (nicht empfohlen, auf eigenes Risiko)
              </button>
            )}

            <button 
              onClick={() => onComplete(upsell)} 
              className={`w-full py-4 rounded-md font-bold uppercase tracking-widest transition-all ${
                group === 'B' ? 'bg-jade hover:bg-jade/90 text-white shadow-lg' : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              Kostenpflichtig bestellen
            </button>
          </div>
        </div>
      </div>
    </BrowserWindow>
  );
}