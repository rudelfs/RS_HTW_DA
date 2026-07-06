import { useState } from 'react';

export default function SearchEngine({ t, onTrackClick, onNext }) {
  const [searchQuery] = useState(t.se_search);

  return (
    <div className="bg-white min-h-screen font-sans text-left pb-20 animate-window-pop">
      <header className="flex flex-wrap items-center p-4 md:p-6 md:pl-8 border-b border-slate-200 gap-4 md:gap-8">
        <div className="text-2xl font-black text-blue-600 tracking-tighter">SearchMock</div>
        <div className="flex-1 max-w-2xl flex items-center border border-slate-300 rounded-full px-5 py-3 shadow-sm hover:shadow-md transition-shadow">
          <input type="text" value={searchQuery} readOnly className="w-full outline-none bg-transparent text-slate-800 text-base" />
          <span className="text-blue-500 cursor-pointer">🔍</span>
        </div>
      </header>

      <div className="border-b border-slate-200 px-4 md:px-8 lg:px-40 flex gap-6 text-sm text-slate-600 overflow-x-auto">
        <div className="border-b-4 border-blue-600 pb-3 pt-3 text-blue-600 font-bold whitespace-nowrap">{t.se_nav_all}</div>
        <div className="pb-3 pt-3 hover:text-slate-800 cursor-pointer whitespace-nowrap">{t.se_nav_images}</div>
        <div className="pb-3 pt-3 hover:text-slate-800 cursor-pointer whitespace-nowrap">{t.se_nav_news}</div>
        <div className="pb-3 pt-3 hover:text-slate-800 cursor-pointer whitespace-nowrap">{t.se_nav_maps}</div>
      </div>

      <main className="p-4 md:p-8 lg:px-40 max-w-4xl">
        <div className="text-sm text-slate-500 mb-6">{t.se_results_count}</div>

        <div 
          className="mb-8 cursor-pointer group" 
          onClick={() => onNext({ siteName: t.se_res1_title, siteUrl: 'wetter-schnell.de' })}
        >
          <div className="text-sm text-slate-800 mb-1 flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs">🌐</div>
            <span>wetter-schnell.de</span>
          </div>
          <h3 className="text-xl text-blue-800 group-hover:underline mb-1">{t.se_res1_title}</h3>
          <p className="text-slate-600 text-sm">{t.se_res1_desc}</p>
        </div>

        <div 
          className="mb-8 cursor-pointer group"
          onClick={() => onNext({ siteName: t.se_res2_title, siteUrl: 'wetter24.de' })}
        >
          <div className="text-sm text-slate-800 mb-1 flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs">🌐</div>
            <span>wetter24.de</span>
          </div>
          <h3 className="text-xl text-blue-800 group-hover:underline mb-1">{t.se_res2_title}</h3>
          <p className="text-slate-600 text-sm">{t.se_res2_desc}</p>
        </div>

        <div 
          className="mb-8 cursor-pointer group"
          onClick={() => onNext({ siteName: t.se_res3_title, siteUrl: 'live-radar.net' })}
        >
          <div className="text-sm text-slate-800 mb-1 flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs">🌐</div>
            <span>live-radar.net</span>
          </div>
          <h3 className="text-xl text-blue-800 group-hover:underline mb-1">{t.se_res3_title}</h3>
          <p className="text-slate-600 text-sm">{t.se_res3_desc}</p>
        </div>

        <div 
          className="mb-8 cursor-pointer group"
          onClick={() => onNext({ siteName: t.se_res4_title, siteUrl: 'wetter-heute.de' })}
        >
          <div className="text-sm text-slate-800 mb-1 flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs">🌐</div>
            <span>wetter-heute.de</span>
          </div>
          <h3 className="text-xl text-blue-800 group-hover:underline mb-1">{t.se_res4_title}</h3>
          <p className="text-slate-600 text-sm">{t.se_res4_desc}</p>
        </div>
      </main>
    </div>
  );
}