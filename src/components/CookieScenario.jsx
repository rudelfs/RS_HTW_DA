import { useState, useEffect } from 'react';
import BrowserWindow from './BrowserWindow';

export default function CookieScenario({ group, t, onComplete }) {
  const [startTime, setStartTime] = useState(null);
  
  // Neue States für das Einstellungs-Menü
  const [showSettings, setShowSettings] = useState(false);
  const [cookieOptions, setCookieOptions] = useState({
    essential: true, // Verpflichtend!
    analytics: false,
    marketing: false,
    social: false
  });

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  // Behandelt Klicks auf dem ersten Screen
  const handleChoice = (choice) => {
    if (choice === 'settings') {
      setShowSettings(true); // Menü öffnen anstatt zu beenden
      return;
    }
    
    // Wenn "Alle akzeptieren" oder "Ablehnen" geklickt wird
    const timeOnTask = Date.now() - startTime;
    onComplete({ 
      choice, 
      timeOnTaskMs: timeOnTask,
      // Speichere ab, was dies effektiv für die Cookies bedeutet
      options: choice === 'accept' 
        ? { essential: true, analytics: true, marketing: true, social: true } 
        : { essential: true, analytics: false, marketing: false, social: false }
    });
  };

  // Behandelt den "Speichern"-Klick im Einstellungs-Menü
  const handleSaveSettings = () => {
    const timeOnTask = Date.now() - startTime;
    onComplete({
      choice: 'saved_settings',
      timeOnTaskMs: timeOnTask,
      options: cookieOptions
    });
  };

  const toggleOption = (key) => {
    if (key === 'essential') return; // Sicherstellen, dass "essential" nie geändert wird
    setCookieOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <BrowserWindow url="wettermorgen.de/lokal">
      <div className="font-sans relative bg-slate-50 min-h-[800px] overflow-hidden">
        
        <header className="bg-blue-600 text-white p-4 md:p-6 shadow-md"><h1 className="text-xl md:text-3xl font-black">{t.cs_site_title}</h1></header>
        <main className="p-4 md:p-8 max-w-4xl mx-auto blur-md pointer-events-none">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-6 h-64 border border-slate-200">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">{t.cs_site_h2}</h2>
          </div>
        </main>

        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 md:p-8 w-full max-w-sm shadow-2xl rounded-xl relative">
            
            {/* ENTWEDER: Normaler Banner */}
            {!showSettings ? (
              <>
                <h2 className="text-xl md:text-2xl font-bold mb-3">{t.cs_modal_title}</h2>
                <p className="text-slate-600 mb-6 text-xs md:text-sm leading-relaxed">
                  {t.cs_modal_text}
                </p>

                {/* GRUPPE A: Die Grauzone */}
                {group === 'A' && (
                  <div className="flex flex-col gap-2 md:gap-3">
                    <button onClick={() => handleChoice('accept')} className="w-full py-3 border-2 border-purple-600 bg-purple-600 text-white rounded font-bold text-sm hover:bg-purple-700 hover:border-purple-700 transition-colors">
                      {t.cs_btn_accept}
                    </button>
                    <button onClick={() => handleChoice('settings')} className="w-full py-3 border-2 border-slate-300 text-slate-600 rounded font-bold text-sm bg-transparent hover:bg-slate-50 transition-colors">
                      {t.cs_btn_settings}
                    </button>
                    <button onClick={() => handleChoice('deny')} className="w-full py-3 border-2 border-slate-300 text-slate-600 rounded font-bold text-sm bg-transparent hover:bg-slate-50 transition-colors">
                      {t.cs_btn_deny}
                    </button>
                  </div>
                )}

                {/* GRUPPE B: Privacy by Design */}
                {group === 'B' && (
                  <div className="flex flex-col gap-2 md:gap-3">
                    <button onClick={() => handleChoice('accept')} className="w-full py-3 border-2 border-slate-300 bg-slate-200 text-slate-700 rounded font-bold text-sm hover:bg-slate-300 transition-colors">
                      {t.cs_btn_accept}
                    </button>
                    <button onClick={() => handleChoice('settings')} className="w-full py-3 border-2 border-slate-300 bg-slate-200 text-slate-700 rounded font-bold text-sm hover:bg-slate-300 transition-colors">
                      {t.cs_btn_settings}
                    </button>
                    <button onClick={() => handleChoice('deny')} className="w-full py-3 border-2 border-slate-300 bg-slate-200 text-slate-700 rounded font-bold text-sm hover:bg-slate-300 transition-colors">
                      {t.cs_btn_deny}
                    </button>
                  </div>
                )}

                {/* GRUPPE C: Illegales Dark Pattern */}
                {group === 'C' && (
                  <div className="flex flex-col items-center gap-3 md:gap-4">
                    <button onClick={() => handleChoice('accept')} className="w-full py-4 md:py-5 border-2 border-blue-600 bg-blue-600 text-white rounded-xl font-black text-lg md:text-xl shadow-lg hover:bg-blue-700 transition-colors">
                      {t.cs_btn_accept}
                    </button>
                    <button onClick={() => handleChoice('deny_hidden')} className="text-[10px] md:text-[11px] text-slate-400 underline hover:text-slate-600 mt-2 text-center px-2">
                      {t.cs_link_hidden}
                    </button>
                  </div>
                )}
              </>
            ) : (
              
              /* ODER: Detail-Menü für die Einstellungen */
              <div className="animate-window-pop">
                <h2 className="text-xl md:text-2xl font-bold mb-4">{t.cs_settings_title || "Präferenzen verwalten"}</h2>
                <div className="space-y-3 mb-6">
                  
                  {/* Verpflichtende Option */}
                  <label className="flex items-center justify-between p-3 border border-slate-200 bg-slate-50 rounded cursor-not-allowed opacity-70">
                    <span className="text-sm font-bold text-slate-700">{t.cs_opt_essential || "Essenzielle Cookies"}</span>
                    <input type="checkbox" checked={true} disabled className="w-5 h-5 accent-blue-600" />
                  </label>
                  
                  {/* Freiwillige Optionen */}
                  <label className="flex items-center justify-between p-3 border border-slate-200 rounded cursor-pointer hover:bg-slate-50">
                    <span className="text-sm font-medium text-slate-700">{t.cs_opt_analytics || "Analyse & Statistiken"}</span>
                    <input type="checkbox" checked={cookieOptions.analytics} onChange={() => toggleOption('analytics')} className="w-5 h-5 accent-blue-600 cursor-pointer" />
                  </label>
                  
                  <label className="flex items-center justify-between p-3 border border-slate-200 rounded cursor-pointer hover:bg-slate-50">
                    <span className="text-sm font-medium text-slate-700">{t.cs_opt_marketing || "Marketing & Personalisierung"}</span>
                    <input type="checkbox" checked={cookieOptions.marketing} onChange={() => toggleOption('marketing')} className="w-5 h-5 accent-blue-600 cursor-pointer" />
                  </label>
                  
                  <label className="flex items-center justify-between p-3 border border-slate-200 rounded cursor-pointer hover:bg-slate-50">
                    <span className="text-sm font-medium text-slate-700">{t.cs_opt_social || "Social Media Integration"}</span>
                    <input type="checkbox" checked={cookieOptions.social} onChange={() => toggleOption('social')} className="w-5 h-5 accent-blue-600 cursor-pointer" />
                  </label>

                </div>
                
                <button 
                  onClick={handleSaveSettings}
                  className="w-full py-3 bg-slate-800 text-white rounded font-bold text-sm hover:bg-slate-900 transition-colors"
                >
                  {t.cs_btn_save || "Auswahl speichern"}
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </BrowserWindow>
  );
}