function App(): React.JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white">
          Electron API Tester
        </h1>

        <p className="mt-2 text-slate-400">
          Electron + React + TypeScript + Tailwind
        </p>

        <button className="mt-6 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500">
          Test Button
        </button>
      </div>
    </div>
  )
}

export default App