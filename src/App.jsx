import { useState, useEffect } from 'react';
import { translations } from './lib/translations';
import WelcomeScreen from './components/WelcomeScreen';
import Onboarding from './components/Onboarding';
import TaskSetting from './components/TaskSetting';
import SearchEngine from './components/SearchEngine';
import CookieScenario from './components/CookieScenario';
import WeatherResult from './components/WeatherResult';
import MicroSurvey from './components/MicroSurvey';
import RecallSurvey from './components/RecallSurvey';
import MacroSurvey from './components/MacroSurvey';
import ControlSurvey from './components/ControlSurvey';
import ResultScreen from './components/ResultScreen';

export default function App() {
  const [step, setStep] = useState(0); 
  const [lang, setLang] = useState('de');
  const [group, setGroup] = useState(null); 
  const [sessionData, setSessionData] = useState({ nonFunctionalClicks: [] });
  const [studyStartTime, setStudyStartTime] = useState(null);

  const [debugClicks, setDebugClicks] = useState(0);
  const [showDebug, setShowDebug] = useState(false);
  const [disableSupabase, setDisableSupabase] = useState(false);

  const t = translations[lang];

  // Automatisches Scrollen nach oben bei jedem Schrittwechsel
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  useEffect(() => {
    setGroup(Math.random() < 0.70 ? 'A' : 'B');
  }, []);

  useEffect(() => {
    if (step === 1 && !studyStartTime) {
      setStudyStartTime(performance.now());
    }
  }, [step, studyStartTime]);

  useEffect(() => {
    if (debugClicks > 0 && debugClicks < 3) {
      const timer = setTimeout(() => setDebugClicks(0), 1000);
      return () => clearTimeout(timer);
    }
    if (debugClicks >= 3) {
      setShowDebug(true);
      setDebugClicks(0);
    }
  }, [debugClicks]);

  const updateData = (key, data) => {
    setSessionData(prev => ({ ...prev, [key]: data }));
    setStep(prev => prev + 1);
  };

  const trackNonFunctionalClick = (label) => {
    setSessionData(prev => ({
      ...prev,
      nonFunctionalClicks: [
        ...prev.nonFunctionalClicks, 
        { label, timestamp: Date.now(), currentStep: step }
      ]
    }));
  };

  const resetStudy = () => {
    if (window.confirm(lang === 'de' ? "Wirklich neu starten?" : "Really restart?")) {
      setStep(0);
      setSessionData({ nonFunctionalClicks: [] });
      setGroup(Math.random() < 0.70 ? 'A' : 'B');
      setStudyStartTime(null);
      setDebugClicks(0);
      setShowDebug(false);
    }
  };

  const handleFinalStep = (d) => {
    const totalTimeMs = performance.now() - studyStartTime;
    const finalPayload = {
      ...sessionData,
      demographics: d,
      totalStudyTimeMs: totalTimeMs,
      wasDebugMode: disableSupabase,
      group: group 
    };
    
    setSessionData(finalPayload);
    setStep(prev => prev + 1);
  };

  return (
    <div className="relative min-h-screen bg-dust text-charcoal font-mono">
      
      {showDebug && (
        <div className="fixed top-16 right-4 bg-black/90 text-green-400 font-mono text-xs p-4 rounded shadow-2xl z-[9999] w-64 border border-green-500/30">
          <div className="flex justify-between items-center mb-4 border-b border-green-900 pb-2">
            <h3 className="font-bold text-white tracking-widest uppercase">Debug Panel</h3>
            <button onClick={() => setShowDebug(false)} className="text-red-500 font-bold px-2 hover:bg-red-900/50 rounded">X</button>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between"><span>Current Step:</span> <span className="text-white">{step}</span></div>
            <div className="flex justify-between"><span>Test Group:</span> <span className="text-white">{group}</span></div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer mt-4 pt-4 border-t border-green-900">
            <input 
              type="checkbox" 
              checked={disableSupabase} 
              onChange={(e) => setDisableSupabase(e.target.checked)}
              className="w-4 h-4 accent-red-600"
            />
            <span className={disableSupabase ? 'text-red-400 font-bold' : 'text-slate-400'}>Disable DB Push</span>
          </label>
        </div>
      )}

      <header className="border-b-4 border-charcoal bg-white p-3 md:p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2 md:gap-4">
          <button aria-label="Zur Startseite" onClick={resetStudy} className="bg-dust border-2 border-charcoal w-10 h-10 flex items-center justify-center shadow-diy hover:translate-y-0.5 transition-all text-charcoal">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </button>
        </div>

        <div className="flex gap-2">
          <button onClick={() => { setLang('de'); setDebugClicks(prev => prev + 1); }} className={`px-2 py-1 text-sm border-2 border-charcoal font-bold ${lang === 'de' ? 'bg-jade text-white' : 'bg-white'}`}>DE</button>
          <button onClick={() => { setLang('en'); setDebugClicks(prev => prev + 1); }} className={`px-2 py-1 text-sm border-2 border-charcoal font-bold ${lang === 'en' ? 'bg-jade text-white' : 'bg-white'}`}>EN</button>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto py-6 md:py-10 px-4">
        {step === 0 && <WelcomeScreen t={t} onNext={() => setStep(1)} />}
        {step === 1 && <TaskSetting t={t} onNext={() => setStep(2)} />}
        {step === 2 && <SearchEngine t={t} onTrackClick={trackNonFunctionalClick} onNext={(d) => updateData('serpClick', d)} />}
        
        {step === 3 && <CookieScenario group={group} t={t} siteName={sessionData.serpClick?.siteName} siteUrl={sessionData.serpClick?.siteUrl} onTrackClick={trackNonFunctionalClick} onComplete={(d) => updateData('cookieInteraction', { ...d, group })} />}
        {step === 4 && <WeatherResult t={t} siteName={sessionData.serpClick?.siteName} onTrackClick={trackNonFunctionalClick} onComplete={(d) => updateData('attentionCheck', d)} />}
        {step === 5 && <MicroSurvey t={t} onComplete={(d) => updateData('microSurvey', d)} />}
        {step === 6 && <RecallSurvey t={t} onComplete={(d) => updateData('recallSurvey', d)} />}
        {step === 7 && <MacroSurvey group={group} t={t} onComplete={(d) => updateData('macroSurvey', d)} />}
        {step === 8 && <ControlSurvey t={t} onComplete={(d) => updateData('controlSurvey', d)} />}
        
        {step === 9 && <Onboarding t={t} onNext={handleFinalStep} />}
        {step === 10 && <ResultScreen t={t} results={sessionData} disablePush={disableSupabase} />}
      </main>
    </div>
  );
}