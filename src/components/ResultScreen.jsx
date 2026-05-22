import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function ResultScreen({ t, results }) {
  const [status, setStatus] = useState('sending');

  useEffect(() => {
    const sendDataToSupabase = async () => {
      // Prüfen, ob wir in der lokalen Entwicklungsumgebung sind (optional für Tests)
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

    // Stellt sicher, dass nur einmal gesendet wird
    if (results && Object.keys(results).length > 0) {
      sendDataToSupabase();
    }
  }, [results]);

  return (
    <div className="flex flex-col items-center justify-center p-4 animate-window-pop">
      <div className="bg-white border-4 border-charcoal p-8 md:p-12 shadow-diy max-w-2xl w-full text-center">
        
        {status === 'sending' && (
          <>
            <div className="text-4xl mb-4 animate-spin">⏳</div>
            <h2 className="text-2xl font-black mb-4 uppercase">Daten werden gesendet...</h2>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter text-jade">{t.rs_title}</h2>
            <p className="text-slate-600 font-bold text-lg">
              {t.rs_text}
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-5xl mb-4">❌</div>
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