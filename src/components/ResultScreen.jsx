import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function ResultScreen({ t, results, disablePush }) {
  const [status, setStatus] = useState('sending');

  useEffect(() => {
    const sendDataToSupabase = async () => {
      if (disablePush) {
        console.warn("DEBUG MODE: Data NOT sent to Supabase.", results);
        setTimeout(() => setStatus('success'), 800);
        return;
      }

      const { error } = await supabase
        .from('survey_results')
        .insert([{ payload: results }]);

      if (error) {
        console.error('Fehler beim Speichern:', error);
        setStatus('error');
      } else {
        setStatus('success');
      }
    };

    if (results && Object.keys(results).length > 0) {
      sendDataToSupabase();
    }
  }, [results, disablePush]);

  return (
    <div className="flex flex-col items-center justify-center p-4 animate-window-pop">
      <div className="bg-white border-4 border-charcoal p-8 md:p-12 shadow-diy max-w-2xl w-full text-center">
        
        {status === 'sending' && (
          <>
            <div className="w-10 h-10 border-4 border-slate-200 border-t-charcoal rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-black mb-4 uppercase">Daten werden gesendet...</h2>
          </>
        )}

        {status === 'success' && (
          <>
            <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter text-jade">{t.rs_title}</h2>
            <p className="text-slate-600 font-bold text-lg mb-8">
              {t.rs_text}
            </p>

            <div className="mt-8 pt-8 border-t-2 border-slate-100 text-left bg-slate-50 p-6">
              <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Ergebnisse der Studie</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Falls Sie Interesse an den finalen Ergebnissen dieser Forschungsarbeit haben, kontaktieren Sie mich gerne unter:<br/>
                <a href="mailto:rudolfs.spridis@student.htw-berlin.de" className="text-blue-600 font-bold hover:underline mt-2 inline-block">
                  rudolfs.spridis@student.htw-berlin.de
                </a>
              </p>
            </div>

            {disablePush && (
              <div className="bg-gray-900 border-4 border-charcoal p-4 rounded-lg text-left mt-8">
                <p className="text-yellow-400 font-bold text-xs mb-2 uppercase tracking-wider">Debug Mode: Simulated Payload</p>
                <p className="text-slate-300 text-xs mb-4">Die Daten wurden NICHT an die Datenbank gesendet. Hier ist der finale Datensatz:</p>
                <pre className="text-green-400 text-[10px] font-mono overflow-auto max-h-96">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </div>
            )}
          </>
        )}

        {status === 'error' && (
          <>
            <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter text-red-600">Verbindungsfehler</h2>
            <p className="text-slate-600 font-bold text-lg mb-6">
              Die Daten konnten nicht an den Server gesendet werden.
            </p>
            <div className="bg-gray-900 border-4 border-charcoal p-4 rounded-lg text-left">
              <p className="text-white text-xs mb-2">Bitte kopieren Sie diesen Code manuell:</p>
              <pre className="text-green-400 text-[10px] font-mono overflow-auto max-h-64">
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>
          </>
        )}

      </div>
    </div>
  );
}