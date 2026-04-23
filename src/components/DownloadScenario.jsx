import { useState } from 'react';
import BrowserWindow from './BrowserWindow';

export default function DownloadScenario({ group, onComplete }) {
  const [newsletter, setNewsletter] = useState(group === 'B' ? true : false);

  const handleDownload = () => {
    onComplete(!!newsletter);
  };

  return (
    <BrowserWindow url="pdf-master-tools.net/download">
      <div className="font-sans bg-slate-800 min-h-[800px] flex items-center justify-center p-8">
        <div className="bg-white p-10 max-w-xl w-full rounded-xl shadow-2xl">
          
          <div className="flex items-center gap-4 mb-8 border-b pb-6">
            <div className="w-16 h-16 bg-red-500 rounded-xl flex items-center justify-center text-white text-3xl font-black">PDF</div>
            <div>
              <h2 className="text-2xl font-black">PDF Master Pro</h2>
              <p className="text-slate-500">Kostenloser Download (Version 4.2)</p>
            </div>
          </div>

          <p className="font-bold text-lg mb-4">Ihr Download ist fast bereit!</p>
          <p className="text-sm text-slate-600 mb-8">
            Bestätigen Sie Ihre Einstellungen, um den kostenlosen Download zu starten.
          </p>

          <div className="mb-8">
            
            {group === 'A' && (
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={!!newsletter} 
                    onChange={(e) => setNewsletter(e.target.checked)} 
                    className="w-5 h-5 accent-blue-600" 
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Ich möchte Tipps und Tricks zur Software per E-Mail erhalten.
                  </span>
                </label>
              </div>
            )}

            {group === 'B' && (
              <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-300">
                <p className="text-amber-800 font-bold text-xs uppercase tracking-wider mb-3">Empfohlener Schritt</p>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={!!newsletter} 
                    onChange={(e) => setNewsletter(e.target.checked)} 
                    className="w-6 h-6 accent-blue-600 rounded" 
                  />
                  <span className="text-sm font-black text-slate-800">
                    Newsletter & Updates aktivieren (Kostenlos)
                  </span>
                </label>
              </div>
            )}

            {group === 'C' && (
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="dl_option"
                    checked={newsletter === true} 
                    onChange={() => setNewsletter(true)} 
                    className="w-5 h-5 accent-blue-600" 
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Ja, ich möchte zum PDF-Profi werden und exklusive Tipps erhalten.
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="dl_option"
                    checked={newsletter === false} 
                    onChange={() => setNewsletter(false)} 
                    className="w-5 h-5 accent-blue-600" 
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Nein, ich verzichte auf nützliche Tipps und lerne lieber auf die harte Tour.
                  </span>
                </label>
              </div>
            )}

          </div>

          <button 
            onClick={handleDownload} 
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-black text-xl shadow-lg transition-all"
          >
            DOWNLOAD STARTEN
          </button>
        </div>
      </div>
    </BrowserWindow>
  );
}