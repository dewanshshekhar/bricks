import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Users,
  LogOut,
  Menu,
  X,
  User,
  Bell,
  Settings,
  ChevronDown,
  Shield,
  FileText,
  Building
} from 'lucide-react';
import { AuthService } from '../../services/authService';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check admin access on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const role = localStorage.getItem('userRole');
    if (!token || role !== 'admin') {
      navigate('/signin');
    }
  }, [navigate]);

  const sidebarItems = [
    {
      name: 'Analytics Dashboard',
      path: '/admin/analytics',
      icon: BarChart3
    },
    {
      name: 'Requests Management',
      path: '/admin/requests',
      icon: FileText
    },
    {
      name: 'Property Management',
      path: '/admin/property-management',
      icon: Building
    },
    {
      name: 'Agent Approvals',
      path: '/admin/pending-agents',
      icon: Users
    }
  ];

  const handleLogout = () => {
    AuthService.clearAuthData();
    alert('Logged out successfully');
    navigate('/admin/login');
  };

  const isActive = (path: string) => location.pathname === path;

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsProfileDropdownOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F8F3] via-[#FEFDFB] to-[#F5F4EF] relative overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 sm:w-72 lg:w-64 bg-white/95 backdrop-blur-xl border-r border-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img 
              src="/logo.PNG" 
              alt="Brick Broker" 
              className="h-6 sm:h-8 w-auto"
            />
            <div className="flex items-center gap-2">
              <div className="p-1 bg-[#BC8664]/10 rounded-lg border border-[#BC8664]/20">
                <Shield size={14} className="text-[#BC8664]" />
              </div>
              <span className="font-bold text-[#484848] text-base sm:text-lg">Admin Panel</span>
            </div>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X size={20} className="text-[#7A7A7A]" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 sm:p-6 space-y-1 sm:space-y-2 flex-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-3 rounded-xl transition-all duration-200 group min-h-[44px] ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-[#BC8664] to-[#A0734F] text-white shadow-lg'
                    : 'text-[#7A7A7A] hover:text-[#484848] hover:bg-gray-100'
                }`}
              >
                <div className={`p-1.5 sm:p-2 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-white/20 border border-white/30'
                    : 'bg-gray-100 border border-gray-200 group-hover:bg-[#BC8664]/10 group-hover:border-[#BC8664]/20'
                }`}>
                  <Icon size={16} className={`sm:w-[18px] sm:h-[18px] ${isActive(item.path) ? 'text-white' : 'text-[#BC8664]'}`} />
                </div>
                <span className="font-medium text-sm sm:text-base truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-200 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-3 text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-xl transition-all duration-200 group min-h-[44px] shadow-lg hover:shadow-xl"
          >
            <div className="p-1.5 sm:p-2 bg-red-100 border border-red-200 rounded-lg group-hover:bg-red-200 transition-colors">
              <LogOut size={16} className="sm:w-[18px] sm:h-[18px] text-red-600" />
            </div>
            <span className="font-medium text-sm sm:text-base">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Menu size={20} className="sm:w-6 sm:h-6 text-[#7A7A7A]" />
            </button>

            {/* Breadcrumb */}
            <div className="hidden sm:block">
              <nav className="flex items-center space-x-2 text-sm">
                <Link to="/admin/analytics" className="text-[#BC8664] hover:text-[#A0734F] transition-colors font-medium">
                  Admin
                </Link>
                <span className="text-[#7A7A7A]">/</span>
                <span className="text-[#484848] font-medium capitalize">
                  {location.pathname.split('/').pop()?.replace('-', ' ')}
                </span>
              </nav>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-[#BC8664]/10 hover:border-[#BC8664]/20 border border-transparent transition-all min-h-[44px] min-w-[44px] flex items-center justify-center">
                <Bell size={18} className="sm:w-5 sm:h-5 text-[#7A7A7A]" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileDropdownOpen(!isProfileDropdownOpen);
                  }}
                  className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-[#BC8664]/10 hover:border-[#BC8664]/20 border border-transparent transition-all min-h-[44px]"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#BC8664] to-[#A0734F] rounded-full flex items-center justify-center shadow-lg">
                    <User size={14} className="sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-[#484848]">Admin User</p>
                    <p className="text-xs text-[#7A7A7A] truncate">{localStorage.getItem('userEmail') || 'admin@brickbroker.in'}</p>
                  </div>
                  <ChevronDown size={14} className={`sm:w-4 sm:h-4 text-[#7A7A7A] transition-transform ${
                    isProfileDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-[#484848]">Admin User</p>
                      <p className="text-xs text-[#7A7A7A] truncate">admin@brickbroker.in</p>
                    </div>
                    <button className="flex items-center gap-3 w-full px-4 py-2 text-left text-[#7A7A7A] hover:text-[#484848] hover:bg-gray-50 transition-colors min-h-[44px]">
                      <Settings size={16} />
                      <span className="text-sm">Settings</span>
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 text-left text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 transition-all min-h-[44px]"
                    >
                      <LogOut size={16} />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-6">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;