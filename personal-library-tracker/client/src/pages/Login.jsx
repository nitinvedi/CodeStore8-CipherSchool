import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const [form, setForm] = useState({ usernameOrEmail: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.usernameOrEmail || !form.password) {
      setError('Both fields are required');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid username/email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-50">
      <motion.div
        className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Login
        </h2>

        <AnimatePresence>
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-600 text-sm mb-4 text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username / Email */}
          <input
            name="usernameOrEmail"
            placeholder="Username or Email"
            value={form.usernameOrEmail}
            onChange={(e) =>
              setForm({ ...form, usernameOrEmail: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />

          {/* Password with toggle */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Login Button */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>

        {/* Links */}
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          {/* <Link to="/forgot-password" className="hover:underline">
            Forgot Password?
          </Link> */}
          <Link to="/signup" className="hover:underline">
            Don’t have an account? Sign up
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
