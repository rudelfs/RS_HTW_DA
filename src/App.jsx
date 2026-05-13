import { useState, useEffect } from 'react';
import { translations } from './lib/translations';
import Onboarding from './components/Onboarding';
import TaskSetting from './components/TaskSetting';
import CookieScenario from './components/CookieScenario';
import MicroSurvey from './components/MicroSurvey';
import MacroSurvey from './components/MacroSurvey';
import ResultScreen from './components/ResultScreen';
import InfoModal from './components/InfoModal';

export default function App() {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState('de');
  const [showInfo, setShowInfo] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  
  const [scenarioOrder, setScenarioOrder] = useState([]);
  const [sessionData, setSessionData] = useState({ 
    demographics: {}, 
    scenarios: {}, 
    microSurveys: {}, 
    macroSurvey: {} 
  });

  const t = translations[lang];

  useEffect(() => {
    const groups = ['A', 'B', 'C'].sort(() => Math.random() - 0.5);
    setScenarioOrder(groups);
  }, []);

  const resetStudy = () => {
    const confirmMsg = lang === 'de' 
      ? "Wirklich zur Startseite zurückkehren? Alle Fortschritte gehen verloren." 
      : "Really return to home? All progress will be lost.";
    
    if (window.confirm(confirmMsg)) {
      setStep(0);
      setSessionData({ demographics: {}, scenarios: {}, microSurveys: {}, macroSurvey: {} });
      const groups = ['A', 'B', 'C'].sort(() => Math.random() - 0.5);
      setScenarioOrder(groups);
    }
  };

  const handleOnboarding = (data) => {
    setSessionData(prev => ({ ...prev, demographics: data }));
    setStep(1);
  };

  const handleScenarioComplete = (group, result) => {
    setSessionData(prev => ({
      ...prev,
      scenarios: { ...prev.scenarios, [group]: result }
    }));
    setStep(prev => prev + 1);
  };

  const handleMicroSurveyComplete = (group, surveyData) => {
    setSessionData(prev => ({
      ...prev,
      microSurveys: { ...prev.microSurveys, [group]: surveyData }
    }));
    setStep(prev => prev + 1);
  };

  const handleMacroComplete = (data) => {
    setSessionData(prev => ({ ...prev, macroSurvey: data }));
    setStep(9);
  };

  const getCurrentGroup = () => {
    if (step === 2 || step === 3) return scenarioOrder[0];
    if (step === 4 || step === 5) return scenarioOrder[1];
    if (step === 6 || step === 7) return scenarioOrder[2];
    return null;
  };

  const currentGroup = getCurrentGroup();

  return (
    <div className="min-h-screen bg-dust text-charcoal font-mono">
      <header className="border-b-4 border-charcoal bg-white p-3 md:p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* HOME BUTTON */}
          <button 
            onClick={resetStudy} 
            className="bg-dust border-2 border-charcoal w-10 h-10 flex items-center justify-center shadow-diy hover:translate-y-0.5 hover:shadow-none transition-all font-black text-charcoal"
            title="Home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </button>

          {/* INFO BUTTON */}
          <button 
            onClick={() => setShowInfo(true)} 
            className="bg-dust border-2 border-charcoal w-10 h-10 flex items-center justify-center shadow-diy hover:translate-y-0.5 hover:shadow-none transition-all font-black text-xl italic"
          >
            i
          </button>

          {debugMode && currentGroup && (
            <div className="hidden lg:flex items-center border-2 border-charcoal bg-charcoal text-white text-[10px] uppercase font-bold px-2 py-1">
              {t.test_phase}: {step} | {t.current_group}: {currentGroup}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button onClick={() => setLang('de')} className={`px-2 py-1 md:px-3 md:py-1 text-sm md:text-base border-2 border-charcoal font-bold ${lang === 'de' ? 'bg-jade text-white' : 'bg-white text-charcoal'}`}>DE</button>
          <button onClick={() => setLang('en')} className={`px-2 py-1 md:px-3 md:py-1 text-sm md:text-base border-2 border-charcoal font-bold ${lang === 'en' ? 'bg-jade text-white' : 'bg-white text-charcoal'}`}>EN</button>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto py-6 md:py-10 px-4">
        {step === 0 && <Onboarding t={t} onNext={handleOnboarding} />}
        {step === 1 && <TaskSetting t={t} onNext={() => setStep(2)} />}
        
        {step === 2 && <CookieScenario key="scen1" group={scenarioOrder[0]} t={t} onComplete={(r) => handleScenarioComplete(scenarioOrder[0], r)} />}
        {step === 3 && <MicroSurvey key="micro1" t={t} onComplete={(r) => handleMicroSurveyComplete(scenarioOrder[0], r)} />}
        
        {step === 4 && <CookieScenario key="scen2" group={scenarioOrder[1]} t={t} onComplete={(r) => handleScenarioComplete(scenarioOrder[1], r)} />}
        {step === 5 && <MicroSurvey key="micro2" t={t} onComplete={(r) => handleMicroSurveyComplete(scenarioOrder[1], r)} />}
        
        {step === 6 && <CookieScenario key="scen3" group={scenarioOrder[2]} t={t} onComplete={(r) => handleScenarioComplete(scenarioOrder[2], r)} />}
        {step === 7 && <MicroSurvey key="micro3" t={t} onComplete={(r) => handleMicroSurveyComplete(scenarioOrder[2], r)} />}
        
        {step === 8 && <MacroSurvey t={t} onComplete={handleMacroComplete} />}
        {step === 9 && <ResultScreen t={t} results={sessionData} />}
      </main>

      <InfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} debugMode={debugMode} setDebugMode={setDebugMode} />
    </div>
  );
}