import './index.css';
import FarmerDashboard from './modules/farmer/FarmerDashboard';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-green-700 text-white p-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">FarmConnect</h1>
            <p className="mt-2 text-green-100">Shared contract scaffold for the platform.</p>
          </div>
          <a href="#farmer" className="rounded-full border border-white/40 px-4 py-2 text-sm font-medium">
            Farmer module
          </a>
        </div>
      </header>
      <main id="farmer" className="mx-auto max-w-7xl p-4 md:p-6">
        <FarmerDashboard />
      </main>
    </div>
  );
}

export default App;
