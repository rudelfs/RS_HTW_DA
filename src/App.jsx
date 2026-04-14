import { useState, useEffect } from 'react';
import { translations } from './lib/translations';
import Onboarding from './components/Onboarding';
import PerfumeScenario from './components/PerfumeScenario';
import NewsScenario from './components/NewsScenario';
import FlightScenario from './components/FlightScenario';
import RecipeScenario from './components/RecipeScenario';
import DownloadScenario from './components/DownloadScenario';
import SurveyScenario from './components/SurveyScenario';
import ResultScreen from './components/ResultScreen';
import InfoModal from './components/InfoModal';

export default function App() {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState('de');
  const [showInfo, setShowInfo] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [scenarioGroups, setScenarioGroups] = useState({});
  const [sessionData, setSessionData] = useState({ age: '', techSavvy: 3, decisions: {}, survey: {} });

  const t = translations[lang];

  const scenarioKeys = ['perfume', 'news', 'flight', 'recipe', 'download'];
  const currentScenarioKey = step > 0 && step <= 5 ? scenarioKeys[step - 1] : null;

  useEffect(() => {
    const groups = ['A', 'B', 'B', 'A', 'B'].sort(() => Math.random() - 0.5);
    setScenarioGroups({ 
      perfume: groups[0], 
      news: groups[1], 
      flight: groups[2],
      recipe: groups[3],
      download: groups[4]
    });
  }, []);

  const handleScenarioComplete = (name, wasManipulated) => {
    setSessionData(prev => ({
      ...prev,
      decisions: { ...prev.decisions, [name]: { group: scenarioGroups[name], manipulated: wasManipulated } }
    }));
    setStep(prev => prev + 1);
  };

  const handleSurveyComplete = (surveyData) => {
    setSessionData(prev => ({ ...prev, survey: surveyData }));
    setStep(prev => prev + 1);
  };

  const toggleCurrentGroup = () => {
    if (!currentScenarioKey) return;
    setScenarioGroups(prev => ({
      ...prev,
      [currentScenarioKey]: prev[currentScenarioKey] === 'A' ? 'B' : 'A'
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
        {step === 2 && <NewsScenario key="news" group={scenarioGroups.news} onComplete={(res) => handleScenarioComplete('news', res)} />}
        {step === 3 && <FlightScenario key="flight" group={scenarioGroups.flight} onComplete={(res) => handleScenarioComplete('flight', res)} />}
        {step === 4 && <RecipeScenario key="recipe" group={scenarioGroups.recipe} onComplete={(res) => handleScenarioComplete('recipe', res)} />}
        {step === 5 && <DownloadScenario key="download" group={scenarioGroups.download} onComplete={(res) => handleScenarioComplete('download', res)} />}
        {step === 6 && <SurveyScenario key="survey" onComplete={handleSurveyComplete} />}
        {step === 7 && <ResultScreen key="result" results={sessionData} />}
      </main>

      <InfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} debugMode={debugMode} setDebugMode={setDebugMode} />
    </div>
  );
}