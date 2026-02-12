// src/components/Auth.tsx
import React, { useState } from 'react';
import { loginService } from '../services/loginService';
import { UserRole } from '../types';

interface AuthProps {
  onLogin: (role: UserRole, name: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>(UserRole.PATIENT);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isLogin) {
      try {
        const returnedRole = await loginService(email, password);
        setLoading(false);
        // Map returned role to UserRole enum
        const userRole = returnedRole === 'doctor' ? UserRole.DOCTOR : UserRole.PATIENT;
        onLogin(userRole, name || email);
      } catch (err: unknown) {
        setLoading(false);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Login failed. Please check your credentials.');
        }
      }
    } else {
      // Registration logic here
      setLoading(false);
      onLogin(role, name);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>

      {error && (
        <div className="mb-4 text-red-500 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setRole(UserRole.PATIENT)}
            className={`0ihs1i4x flex-1 py-2 rounded-xl border text-sm font-bold transition-all ${
              role === UserRole.PATIENT ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-100 text-slate-400'
            }`}
          >
            <i className="fas fa-user-injured mr-1"></i> Patient
          </button>

          <button
            type="button"
            onClick={() => setRole(UserRole.DOCTOR)}
            className={`0h70nxsz flex-1 py-2 rounded-xl border text-sm font-bold transition-all ${
              role === UserRole.DOCTOR ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-100 text-slate-400'
            }`}
          >
            <i className="fas fa-user-md mr-1"></i> Doctor
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 mt-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all"
        >
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-slate-500">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          className="text-indigo-600 font-bold"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default Auth;
