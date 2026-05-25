import { useState, useEffect } from 'react';
import BrowserWindow from './BrowserWindow';

export default function WeatherResult({ t, siteName, onTrackClick, onComplete }) {
  const [showCheck, setShowCheck] = useState(false);
  const [answer, setAnswer] = useState('');
  const [weatherStartTime, setWeatherStartTime] = useState(null);
  const [weatherTaskTime, setWeatherTaskTime] = useState(0);

  const displayName = siteName || t.cs_site_title;

  useEffect(() => {
    setWeatherStartTime(performance.now());
  }, []);

  const trendDays = [
    { day: "Di", icon: "🌧️", temp: "15° / 9°" },
    { day: "Mi", icon: "⛅", temp: "17° / 11°" },
    { day: "Do", icon: "☀️", temp: "20° / 12°" },
    { day: "Fr", icon: "⛅", temp: "19° / 10°" },
    { day: "Sa", icon: "🌧️", temp: "14° / 8°" },
    { day: "So", icon: "☁️", temp: "13° / 7°" },
    { day: "Mo", icon: "☀️", temp: "16° / 9°" }
  ];

  const handleFinishTask = () => {
    const timeMs = performance.now() - weatherStartTime;
    setWeatherTaskTime(timeMs);
    setShowCheck(true);
  };

  const submitFinalAnswer = () => {
    onComplete({ 
      attentionAnswer: answer,
      weatherTaskTimeMs: weatherTaskTime
    });
  };

  return (
    <BrowserWindow url="wetter-schnell.de/berlin" animate={false}>
      <div className="font-sans relative bg-slate-50 min-h-[800px] overflow-hidden text-left" onClick={(e) => {
        if (!showCheck && e.target === e.currentTarget) {
          onTrackClick('WeatherBg_EmptySpace');
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
            <span className="hover:text-white cursor-pointer" onClick={() => onTrackClick('Result_Tab_14Tage')}>14-Tage</span>
            <span className="hover:text-white cursor-pointer" onClick={() => onTrackClick('Result_Tab_Regenradar')}>Regenradar</span>
            <span className="hover:text-white cursor-pointer" onClick={() => onTrackClick('Result_Tab_Pollenflug')}>Pollenflug</span>
          </div>
        </header>
        
        <main className={`p-4 md:p-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300 ${showCheck ? 'blur-sm pointer-events-none' : ''}`}>
          
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-6 pb-12">
                <h2 className="text-2xl font-bold mb-1">Berlin, Deutschland</h2>
                <p className="text-blue-200 text-sm">Vorhersage für Morgen</p>
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <span className="text-6xl drop-shadow-lg">🌧️</span>
                    <div>
                      <div className="text-5xl font-medium tracking-tighter">{t.wr_weather_data}</div>
                      <div className="text-lg font-medium mt-1 text-blue-100">{t.wr_weather_desc}</div>
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

            <button onClick={handleFinishTask} className="w-full bg-blue-600 text-white p-5 text-xl font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-colors flex justify-center items-center gap-3">
              {t.wr_btn_finish} <span className="text-2xl">→</span>
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-700 text-sm mb-4 uppercase tracking-wider">{t.wr_trend_title}</h3>
              <div className="space-y-3">
                {trendDays.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                    <span className="font-bold text-slate-500 w-8">{item.day}</span>
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-mono text-slate-700 text-right">{item.temp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 cursor-not-allowed opacity-80" onClick={() => onTrackClick('Result_Radar_Widget_Unavailable')}>
              <span className="text-2xl">🗺️</span>
              <div>
                <div className="text-xs font-bold text-slate-800 uppercase">{t.wr_radar_title}</div>
                <div className="text-xs text-slate-500">{t.wr_radar_text}</div>
              </div>
            </div>
          </div>

        </main>

        {showCheck && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
            <div className="bg-white border-4 border-charcoal p-6 md:p-10 shadow-diy max-w-xl w-full mx-auto text-center">
              <h2 className="text-2xl font-black mb-4 uppercase">{t.wr_check_title}</h2>
              <p className="text-lg font-medium mb-6 text-slate-700">{t.wr_check_text}</p>
              
              <div className="space-y-3 mb-8 text-left">
                {t.wr_check_opts.map(opt => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer p-3 border-2 border-slate-200 rounded hover:bg-slate-50">
                    <input type="radio" name="check" value={opt} checked={answer === opt} onChange={(e) => setAnswer(e.target.value)} className="w-5 h-5 accent-jade shrink-0" />
                    <span className="font-bold text-slate-800">{opt}</span>
                  </label>
                ))}
              </div>

              <button onClick={submitFinalAnswer} disabled={!answer} className="w-full bg-jade text-white border-4 border-charcoal p-4 font-black uppercase text-lg shadow-diy disabled:opacity-50 transition-all">
                {t.wr_check_btn}
              </button>
            </div>
          </div>
        )}
      </div>
    </BrowserWindow>
  );
}