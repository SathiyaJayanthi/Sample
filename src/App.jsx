import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-green-700 text-white p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-semibold">FarmConnect</h1>
          <p className="mt-2 text-green-100">Shared contract scaffold for the platform.</p>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Frontend</h2>
            <p className="mt-2 text-sm text-slate-600">React + Vite + Tailwind entry point is ready.</p>
          </section>
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Backend</h2>
            <p className="mt-2 text-sm text-slate-600">Express server and module routes are wired for auth, farmer, consumer, admin, and payments.</p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
