export default function BrowserWindow({ children, url }) {
  return (
    // Breiterer Rahmen (max-w-7xl) und Skalierung
    <div className="w-full max-w-7xl mx-auto animate-window-pop text-base">
      <div className="border-4 border-charcoal bg-white shadow-diy overflow-hidden flex flex-col">
        <div className="bg-white border-b-4 border-charcoal p-4 flex items-center gap-4">
          <div className="flex gap-2 shrink-0">
            <div className="w-4 h-4 rounded-full border-2 border-charcoal bg-[#ff5f56]"></div>
            <div className="w-4 h-4 rounded-full border-2 border-charcoal bg-[#ffbd2e]"></div>
            <div className="w-4 h-4 rounded-full border-2 border-charcoal bg-[#27c93f]"></div>
          </div>
          
          <div className="flex-1 bg-dust border-2 border-charcoal px-4 py-2 flex items-center gap-2 overflow-hidden">
            <span className="text-charcoal/40">🔒</span>
            <span className="text-sm text-charcoal/80 truncate font-mono">
              https://{url}
            </span>
          </div>
        </div>

        {/* Deutlich höhere Mindesthöhe (800px) */}
        <div className="bg-white min-h-[800px] overflow-auto relative">
          {children}
        </div>
      </div>
    </div>
  );
}