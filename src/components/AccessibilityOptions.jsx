export default function AccessibilityOptions({ t, onToggleContrast, onToggleFontSize, contrast, largeFont }) {
  return (
    <div className="flex gap-2">
      <button 
        onClick={onToggleContrast} 
        className={`px-3 py-1 text-sm border-2 border-charcoal font-bold ${contrast ? 'bg-jade text-white' : 'bg-white'}`}
        title="Kontrast erhöhen"
      >
        K
      </button>
      <button 
        onClick={onToggleFontSize} 
        className={`px-3 py-1 text-sm border-2 border-charcoal font-bold ${largeFont ? 'bg-jade text-white' : 'bg-white'}`}
        title="Schriftgröße"
      >
        A+
      </button>
    </div>
  );
}