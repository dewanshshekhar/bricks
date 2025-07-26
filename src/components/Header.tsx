import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
  const [isPropertiesDropdownOpen, setIsPropertiesDropdownOpen] = useState(false);
  const [isAgentsDropdownOpen, setIsAgentsDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Refs for dropdown containers
  const propertiesRef = useRef<HTMLDivElement>(null);
  const agentsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Timeout refs for delayed closing
  const propertiesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const agentsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const aboutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect with improved detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to handle mouse enter with immediate opening
  const handleMouseEnter = (dropdown: 'properties' | 'agents' | 'about') => {
    // Clear any existing timeout for this dropdown
    switch (dropdown) {
      case 'properties':
        if (propertiesTimeoutRef.current) {
          clearTimeout(propertiesTimeoutRef.current);
          propertiesTimeoutRef.current = null;
        }
        setIsPropertiesDropdownOpen(true);
        break;
      case 'agents':
        if (agentsTimeoutRef.current) {
          clearTimeout(agentsTimeoutRef.current);
          agentsTimeoutRef.current = null;
        }
        setIsAgentsDropdownOpen(true);
        break;
      case 'about':
        if (aboutTimeoutRef.current) {
          clearTimeout(aboutTimeoutRef.current);
          aboutTimeoutRef.current = null;
        }
        setIsAboutDropdownOpen(true);
        break;
    }
  };

  // Helper function to handle mouse leave with delayed closing
  const handleMouseLeave = (dropdown: 'properties' | 'agents' | 'about') => {
    switch (dropdown) {
      case 'properties':
        propertiesTimeoutRef.current = setTimeout(() => {
          setIsPropertiesDropdownOpen(false);
        }, 200);
        break;
      case 'agents':
        agentsTimeoutRef.current = setTimeout(() => {
          setIsAgentsDropdownOpen(false);
        }, 200);
        break;
      case 'about':
        aboutTimeoutRef.current = setTimeout(() => {
          setIsAboutDropdownOpen(false);
        }, 200);
        break;
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (propertiesTimeoutRef.current) clearTimeout(propertiesTimeoutRef.current);
      if (agentsTimeoutRef.current) clearTimeout(agentsTimeoutRef.current);
      if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-200/60' 
            : 'bg-white/90 backdrop-blur-lg shadow-md border-b border-gray-200/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${
            isScrolled ? 'py-2 md:py-3' : 'py-3 md:py-4'
          }`}>
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <img 
                  src="/logo.PNG" 
                  alt="Brick Broker" 
                  className={`w-auto max-w-[110px] sm:max-w-[120px] md:max-w-none transition-all duration-300 group-hover:scale-105 ${
                    isScrolled ? 'h-7 sm:h-8 md:h-9' : 'h-8 sm:h-9 md:h-10'
                  }`}
                />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-gray-200 hover:border-[#BC8664] hover:bg-[#BC8664]/5 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {isMobileMenuOpen ? (
                <X size={20} className="text-[#484848]" />
              ) : (
                <Menu size={20} className="text-[#484848]" />
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className={`hidden md:flex space-x-6 lg:space-x-8 transition-all duration-300 ${
              isScrolled ? 'text-sm' : 'text-sm md:text-base'
            }`}>
              <Link 
                to="/" 
                className={`transition-all duration-200 whitespace-nowrap font-medium hover:scale-105 ${
                  isActive('/') ? 'text-[#BC8664]' : 'text-gray-700 hover:text-[#BC8664]'
                }`}
              >
                Home
              </Link>
              
              <div 
                ref={propertiesRef}
                className="relative group"
                onMouseEnter={() => handleMouseEnter('properties')}
                onMouseLeave={() => handleMouseLeave('properties')}
              >
                <Link 
                  to="/properties" 
                  className={`transition-all duration-200 flex items-center gap-1 whitespace-nowrap font-medium hover:scale-105 ${
                    isActive('/properties') ? 'text-[#BC8664]' : 'text-gray-700 hover:text-[#BC8664]'
                  }`}
                >
                  Properties
                  <div className="p-0.5 md:p-1 border border-gray-200 rounded-lg hover:border-[#BC8664] hover:shadow-sm hover:bg-[#BC8664]/5 transition-all duration-200">
                    <ChevronDown size={12} className={`md:w-4 md:h-4 transition-transform duration-200 ${isPropertiesDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </Link>
                
                {/* Extended hover area - invisible bridge */}
                <div className="absolute top-full left-0 w-full h-2 bg-transparent" />
                
                {isPropertiesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 z-50 animate-fadeIn"
                    style={{
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(188, 134, 100, 0.1)'
                    }}
                  >
                    <Link 
                      to="/properties" 
                      className="block px-4 py-3 text-gray-700 hover:text-[#BC8664] hover:bg-[#BC8664]/5 transition-all duration-200 font-medium"
                    >
                      All Properties
                    </Link>
                    <Link 
                      to="/properties/for-sale" 
                      className="block px-4 py-3 text-gray-700 hover:text-[#BC8664] hover:bg-[#BC8664]/5 transition-all duration-200 font-medium"
                    >
                      For Sale
                    </Link>
                    <Link 
                      to="/properties/for-rent" 
                      className="block px-4 py-3 text-gray-700 hover:text-[#BC8664] hover:bg-[#BC8664]/5 transition-all duration-200 font-medium"
                    >
                      For Rent
                    </Link>
                    <Link 
                      to="/properties/featured" 
                      className="block px-4 py-3 text-gray-700 hover:text-[#BC8664] hover:bg-[#BC8664]/5 transition-all duration-200 font-medium"
                    >
                      Featured Properties
                    </Link>
                  </div>
                )}
              </div>

              <div 
                ref={agentsRef}
                className="relative group"
                onMouseEnter={() => handleMouseEnter('agents')}
                onMouseLeave={() => handleMouseLeave('agents')}
              >
                <Link 
                  to="/agents" 
                  className={`transition-all duration-200 flex items-center gap-1 whitespace-nowrap font-medium hover:scale-105 ${
                    isActive('/agents') ? 'text-[#BC8664]' : 'text-gray-700 hover:text-[#BC8664]'
                  }`}
                >
                  Agents
                  <div className="p-0.5 md:p-1 border border-gray-200 rounded-lg hover:border-[#BC8664] hover:shadow-sm hover:bg-[#BC8664]/5 transition-all duration-200">
                    <ChevronDown size={12} className={`md:w-4 md:h-4 transition-transform duration-200 ${isAgentsDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </Link>
                
                {/* Extended hover area - invisible bridge */}
                <div className="absolute top-full left-0 w-full h-2 bg-transparent" />
                
                {isAgentsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 z-50 animate-fadeIn"
                    style={{
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(188, 134, 100, 0.1)'
                    }}
                  >
                    <Link 
                      to="/agents/all" 
                      className="block px-4 py-3 text-gray-700 hover:text-[#BC8664] hover:bg-[#BC8664]/5 transition-all duration-200 font-medium"
                    >
                      All Agents
                    </Link>
                    <Link 
                      to="/agents/top-rated" 
                      className="block px-4 py-3 text-gray-700 hover:text-[#BC8664] hover:bg-[#BC8664]/5 transition-all duration-200 font-medium"
                    >
                      Top Rated Agents
                    </Link>
                  </div>
                )}
              </div>

              <div 
                ref={aboutRef}
                className="relative group"
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={() => handleMouseLeave('about')}
              >
                <Link 
                  to="/about" 
                  className={`transition-all duration-200 flex items-center gap-1 whitespace-nowrap font-medium hover:scale-105 ${
                    isActive('/about') ? 'text-[#BC8664]' : 'text-gray-700 hover:text-[#BC8664]'
                  }`}
                >
                  About
                  <div className="p-0.5 md:p-1 border border-gray-200 rounded-lg hover:border-[#BC8664] hover:shadow-sm hover:bg-[#BC8664]/5 transition-all duration-200">
                    <ChevronDown size={12} className={`md:w-4 md:h-4 transition-transform duration-200 ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </Link>
                
                {/* Extended hover area - invisible bridge */}
                <div className="absolute top-full left-0 w-full h-2 bg-transparent" />
                
                {isAboutDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 z-50 animate-fadeIn"
                    style={{
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(188, 134, 100, 0.1)'
                    }}
                  >
                    <Link 
                      to="/about/our-story" 
                      className="block px-4 py-3 text-gray-700 hover:text-[#BC8664] hover:bg-[#BC8664]/5 transition-all duration-200 font-medium"
                    >
                      Our Story
                    </Link>
                    <Link 
                      to="/about/why-choose-us" 
                      className="block px-4 py-3 text-gray-700 hover:text-[#BC8664] hover:bg-[#BC8664]/5 transition-all duration-200 font-medium"
                    >
                      Why Choose Us
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                to="/contact" 
                className={`transition-all duration-200 whitespace-nowrap font-medium hover:scale-105 ${
                  isActive('/contact') ? 'text-[#BC8664]' : 'text-gray-700 hover:text-[#BC8664]'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Profile */}
            <div className="hidden md:flex items-center">
              <Link 
                to="/signin"
                className={`flex items-center space-x-2 text-gray-600 hover:text-[#BC8664] transition-all duration-200 hover:scale-105 ${
                  isScrolled ? 'text-xs' : 'text-xs md:text-sm'
                }`}
              >
                <div className="p-1.5 md:p-2 border border-gray-200 rounded-lg hover:border-[#BC8664] hover:shadow-sm hover:bg-[#BC8664]/5 transition-all duration-200">
                  <User size={14} className="md:w-4 md:h-4" />
                </div>
                <span className="hidden sm:inline font-medium">Profile</span>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200/60 bg-white/96 backdrop-blur-xl">
              <div className="py-4 space-y-1 max-h-[70vh] overflow-y-auto">
                <Link 
                  to="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-base font-medium transition-all duration-200 min-h-[44px] flex items-center ${
                    isActive('/') ? 'text-[#BC8664] bg-[#BC8664]/8' : 'text-gray-700 hover:text-[#BC8664] hover:bg-[#BC8664]/5'
                  }`}
                >
                  Home
                </Link>
                
                {/* Properties Mobile Menu */}
                <div>
                  <Link 
                    to="/properties" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-medium transition-all duration-200 min-h-[44px] flex items-center ${
                      isActive('/properties') ? 'text-[#BC8664] bg-[#BC8664]/8' : 'text-gray-700 hover:text-[#BC8664] hover:bg-[#BC8664]/5'
                    }`}
                  >
                    Properties
                  </Link>
                  <div className="pl-6 space-y-1">
                    <Link 
                      to="/properties/for-sale" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-[#BC8664] hover:bg-[#BC8664]/5 transition-all duration-200 min-h-[44px] flex items-center"
                    >
                      For Sale
                    </Link>
                    <Link 
                      to="/properties/for-rent" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-[#BC8664] hover:bg-[#BC8664]/5 transition-all duration-200 min-h-[44px] flex items-center"
                    >
                      For Rent
                    </Link>
                    <Link 
                      to="/properties/featured" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-[#BC8664] hover:bg-[#BC8664]/5 transition-all duration-200 min-h-[44px] flex items-center"
                    >
                      Featured Properties
                    </Link>
                  </div>
                </div>

                {/* Agents Mobile Menu */}
                <div>
                  <Link 
                    to="/agents" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-medium transition-all duration-200 min-h-[44px] flex items-center ${
                      isActive('/agents') ? 'text-[#BC8664] bg-[#BC8664]/8' : 'text-gray-700 hover:text-[#BC8664] hover:bg-[#BC8664]/5'
                    }`}
                  >
                    Agents
                  </Link>
                  <div className="pl-6 space-y-1">
                    <Link 
                      to="/agents/all" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-[#BC8664] hover:bg-[#BC8664]/5 transition-all duration-200 min-h-[44px] flex items-center"
                    >
                      All Agents
                    </Link>
                    <Link 
                      to="/agents/top-rated" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-[#BC8664] hover:bg-[#BC8664]/5 transition-all duration-200 min-h-[44px] flex items-center"
                    >
                      Top Rated Agents
                    </Link>
                  </div>
                </div>

                {/* About Mobile Menu */}
                <div>
                  <Link 
                    to="/about" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-medium transition-all duration-200 min-h-[44px] flex items-center ${
                      isActive('/about') ? 'text-[#BC8664] bg-[#BC8664]/8' : 'text-gray-700 hover:text-[#BC8664] hover:bg-[#BC8664]/5'
                    }`}
                  >
                    About
                  </Link>
                  <div className="pl-6 space-y-1">
                    <Link 
                      to="/about/our-story" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-[#BC8664] hover:bg-[#BC8664]/5 transition-all duration-200 min-h-[44px] flex items-center"
                    >
                      Our Story
                    </Link>
                    <Link 
                      to="/about/why-choose-us" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-[#BC8664] hover:bg-[#BC8664]/5 transition-all duration-200 min-h-[44px] flex items-center"
                    >
                      Why Choose Us
                    </Link>
                  </div>
                </div>

                <Link 
                  to="/contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-base font-medium transition-all duration-200 min-h-[44px] flex items-center ${
                    isActive('/contact') ? 'text-[#BC8664] bg-[#BC8664]/8' : 'text-gray-700 hover:text-[#BC8664] hover:bg-[#BC8664]/5'
                  }`}
                >
                  Contact
                </Link>

                {/* Mobile Profile */}
                <div className="border-t border-gray-200/60 pt-4 mt-4">
                  <Link 
                    to="/signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-600 hover:text-[#BC8664] hover:bg-[#BC8664]/5 transition-all duration-200 min-h-[44px]"
                  >
                    <div className="p-2 border border-gray-200 rounded-lg mr-3 hover:border-[#BC8664] hover:bg-[#BC8664]/5 transition-all duration-200">
                      <User size={16} />
                    </div>
                    Sign In / Profile
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

      </header>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-16 sm:h-18 md:h-20"></div>
    </>
  );
};

export default Header;