import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ResultScreen({ t, results, disablePush }) {
  const [status, setStatus] = useState('sending');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const sendData = async () => {
      if (disablePush) {
        setStatus('success');
        return;
      }
      
      try {
        const { error } = await supabase
          .from('survey_results')
          .insert([{ payload: results }]);
          
        if (error) throw error;
        setStatus('success');
      } catch (err) {
        console.error(err);
        setErrorMsg(err.message);
        setStatus('error');
      }
    };

    sendData();
  }, [results, disablePush]);

  return (
    <div className="bg-white border-4 border-charcoal p-6 md:p-10 shadow-diy max-w-2xl mx-auto text-center animate-window-pop">
      
      {status === 'sending' && (
        <div className="py-10">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <h2 className="text-xl font-bold text-charcoal">{t.rs_sending}</h2>
        </div>
      )}

      {status === 'success' && (
        <div className="py-10">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-black mb-4 uppercase text-jade">{t.rs_title}</h2>
          <p className="text-slate-600 mb-8 font-medium text-lg leading-relaxed">
            {t.rs_text}
          </p>

          <div className="bg-slate-50 border-2 border-slate-200 p-6 mt-8 text-left">
            <h3 className="font-bold text-charcoal mb-2">{t.rs_contact}</h3>
            <p className="text-slate-600 text-sm mb-4">
              {t.rs_contact_text}
            </p>
            <a href="mailto:rudolfs.spridis@student.htw-berlin.de" className="font-bold text-blue-600 hover:underline">
              rudolfs.spridis@student.htw-berlin.de
            </a>
          </div>
          
          {disablePush && (
            <div className="mt-8 bg-black p-4 text-left rounded overflow-auto max-h-64 border border-green-500">
              <h3 className="text-green-400 font-bold text-xs mb-2 uppercase">{t.rs_debug_title}</h3>
              <p className="text-green-600 text-xs mb-4">{t.rs_debug_text}</p>
              <pre className="text-green-400 text-xs font-mono">{JSON.stringify(results, null, 2)}</pre>
            </div>
          )}
        </div>
      )}

      {status === 'error' && (
        <div className="py-10 text-left">
          <div className="text-6xl mb-6 text-center">❌</div>
          <h2 className="text-2xl font-black mb-4 uppercase text-red-600 text-center">{t.rs_error_title}</h2>
          <p className="text-slate-600 mb-6 text-center">
            {t.rs_error_text}
          </p>
          <div className="bg-red-50 p-4 border-2 border-red-200 text-red-800 text-xs font-mono mb-6 break-words">
            {errorMsg}
          </div>
          <p className="text-sm font-bold text-slate-700 mb-2">{t.rs_error_copy}</p>
          <textarea 
            readOnly 
            value={JSON.stringify(results, null, 2)} 
            className="w-full h-40 p-2 border-2 border-slate-300 text-xs font-mono bg-slate-50"
          />
        </div>
      )}
    </div>
  );
}