import { useState } from 'react';
import BrowserWindow from './BrowserWindow';

export default function NewsScenario({ group, onComplete }) {
  const [view, setView] = useState('banner');
  const [toggles, setToggles] = useState({ 
    essential: true, 
    analytics: true, 
    marketing: true, 
    social: true, 
    location: true, 
    personalization: true 
  });
  const [showError, setShowError] = useState(false);

  const ToggleSwitch = ({ label, id }) => (
    <div className="flex justify-between items-center py-4 border-b border-slate-100">
      <span className="text-sm font-medium pr-4">{label}</span>
      <div 
        onClick={() => {
          setToggles(p => ({ ...p, [id]: !p[id] }));
          if (id === 'essential') setShowError(false);
        }}
        className={`w-14 h-7 rounded-full p-1 cursor-pointer transition-colors shrink-0 ${toggles[id] ? 'bg-jade' : 'bg-slate-300'}`}
      >
        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${toggles[id] ? 'translate-x-7' : ''}`}></div>
      </div>
    </div>
  );

  const handleSaveSettings = () => {
    if (!toggles.essential) {
      setShowError(true);
      return;
    }
    const isManipulated = toggles.analytics || toggles.marketing || toggles.social || toggles.location || toggles.personalization;
    onComplete(isManipulated);
  };

  return (
    <BrowserWindow url="berliner-zeitgeist.de/wirtschaft/neue-technologien">
      <div className="font-sans relative bg-white min-h-[800px]">
        <header className="border-b border-slate-200 py-6 px-12"><h1 className="text-4xl font-black italic">Berliner Zeitgeist</h1></header>
        <main className="px-12 py-8 max-w-5xl mx-auto blur-sm pointer-events-none">
          <h2 className="text-5xl font-black mb-6">Wirtschaftsbericht 2026</h2>
          <div className="space-y-4 text-slate-200 bg-slate-200 rounded p-4 h-64">Platzhalter</div>
        </main>

        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
          
          {view === 'banner' && (
            <div className="bg-white p-10 w-full max-w-2xl shadow-2xl rounded-xl">
              <h2 className="text-3xl font-black mb-4">Privatsphäre & Cookies</h2>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                Wir verwenden Cookies, um Inhalte zu personalisieren, Funktionen für soziale Medien anbieten zu können und die Zugriffe auf unsere Website zu analysieren.
              </p>
              
              {group === 'A' ? (
                <div className="flex gap-4">
                  <button onClick={() => onComplete(false)} className="flex-1 py-4 border-2 border-slate-300 rounded-lg font-bold hover:bg-slate-50 transition-colors">Nur Essenzielle</button>
                  <button onClick={() => onComplete(true)} className="flex-1 py-4 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors">Alle Akzeptieren</button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <button onClick={() => onComplete(true)} className="w-full py-5 bg-jade text-white rounded-xl font-black text-xl shadow-lg transform hover:scale-[1.02] transition-all">AKZEPTIEREN & WEITERLESEN</button>
                  <button onClick={() => setView('settings')} className="text-sm text-slate-500 underline hover:text-slate-800 text-center">Partner-Präferenzen manuell verwalten</button>
                </div>
              )}
            </div>
          )}

          {view === 'settings' && (
            <div className="bg-white p-8 w-full max-w-3xl shadow-2xl rounded-xl h-[700px] flex flex-col">
              <h2 className="text-2xl font-black mb-2">Präferenzen verwalten</h2>
              <p className="text-sm text-slate-500 mb-6">Bitte deaktivieren Sie die Kategorien einzeln, falls Sie der Verarbeitung widersprechen möchten.</p>
              
              <div className="flex-1 overflow-auto border-y border-slate-200 py-2 mb-6 pr-4">
                <ToggleSwitch label="Essenzielle Cookies (Notwendig für die Seitenfunktion)" id="essential" />
                <ToggleSwitch label="Analyse & Statistiken (Google Analytics, Hotjar, Matomo)" id="analytics" />
                <ToggleSwitch label="Marketing & Retargeting (Facebook Pixel, TikTok Ads)" id="marketing" />
                <ToggleSwitch label="Social Media Integrationen (Twitter Embeds, Instagram)" id="social" />
                <ToggleSwitch label="Standortdatenbank (Personalisierte regionale News)" id="location" />
                <ToggleSwitch label="Geräteübergreifende Personalisierung" id="personalization" />
              </div>

              {showError && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 text-sm font-bold animate-pulse">
                  Fehler: Essenzielle Cookies müssen zwingend aktiviert sein, um Ihre Auswahl im System zu speichern.
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => onComplete(true)} 
                  className="w-full py-4 bg-jade text-white rounded-lg font-bold shadow-lg text-lg"
                >
                  Doch alle akzeptieren (Empfohlen)
                </button>
                <button 
                  onClick={handleSaveSettings} 
                  className={`w-full py-4 border-2 rounded-lg font-bold transition-colors ${!toggles.essential ? 'border-red-200 text-red-300 cursor-not-allowed bg-red-50/50' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  Auswahl speichern
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </BrowserWindow>
  );
}