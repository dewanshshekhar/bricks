
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn: React.FC = () => {
  const [isApiMode, setIsApiMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Buyer' | 'Agent' | 'Company' | 'Admin'>('Buyer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleMode = () => setIsApiMode(!isApiMode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isApiMode) {
      console.log(`[DEMO MODE] Logging in as ${role}`);
      navigate(`/${role.toLowerCase()}/demo`);
      return;
    }

    try {
      const response = await fetch('https://brickbroker-backends-production.up.railway.app/api/v1.0/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || 'Login failed');

      // Save token in localStorage
      const tokenKey = role === 'Admin' ? 'adminToken' : 'userToken';
      localStorage.setItem(tokenKey, result.token);
      localStorage.setItem('userRole', role.toLowerCase());
      localStorage.setItem('userEmail', email);

      // Redirect
      navigate(`/${role.toLowerCase()}/dashboard`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white text-center">
      <h2 className="text-4xl font-bold text-[#484848] mb-2">Sign In</h2>

      {/* Mode Toggle */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className={`text-sm ${!isApiMode ? 'text-[#BC8664]' : 'text-[#7A7A7A]'}`}>Demo Mode</span>
        <button onClick={toggleMode} className={`relative w-12 h-6 rounded-full ${isApiMode ? 'bg-[#BC8664]' : 'bg-gray-300'}`}>
          <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${isApiMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
        </button>
        <span className={`text-sm ${isApiMode ? 'text-[#BC8664]' : 'text-[#7A7A7A]'}`}>API Mode</span>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow max-w-md w-full mt-2 animate-fadeIn">
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          className="w-full p-2 border mb-4 rounded"
        >
          <option value="Buyer">Buyer</option>
          <option value="Agent">Agent</option>
          <option value="Company">Company</option>
          <option value="Admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-[#BC8664] text-white py-2 rounded hover:bg-opacity-90 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
