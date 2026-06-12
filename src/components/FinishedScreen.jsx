export default function FinishedScreen({ t }) {
  return (
    <div className="bg-white border-4 border-charcoal p-6 md:p-10 shadow-diy max-w-2xl mx-auto text-center animate-window-pop">
      <div className="py-10">
        <div className="text-6xl mb-6">!!!</div>
        <h2 className="text-3xl font-black mb-4 uppercase text-charcoal">{t.fs_title}</h2>
        <p className="text-slate-600 mb-8 font-medium text-lg leading-relaxed">
          {t.fs_text}
        </p>

        <div className="bg-slate-50 border-2 border-slate-200 p-6 mt-8 text-left">
          <p className="text-slate-600 text-sm mb-4 font-bold">
            {t.fs_contact}
          </p>
          <a href="mailto:rudolfs.spridis@student.htw-berlin.de" className="font-bold text-blue-600 hover:underline break-all">
            rudolfs.spridis@student.htw-berlin.de
          </a>
        </div>
      </div>
    </div>
  );
}