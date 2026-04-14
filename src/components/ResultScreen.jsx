export default function ResultScreen({ results }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Ergebnisse (Für Datenbank)</h2>
        <p className="text-gray-600 mb-4">
          Diese Daten würden nun an Supabase gesendet werden.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(results, null, 2)}
        </pre>
      </div>
    </div>
  )
}