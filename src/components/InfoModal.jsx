export default function InfoModal({ isOpen, onClose, debugMode, setDebugMode }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm">
      <div className="bg-white border-4 border-charcoal p-8 max-w-md w-full shadow-[8px_8px_0px_0px_rgba(77,80,87,1)] animate-window-pop">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">MenuMaze</h2>
          <button onClick={onClose} className="text-2xl font-black hover:text-jade">✕</button>
        </div>

        {/* Info Text */}
        <div className="space-y-4 mb-8 text-sm border-l-4 border-jade pl-4 py-2">
          <p className="font-bold">Erstellt von Rudolfs Spridis</p>
          <p>Im Rahmen seiner Bachelorarbeit im SoSe 2026</p>
          <p className="uppercase tracking-widest text-[10px] text-slate-500">
            Internationale Medieninformatik - FB4
          </p>
        </div>

        {/* Debug Option */}
        <div className="bg-dust border-2 border-charcoal p-4 mb-6">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div className="relative">
              <input 
                type="checkbox" 
                checked={debugMode}
                onChange={(e) => setDebugMode(e.target.checked)}
                className="sr-only" 
              />
              <div className={`w-10 h-6 border-2 border-charcoal transition-colors ${debugMode ? 'bg-jade' : 'bg-white'}`}>
                <div className={`absolute top-1 left-1 w-2 h-2 border-2 border-charcoal bg-charcoal transition-transform ${debugMode ? 'translate-x-4' : ''}`}></div>
              </div>
            </div>
            <span className="font-black text-xs uppercase tracking-tight">Debug optionen aktivieren</span>
          </label>
        </div>

        {/* Footer Button */}
        <button 
          onClick={onClose}
          className="w-full bg-charcoal text-white p-3 font-bold uppercase hover:bg-jade transition-colors shadow-[4px_4px_0px_0px_rgba(207,207,207,1)] active:translate-y-1 active:shadow-none"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}