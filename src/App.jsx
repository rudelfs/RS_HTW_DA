import { useState, useEffect } from 'react';
import { translations } from './lib/translations';
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

  const t = translations[lang];

  useEffect(() => {
    setGroup(Math.random() < 0.70 ? 'A' : 'B');
  }, []);

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
    }
  };

  return (
    <div className="min-h-screen bg-dust text-charcoal font-mono">
      <header className="border-b-4 border-charcoal bg-white p-3 md:p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={resetStudy} className="bg-dust border-2 border-charcoal w-10 h-10 flex items-center justify-center shadow-diy hover:translate-y-0.5 transition-all text-charcoal">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </button>
          {group && <div className="hidden lg:block border-2 border-charcoal bg-charcoal text-white text-[10px] uppercase font-bold px-2 py-1">Step: {step} | Group: {group}</div>}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setLang('de')} className={`px-2 py-1 text-sm border-2 border-charcoal font-bold ${lang === 'de' ? 'bg-jade text-white' : 'bg-white'}`}>DE</button>
          <button onClick={() => setLang('en')} className={`px-2 py-1 text-sm border-2 border-charcoal font-bold ${lang === 'en' ? 'bg-jade text-white' : 'bg-white'}`}>EN</button>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto py-6 md:py-10 px-4">
        {step === 0 && <Onboarding t={t} onNext={(d) => updateData('demographics', d)} />}
        {step === 1 && <TaskSetting t={t} onNext={() => setStep(2)} />}
        {step === 2 && <SearchEngine t={t} onTrackClick={trackNonFunctionalClick} onNext={(d) => updateData('serpClick', d)} />}
        
        {/* Phase 1: Experiment */}
        {step === 3 && <CookieScenario group={group} t={t} siteName={sessionData.serpClick?.siteName} siteUrl={sessionData.serpClick?.siteUrl} onTrackClick={trackNonFunctionalClick} onComplete={(d) => updateData('cookieInteraction', { ...d, group })} />}
        
        {/* Phase 2: Weather & Micro Survey */}
        {step === 4 && <WeatherResult t={t} siteName={sessionData.serpClick?.siteName} onTrackClick={trackNonFunctionalClick} onComplete={(d) => updateData('attentionCheck', d)} />}
        {step === 5 && <MicroSurvey t={t} onComplete={(d) => updateData('microSurvey', d)} />}
        
        {/* Phase 3: Recall */}
        {step === 6 && <RecallSurvey t={t} onComplete={(d) => updateData('recallSurvey', d)} />}
        
        {/* Phase 4 & 5: Reveal & Macro Survey */}
        {step === 7 && <MacroSurvey group={group} t={t} onComplete={(d) => updateData('macroSurvey', d)} />}
        
        {/* Phase 6: Control Variables */}
        {step === 8 && <ControlSurvey t={t} onComplete={(d) => updateData('controlSurvey', d)} />}
        
        {step === 9 && <ResultScreen t={t} results={sessionData} />}
      </main>
    </div>
  );
}