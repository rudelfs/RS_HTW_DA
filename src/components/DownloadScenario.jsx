import { useState } from 'react';
import BrowserWindow from './BrowserWindow';

export default function DownloadScenario({ group, onComplete }) {
  // In Gruppe B ist das "böse" Häkchen (Daten teilen) bereits gesetzt
  const [agreed, setAgreed] = useState(group === 'B');

  return (
    <BrowserWindow url="pdf-master-tools.net/download-free">
      <div className="font-sans bg-slate-800 min-h-[800px] flex items-center justify-center p-8">
        <div className="bg-white p-10 max-w-xl w-full rounded-xl shadow-2xl">
          
          <div className="flex items-center gap-4 mb-8 border-b pb-6">
            <div className="w-16 h-16 bg-red-500 rounded-xl flex items-center justify-center text-white text-3xl font-black">PDF</div>
            <div>
              <h2 className="text-2xl font-black">PDF Master Pro</h2>
              <p className="text-slate-500">Kostenloser Download (Version 4.2)</p>
            </div>
          </div>

          <p className="font-bold mb-4">Ihr Download ist fast bereit!</p>
          <p className="text-sm text-slate-600 mb-8">Bitte bestätigen Sie die Nutzungsbedingungen, um den kostenlosen Download zu starten.</p>

          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8">
            {group === 'A' ? (
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-5 h-5 accent-blue-600" />
                <span className="text-sm font-medium text-slate-700">
                  Ich möchte personalisierte Angebote von Partnerunternehmen per E-Mail erhalten.
                </span>
              </label>
            ) : (
              /* DARK PATTERN: Doppelte Verneinung + Opt-Out */
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-5 h-5 accent-blue-600" />
                <span className="text-sm font-medium text-slate-700 leading-snug">
                  Bitte lassen Sie dieses Häkchen <strong>nicht deaktiviert</strong>, falls Sie <strong>nicht auf die Weitergabe</strong> Ihrer Telemetriedaten an unsere Werbepartner verzichten möchten.
                </span>
              </label>
            )}
          </div>

          <button 
            onClick={() => onComplete(agreed)} 
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-black text-xl shadow-lg"
          >
            DOWNLOAD STARTEN
          </button>
        </div>
      </div>
    </BrowserWindow>
  );
}