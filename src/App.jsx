// src/App.jsx
import { useState, useEffect } from 'react';
import { translations } from './lib/translations';
import Onboarding from './components/Onboarding';
import PerfumeScenario from './components/PerfumeScenario';
import NewsScenario from './components/NewsScenario';
import FlightScenario from './components/FlightScenario';
import DiscountScenario from './components/DiscountScenario';
import DownloadScenario from './components/DownloadScenario';
import MiniSurvey from './components/MiniSurvey';
import SurveyScenario from './components/SurveyScenario';
import ResultScreen from './components/ResultScreen';
import InfoModal from './components/InfoModal';

export default function App() {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState('de');
  const [showInfo, setShowInfo] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [scenarioGroups, setScenarioGroups] = useState({});
  const [sessionData, setSessionData] = useState({ age: '', techSavvy: 3, decisions: {}, miniSurveys: {}, finalSurvey: {} });

  const t = translations[lang];

  // Rezept-Szenario durch Discount-Szenario (Popup) ersetzt
  const scenarioKeys = ['perfume', 'news', 'flight', 'discount', 'download'];
  
  let currentScenarioKey = null;
  if (step === 1 || step === 2) currentScenarioKey = 'perfume';
  if (step === 3 || step === 4) currentScenarioKey = 'news';
  if (step === 5 || step === 6) currentScenarioKey = 'flight';
  if (step === 7 || step === 8) currentScenarioKey = 'discount';
  if (step === 9 || step === 10) currentScenarioKey = 'download';

  useEffect(() => {
    const options = ['A', 'B', 'C'];
    const generateGroups = () => {
      const groups = {};
      scenarioKeys.forEach(key => {
        groups[key] = options[Math.floor(Math.random() * options.length)];
      });
      return groups;
    };
    setScenarioGroups(generateGroups());
  }, []);

  const handleScenarioComplete = (name, wasManipulated) => {
    setSessionData(prev => ({
      ...prev,
      decisions: { ...prev.decisions, [name]: { group: scenarioGroups[name], manipulated: wasManipulated } }
    }));
    setStep(prev => prev + 1);
  };

  const handleMiniSurveyComplete = (name, surveyData) => {
    setSessionData(prev => ({
      ...prev,
      miniSurveys: { ...prev.miniSurveys, [name]: surveyData }
    }));
    setStep(prev => prev + 1);
  };

  const handleFinalSurveyComplete = (surveyData) => {
    setSessionData(prev => ({ ...prev, finalSurvey: surveyData }));
    setStep(prev => prev + 1);
  };

  const toggleCurrentGroup = () => {
    if (!currentScenarioKey) return;
    const cycle = { 'A': 'B', 'B': 'C', 'C': 'A' };
    setScenarioGroups(prev => ({
      ...prev,
      [currentScenarioKey]: cycle[prev[currentScenarioKey]]
    }));
  };

  return (
    <div className="min-h-screen bg-dust text-charcoal font-mono">
      <header className="border-b-4 border-charcoal bg-white p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowInfo(true)} 
            className="bg-dust border-2 border-charcoal w-10 h-10 flex items-center justify-center shadow-diy hover:translate-y-0.5 hover:shadow-none transition-all font-black"
          >
            i
          </button>

          {debugMode && currentScenarioKey && (
            <div className="hidden md:flex items-center border-2 border-charcoal bg-charcoal text-white text-[10px] uppercase font-bold overflow-hidden">
              <span className="px-2 py-1 bg-charcoal">Mode: {currentScenarioKey}</span>
              <button 
                onClick={toggleCurrentGroup}
                className="px-2 py-1 bg-jade text-white hover:bg-jade/80 transition-colors border-l-2 border-charcoal"
              >
                Gruppe {scenarioGroups[currentScenarioKey]} (Switch)
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button onClick={() => setLang('de')} className={`px-2 py-1 border-2 border-charcoal font-bold ${lang === 'de' ? 'bg-jade text-white' : 'bg-white'}`}>DE</button>
          <button onClick={() => setLang('en')} className={`px-2 py-1 border-2 border-charcoal font-bold ${lang === 'en' ? 'bg-jade text-white' : 'bg-white'}`}>EN</button>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto py-10 px-4">
        {step === 0 && <Onboarding t={t} onNext={(d) => { setSessionData(prev => ({...prev, ...d})); setStep(1); }} />}
        
        {step === 1 && <PerfumeScenario key="perfume" group={scenarioGroups.perfume} onComplete={(res) => handleScenarioComplete('perfume', res)} />}
        {step === 2 && <MiniSurvey key="mini-perfume" onComplete={(res) => handleMiniSurveyComplete('perfume', res)} />}
        
        {step === 3 && <NewsScenario key="news" group={scenarioGroups.news} onComplete={(res) => handleScenarioComplete('news', res)} />}
        {step === 4 && <MiniSurvey key="mini-news" onComplete={(res) => handleMiniSurveyComplete('news', res)} />}
        
        {step === 5 && <FlightScenario key="flight" group={scenarioGroups.flight} onComplete={(res) => handleScenarioComplete('flight', res)} />}
        {step === 6 && <MiniSurvey key="mini-flight" onComplete={(res) => handleMiniSurveyComplete('flight', res)} />}

        {step === 7 && <DiscountScenario key="discount" group={scenarioGroups.discount} onComplete={(res) => handleScenarioComplete('discount', res)} />}
        {step === 8 && <MiniSurvey key="mini-discount" onComplete={(res) => handleMiniSurveyComplete('discount', res)} />}

        {step === 9 && <DownloadScenario key="download" group={scenarioGroups.download} onComplete={(res) => handleScenarioComplete('download', res)} />}
        {step === 10 && <MiniSurvey key="mini-download" onComplete={(res) => handleMiniSurveyComplete('download', res)} />}
        
        {step === 11 && <SurveyScenario key="final-survey" onComplete={handleFinalSurveyComplete} />}
        {step === 12 && <ResultScreen key="result" results={sessionData} />}
      </main>

      <InfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} debugMode={debugMode} setDebugMode={setDebugMode} />
    </div>
  );
}