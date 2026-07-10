import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await signup({ name, email, password, role, phone, location: { address, lat: 0, lng: 0 } });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Unable to create account');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-800">Create account</h1>
        <p className="mt-2 text-sm text-slate-600">Join as a farmer or consumer.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-2 rounded-lg border border-slate-200 p-1">
            {['farmer', 'consumer'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setRole(option)}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${role === option ? 'bg-green-700 text-white' : 'text-slate-600'}`}
              >
                {option === 'farmer' ? 'Farmer' : 'Consumer'}
              </button>
            ))}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
            <input value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-green-600" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-green-600" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-green-600" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
            <input value={phone} onChange={(event) => setPhone(event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-green-600" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Address</label>
            <input value={address} onChange={(event) => setAddress(event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-green-600" />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button type="submit" className="w-full rounded-lg bg-green-700 px-4 py-2 font-medium text-white hover:bg-green-800">
            Create account
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Already have an account? <Link to="/login" className="font-medium text-green-700">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
