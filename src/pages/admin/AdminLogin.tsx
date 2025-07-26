import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Shield, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/analytics');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      // For demo purposes, simulate login
      if (formData.email === 'admin@example.com' && formData.password === 'admin123') {
        localStorage.setItem('adminToken', 'demo-jwt-token');
        navigate('/admin/analytics');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#F9F8F3] via-[#FEFDFB] to-[#F5F4EF]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(188, 134, 100, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(188, 134, 100, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(188, 134, 100, 0.04) 0%, transparent 50%)
          `,
          backgroundSize: '400px 400px, 300px 300px, 500px 500px'
        }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-br from-[#BC8664]/10 to-[#A0734F]/5 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-blue-500/8 to-blue-600/4 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute bottom-16 sm:bottom-32 left-1/4 w-24 sm:w-40 h-24 sm:h-40 bg-gradient-to-br from-purple-500/6 to-purple-600/3 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-sm sm:max-w-md w-full space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center animate-fadeIn">
            <Link to="/" className="mb-6 sm:mb-8 inline-block group">
              <img 
                src="/logo.PNG" 
                alt="Brick Broker" 
                className="h-10 sm:h-12 w-auto mx-auto transition-all duration-500 group-hover:scale-110 drop-shadow-lg"
              />
            </Link>
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 bg-[#BC8664]/10 rounded-xl sm:rounded-2xl border border-[#BC8664]/20">
                <Shield size={20} className="sm:w-6 sm:h-6 text-[#BC8664]" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#484848]">
                Admin Portal
              </h1>
            </div>
            <p className="text-base sm:text-lg text-[#7A7A7A] leading-relaxed px-2">
              Secure access to Brick Broker management system
            </p>
          </div>

          {/* Login Card */}
          <div className="relative animate-slideUp">
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/60 p-6 sm:p-8 md:p-10 overflow-hidden">
              {/* Card Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/80 to-white/70 rounded-2xl sm:rounded-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-xl sm:text-2xl font-bold text-[#484848] mb-6 sm:mb-8 text-center">
                  Administrator Login
                </h2>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 animate-shake">
                    <AlertCircle size={18} className="sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-semibold text-[#484848] mb-2 sm:mb-3">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 border border-gray-200/50 rounded-lg bg-gray-50/50 backdrop-blur-sm">
                        <Mail size={16} className="sm:w-[18px] sm:h-[18px] text-[#7A7A7A]" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 sm:pl-16 pr-3 sm:pr-4 py-3 sm:py-4 border-2 border-gray-200/50 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-[#BC8664]/20 focus:border-[#BC8664] transition-all duration-300 bg-white/60 backdrop-blur-sm hover:border-gray-300/70 text-base sm:text-lg"
                        placeholder="admin@example.com"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-sm font-semibold text-[#484848] mb-2 sm:mb-3">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 border border-gray-200/50 rounded-lg bg-gray-50/50 backdrop-blur-sm">
                        <Lock size={16} className="sm:w-[18px] sm:h-[18px] text-[#7A7A7A]" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 sm:pl-16 pr-12 sm:pr-16 py-3 sm:py-4 border-2 border-gray-200/50 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-[#BC8664]/20 focus:border-[#BC8664] transition-all duration-300 bg-white/60 backdrop-blur-sm hover:border-gray-300/70 text-base sm:text-lg"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 border border-gray-200/50 rounded-lg hover:border-[#BC8664]/30 transition-all duration-300 bg-gray-50/50 hover:bg-gray-100/50 backdrop-blur-sm"
                      >
                        {showPassword ? (
                          <EyeOff size={16} className="sm:w-[18px] sm:h-[18px] text-[#7A7A7A]" />
                        ) : (
                          <Eye size={16} className="sm:w-[18px] sm:h-[18px] text-[#7A7A7A]" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 sm:h-5 sm:w-5 text-[#BC8664] focus:ring-[#BC8664]/20 border-gray-300 rounded transition-colors"
                      />
                      <label htmlFor="remember-me" className="ml-2 sm:ml-3 block text-sm text-[#7A7A7A] font-medium">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a href="#" className="font-semibold text-[#BC8664] hover:text-[#A0734F] transition-colors">
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#BC8664] to-[#A0734F] hover:from-[#A0734F] hover:to-[#8B5E3C] disabled:from-gray-400 disabled:to-gray-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:scale-95 text-base sm:text-lg relative overflow-hidden group min-h-[44px] sm:min-h-[56px]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                        <span className="relative z-10">Signing In...</span>
                      </>
                    ) : (
                      <>
                        <div className="p-1.5 sm:p-2 border border-white/30 rounded-lg bg-white/10 relative z-10">
                          <Shield size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <span className="relative z-10">Sign In to Admin Panel</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Demo Credentials */}
                <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-[#BC8664]/5 border border-[#BC8664]/20 rounded-xl sm:rounded-2xl">
                  <p className="text-sm text-[#7A7A7A] text-center mb-2 font-medium">Demo Credentials:</p>
                  <div className="space-y-1 text-xs text-[#666] text-center leading-relaxed">
                    <p>admin@brickbroker.in | admin123</p>
                    <p>admin@example.com | admin123</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center animate-fadeIn">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 sm:gap-3 text-[#BC8664] hover:text-[#A0734F] transition-all duration-300 font-semibold group relative min-h-[44px] px-4 py-2 rounded-lg"
            >
              <div className="p-1.5 sm:p-2 rounded-lg border border-[#BC8664]/20 group-hover:border-[#BC8664]/40 group-hover:bg-[#BC8664]/5 transition-all duration-300">
                <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
              </div>
              <span className="relative text-sm sm:text-base">
                ← Back to Website
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#BC8664] transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminLogin;