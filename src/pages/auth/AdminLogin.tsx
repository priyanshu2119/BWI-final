import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { Shield, Lock, User, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, you would validate credentials with a backend
      login({
        id: '3',
        email,
        role: 'admin',
        name: 'Admin User',
      });
      navigate('/dashboard/admin');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-[400px] -left-[300px] w-[800px] h-[800px] rounded-full bg-red-500"></div>
        <div className="absolute -bottom-[400px] -right-[300px] w-[800px] h-[800px] rounded-full bg-orange-500"></div>
        <div className="absolute top-[10%] right-[20%] w-[200px] h-[200px] rounded-full bg-yellow-500"></div>
        <div className="absolute bottom-[30%] left-[15%] w-[300px] h-[300px] rounded-full bg-red-600"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mx-auto h-20 w-20 rounded-full bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center shadow-lg"
          >
            <Shield className="h-10 w-10 text-white" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center text-3xl font-extrabold text-white"
          >
            Admin Portal
          </motion.h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Secure access to the administrator dashboard
          </p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white backdrop-blur-xl bg-opacity-10 rounded-2xl p-6 shadow-xl border border-white border-opacity-20"
        >
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-500 bg-opacity-20 border border-red-500 border-opacity-40 rounded-lg p-3 mb-4 flex items-center text-white"
            >
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-200 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 border-opacity-30 bg-white bg-opacity-10 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-150"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 border-opacity-30 bg-white bg-opacity-10 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-150"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 accent-red-600 bg-white bg-opacity-10 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-red-300 hover:text-red-200">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Access Admin Dashboard"
                )}
              </motion.button>
            </div>
          </form>
          
          <div className="mt-6">
            <p className="text-center text-xs text-gray-400">
              Protected area. Unauthorized access is prohibited and may be subject to legal action.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;