import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './modules/auth';
import ProtectedRoute from './modules/auth/components/ProtectedRoute';
import LoginPage from './modules/auth/pages/LoginPage';
import SignupPage from './modules/auth/pages/SignupPage';
import './index.css';
import FarmerDashboard from './modules/farmer/FarmerDashboard';
import {
  CartProvider,
  ConsumerBrowsePage,
  ConsumerCartPage,
  ConsumerCheckoutPage,
  ConsumerOrdersPage,
  ConsumerProductPage,
  ConsumerReviewPage,
} from './modules/consumer';
import {
  AdminDashboardPage,
  AdminOrdersPage,
  AdminVerificationPage,
} from './modules/admin';

function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Welcome, {user?.name || 'farmer'}!</h1>
            <p className="mt-2 text-sm text-slate-600">Your authentication context is live and ready for downstream modules.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/browse"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Browse produce
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          <p><span className="font-medium text-slate-800">Email:</span> {user?.email}</p>
          <p className="mt-2"><span className="font-medium text-slate-800">Role:</span> {user?.role}</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<ConsumerBrowsePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/farmer" element={<FarmerDashboard />} />
              <Route path="/products/:id" element={<ConsumerProductPage />} />
              <Route path="/cart" element={<ConsumerCartPage />} />
              <Route path="/checkout" element={<ConsumerCheckoutPage />} />
              <Route path="/orders" element={<ConsumerOrdersPage />} />
              <Route path="/reviews/:id" element={<ConsumerReviewPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/verification" element={<AdminVerificationPage />} />
              <Route path="/admin/orders" element={<AdminOrdersPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
