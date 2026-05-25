import { useState, useEffect } from 'react';
import BrowserWindow from './BrowserWindow';

export default function CookieScenario({ group, t, siteName, siteUrl, onTrackClick, onComplete }) {
  const [bannerShowTime, setBannerShowTime] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [cookieOptions, setCookieOptions] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    social: false
  });

  const displayName = siteName || t.cs_site_title || "wetter-schnell.de";
  const displayUrl = siteUrl || "wetter-schnell.de/berlin";

  const trendDays = [
    { day: "Di", icon: "🌧️", temp: "15° / 9°" },
    { day: "Mi", icon: "⛅", temp: "17° / 11°" },
    { day: "Do", icon: "☀️", temp: "20° / 12°" },
    { day: "Fr", icon: "⛅", temp: "19° / 10°" },
    { day: "Sa", icon: "🌧️", temp: "14° / 8°" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(true);
      setBannerShowTime(performance.now());
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleChoice = (choice) => {
    if (choice === 'settings') {
      setShowSettings(true);
      return;
    }
    const timeToClickMs = performance.now() - bannerShowTime;
    onComplete({ 
      choice, 
      bannerInteractionTimeMs: timeToClickMs,
      options: choice === 'accept' 
        ? { essential: true, analytics: true, marketing: true, social: true } 
        : { essential: true, analytics: false, marketing: false, social: false }
    });
  };

  const handleSaveSettings = () => {
    const timeToClickMs = performance.now() - bannerShowTime;
    onComplete({ 
      choice: 'saved_settings', 
      bannerInteractionTimeMs: timeToClickMs, 
      options: cookieOptions 
    });
  };

  const toggleOption = (key) => {
    if (key === 'essential') return;
    setCookieOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <BrowserWindow url={displayUrl}>
      <div className="font-sans relative bg-slate-50 min-h-[800px] overflow-hidden text-left" onClick={(e) => {
        // Fallback catch für ungerichtete Klicks im Hintergrund
        if (showBanner && e.target === e.currentTarget) {
           onTrackClick('CookieBg_EmptySpace');
        }
      }}>
        
        <header className="bg-[#0f172a] text-white p-4 shadow-md flex justify-between items-center relative z-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌤️</span>
            <div>
              <h1 className="text-xl md:text-2xl font-black leading-none max-w-[200px] md:max-w-none truncate">{displayName}</h1>
              <span className="text-[10px] text-blue-300 uppercase tracking-widest">Live Report</span>
            </div>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-bold text-slate-300">
            <span className="text-white border-b-2 border-blue-400 pb-1">Heute</span>
            <span className="hover:text-white cursor-pointer" onClick={() => onTrackClick('BannerBg_Tab_14Tage')}>14-Tage</span>
            <span className="hover:text-white cursor-pointer" onClick={() => onTrackClick('BannerBg_Tab_Regenradar')}>Regenradar</span>
            <span className="hover:text-white cursor-pointer" onClick={() => onTrackClick('BannerBg_Tab_Pollenflug')}>Pollenflug</span>
          </div>
        </header>

        <main className={`p-4 md:p-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-0 transition-all duration-300 ${showBanner ? 'blur-md pointer-events-none opacity-80' : ''}`}>
          
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-6 pb-12">
                <h2 className="text-2xl font-bold mb-1">Berlin, Deutschland</h2>
                <p className="text-blue-200 text-sm">Vorhersage für Morgen</p>
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <span className="text-6xl drop-shadow-lg">🌧️</span>
                    <div>
                      <div className="text-5xl font-medium tracking-tighter">{t.wr_weather_data || "15°C"}</div>
                      <div className="text-lg font-medium mt-1 text-blue-100">{t.wr_weather_desc || "Starker Regen"}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 grid grid-cols-3 gap-4 text-center divide-x divide-slate-100">
                <div><div className="text-slate-400 text-xs uppercase font-bold">Niederschlag</div><div className="font-bold text-lg text-slate-800">95%</div></div>
                <div><div className="text-slate-400 text-xs uppercase font-bold">Wind</div><div className="font-bold text-lg text-slate-800">24 km/h</div></div>
                <div><div className="text-slate-400 text-xs uppercase font-bold">Luftfeuchte</div><div className="font-bold text-lg text-slate-800">82%</div></div>
              </div>
            </div>
          </div>

          <div className="space-y-6 hidden md:block">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-700 text-sm mb-4 uppercase tracking-wider">{t.wr_trend_title || "7-Tage-Trend"}</h3>
              <div className="space-y-3">
                {trendDays.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                    <span className="font-bold text-slate-500 w-8">{item.day}</span>
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-mono text-slate-700 text-right font-bold">{item.temp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </main>

        {showBanner && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
            <div className="bg-white p-6 md:p-8 w-full max-w-md shadow-2xl rounded-xl relative animate-window-pop">
              
              {!showSettings ? (
                <>
                  <h2 className="text-xl md:text-2xl font-bold mb-3">{t.cs_modal_title}</h2>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed">{t.cs_modal_text}</p>

                  {group === 'A' ? (
                    <div className="flex flex-col gap-3">
                      <button onClick={() => handleChoice('accept')} className="w-full py-3 border-2 border-purple-600 bg-purple-600 text-white rounded font-bold text-sm hover:bg-purple-700 transition-colors">{t.cs_btn_accept}</button>
                      <button onClick={() => handleChoice('settings')} className="w-full py-3 border-2 border-slate-300 text-slate-600 rounded font-bold text-sm hover:bg-slate-50 transition-colors">{t.cs_btn_settings}</button>
                      <button onClick={() => handleChoice('deny')} className="w-full py-3 border-2 border-slate-300 text-slate-600 rounded font-bold text-sm hover:bg-slate-50 transition-colors">{t.cs_btn_deny}</button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <button onClick={() => handleChoice('accept')} className="w-full py-3 border-2 border-slate-300 bg-slate-100 text-slate-700 rounded font-bold text-sm hover:bg-slate-200 transition-colors">{t.cs_btn_accept}</button>
                      <button onClick={() => handleChoice('settings')} className="w-full py-3 border-2 border-slate-300 bg-slate-100 text-slate-700 rounded font-bold text-sm hover:bg-slate-200 transition-colors">{t.cs_btn_settings}</button>
                      <button onClick={() => handleChoice('deny')} className="w-full py-3 border-2 border-slate-300 bg-slate-100 text-slate-700 rounded font-bold text-sm hover:bg-slate-200 transition-colors">{t.cs_btn_deny}</button>
                    </div>
                  )}
                </>
              ) : (
                <div className="animate-window-pop">
                  <h2 className="text-xl md:text-2xl font-bold mb-4">{t.cs_settings_title || "Optionen"}</h2>
                  <div className="space-y-3 mb-6">
                    <label className="flex items-center justify-between p-3 border border-slate-200 bg-slate-50 rounded opacity-60 cursor-not-allowed">
                      <span className="text-sm font-bold text-slate-700">{t.cs_opt_essential || "Essenzielle Cookies"}</span>
                      <input type="checkbox" checked={true} disabled className="w-5 h-5 accent-blue-600" />
                    </label>
                    <label className="flex items-center justify-between p-3 border border-slate-200 rounded cursor-pointer hover:bg-slate-50">
                      <span className="text-sm font-medium text-slate-700">{t.cs_opt_analytics || "Analyse & Statistiken"}</span>
                      <input type="checkbox" checked={cookieOptions.analytics} onChange={() => toggleOption('analytics')} className="w-5 h-5 accent-blue-600 cursor-pointer" />
                    </label>
                    <label className="flex items-center justify-between p-3 border border-slate-200 rounded cursor-pointer hover:bg-slate-50">
                      <span className="text-sm font-medium text-slate-700">{t.cs_opt_marketing || "Marketing"}</span>
                      <input type="checkbox" checked={cookieOptions.marketing} onChange={() => toggleOption('marketing')} className="w-5 h-5 accent-blue-600 cursor-pointer" />
                    </label>
                    <label className="flex items-center justify-between p-3 border border-slate-200 rounded cursor-pointer hover:bg-slate-50">
                      <span className="text-sm font-medium text-slate-700">{t.cs_opt_social || "Social Media"}</span>
                      <input type="checkbox" checked={cookieOptions.social} onChange={() => toggleOption('social')} className="w-5 h-5 accent-blue-600 cursor-pointer" />
                    </label>
                  </div>
                  <button onClick={handleSaveSettings} className="w-full py-3 bg-slate-800 text-white rounded font-bold text-sm hover:bg-slate-900 transition-colors">
                    {t.cs_btn_save || "Auswahl speichern"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </BrowserWindow>
  );
}