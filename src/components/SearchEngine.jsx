import BrowserWindow from './BrowserWindow';

export default function SearchEngine({ t, onTrackClick, onNext }) {
  const results = [
    { id: 'res1', title: t.se_res1_title, desc: t.se_res1_desc, url: "wetter-schnell.de/berlin" },
    { id: 'res2', title: t.se_res2_title, desc: t.se_res2_desc, url: "wetter24.de/berlin-14-tage" },
    { id: 'res3', title: t.se_res3_title, desc: t.se_res3_desc, url: "live-radar.net/berlin-brandenburg" },
    { id: 'res4', title: t.se_res4_title, desc: t.se_res4_desc, url: "wetter-heute.de/berlin-mitte" }
  ];

  return (
    <BrowserWindow url="search.net/q=wetter+berlin+morgen">
      <div className="font-sans bg-white min-h-[800px] text-left">
        
        <div className="border-b border-gray-200 p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 bg-white sticky top-0 z-10">
          <div className="text-3xl font-black text-blue-600 tracking-tighter">Search.net</div>
          <div className="flex-1 w-full max-w-2xl">
            <div className="border border-gray-200 shadow-sm hover:shadow-md rounded-full px-5 py-3 w-full flex items-center justify-between transition-shadow bg-white">
              <span className="text-gray-800 text-base">{t.se_search}</span>
              <div className="flex gap-3 text-gray-400 items-center">
                <span className="text-xl cursor-pointer hover:text-gray-600" onClick={() => onTrackClick('SERP_Clear_Search')}>×</span>
                <span className="border-l border-gray-200 pl-3 text-blue-500 text-lg cursor-pointer" onClick={() => onTrackClick('SERP_Search_Icon')}>🔍</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 px-4 md:px-44 flex gap-6 text-sm text-gray-500 pt-2 overflow-x-auto">
          <div className="border-b-4 border-blue-600 text-blue-600 font-bold pb-3 whitespace-nowrap">Alle Ergebnisse</div>
          <div className="pb-3 hover:text-gray-800 cursor-pointer whitespace-nowrap" onClick={() => onTrackClick('SERP_Tab_Bilder')}>Bilder</div>
          <div className="pb-3 hover:text-gray-800 cursor-pointer whitespace-nowrap" onClick={() => onTrackClick('SERP_Tab_News')}>News</div>
          <div className="pb-3 hover:text-gray-800 cursor-pointer whitespace-nowrap" onClick={() => onTrackClick('SERP_Tab_Maps')}>Maps</div>
        </div>

        <div className="p-4 md:px-44 max-w-4xl space-y-8 mt-4 pb-20">
          <div className="text-sm text-gray-500 mb-4">Ungefähr 14.500.000 Ergebnisse (0,32 Sekunden)</div>

          {results.map((res) => (
            <div key={res.id} className="cursor-pointer group" onClick={() => onNext({ siteName: res.title, siteUrl: res.url })}>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-black text-xs uppercase">
                  {res.id}
                </div>
                <div className="text-sm text-gray-800">
                  {res.url.split('/')[0]}<br/>
                  <span className="text-xs text-gray-500">https://www.{res.url}</span>
                </div>
              </div>
              <h3 className="text-xl text-[#1a0dab] font-medium group-hover:underline leading-tight">
                {res.title}
              </h3>
              <p className="text-[#4d5156] mt-1 text-sm leading-snug">
                {res.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </BrowserWindow>
  );
}