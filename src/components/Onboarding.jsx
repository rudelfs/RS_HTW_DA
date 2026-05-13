import { useState } from 'react';

export default function Onboarding({ t, onNext }) {
  const [age, setAge] = useState('');
  const [tech, setTech] = useState(3);
  const [knowsCookies, setKnowsCookies] = useState('');
  const [error, setError] = useState('');
  const [showCookieInfo, setShowCookieInfo] = useState(false);

  const handleCookieChange = (val) => {
    setKnowsCookies(val);
    if (val === 'no') setShowCookieInfo(true);
  };

  const handleStart = () => {
    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum < 0 || ageNum > 99) {
      setError(t.ob_age_err);
      return;
    }
    if (!knowsCookies) {
      setError(t.ob_cookie_err);
      return;
    }
    setError('');
    onNext({ age: ageNum, techSavvy: tech, knowsCookies: knowsCookies === 'yes' });
  };

  return (
    <>
      <div className="bg-white border-4 border-charcoal p-6 md:p-8 shadow-diy max-w-md mx-auto animate-window-pop relative">
        <h2 className="text-2xl md:text-3xl font-black mb-6 md:mb-8 uppercase tracking-tighter">{t.ob_title}</h2>
        
        <div className="space-y-6 md:space-y-8">
          <div>
            <label className="block font-bold mb-2">{t.ob_age}</label>
            <input 
              type="number" min="0" max="99"
              value={age} onChange={(e) => setAge(e.target.value)}
              className="w-full border-4 border-charcoal p-3 focus:outline-none focus:bg-jade focus:text-white transition-colors"
              placeholder={t.ob_age_ph}
            />
          </div>

          <div>
            <label className="block font-bold mb-2">{t.ob_tech}</label>
            <div className="flex justify-between text-[10px] md:text-xs text-slate-500 mb-2 uppercase font-bold">
              <span>{t.ob_tech_1}</span>
              <span>{t.ob_tech_5}</span>
            </div>
            <input type="range" min="1" max="5" value={tech} onChange={(e) => setTech(e.target.value)} className="w-full accent-jade" />
            <div className="text-center font-black text-xl md:text-2xl mt-2">{tech}</div>
          </div>

          <div>
            <label className="block font-bold mb-3">{t.ob_cookie_q}</label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="cookies" value="yes" checked={knowsCookies === 'yes'} onChange={() => handleCookieChange('yes')} className="w-5 h-5 accent-jade shrink-0" />
                <span className="font-medium text-sm md:text-base">{t.ob_cookie_yes}</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="cookies" value="no" checked={knowsCookies === 'no'} onChange={() => handleCookieChange('no')} className="w-5 h-5 accent-jade shrink-0" />
                <span className="font-medium text-sm md:text-base">{t.ob_cookie_no}</span>
              </label>
            </div>
          </div>

          {error && <p className="text-red-600 font-bold text-xs mt-2 bg-red-50 p-3 border-l-4 border-red-600">{error}</p>}

          <button onClick={handleStart} className="w-full bg-jade text-white border-4 border-charcoal p-4 font-black uppercase text-lg md:text-xl shadow-diy hover:translate-y-1 hover:shadow-none transition-all">
            {t.ob_start}
          </button>
        </div>
      </div>

      {showCookieInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm">
          <div className="bg-white border-4 border-charcoal p-6 md:p-8 max-w-sm w-full shadow-[8px_8px_0px_0px_rgba(77,80,87,1)] animate-window-pop text-center">
            <div className="text-4xl mb-4">🍪</div>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4">{t.ob_cookie_info_title}</h2>
            <p className="text-slate-600 font-medium mb-8 text-sm leading-relaxed text-left">
              {t.ob_cookie_info_text}
            </p>
            <button onClick={() => setShowCookieInfo(false)} className="w-full bg-charcoal text-white p-3 font-bold uppercase hover:bg-jade transition-colors shadow-[4px_4px_0px_0px_rgba(207,207,207,1)] active:translate-y-1 active:shadow-none">
              {t.ob_cookie_info_btn}
            </button>
          </div>
        </div>
      )}
    </>
  );
}