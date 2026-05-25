export default function BrowserWindow({ children, url, animate = true }) {
  // Strikte Trennung: Die Klasse wird nur geladen, wenn animate wirklich true ist.
  const animationClass = animate ? 'animate-window-pop' : '';

  return (
    <div className={`bg-white border-4 border-charcoal rounded-t-lg shadow-diy max-w-5xl mx-auto overflow-hidden ${animationClass}`}>
      
      {/* Browser Bar */}
      <div className="bg-slate-200 border-b-4 border-charcoal p-3 flex items-center gap-4">
        {/* Fake Buttons */}
        <div className="flex gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-charcoal bg-red-400"></div>
          <div className="w-4 h-4 rounded-full border-2 border-charcoal bg-yellow-400"></div>
          <div className="w-4 h-4 rounded-full border-2 border-charcoal bg-green-400"></div>
        </div>
        
        {/* Fake URL Bar */}
        <div className="flex-1 bg-white border-2 border-charcoal rounded-full px-4 py-1 flex items-center justify-center relative">
          <div className="absolute left-4 text-slate-400">🔒</div>
          <span className="font-mono text-sm font-bold text-slate-700 tracking-tight truncate px-8">
            {url}
          </span>
        </div>
        
        {/* Fake Menu */}
        <div className="w-8 h-8 border-2 border-charcoal rounded flex flex-col items-center justify-center gap-1 bg-white">
          <div className="w-4 h-0.5 bg-charcoal"></div>
          <div className="w-4 h-0.5 bg-charcoal"></div>
          <div className="w-4 h-0.5 bg-charcoal"></div>
        </div>
      </div>

      {/* Page Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}