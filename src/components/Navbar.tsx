import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();
  const authMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close auth menu when authentication state changes
    setShowAuthMenu(false);
  }, [isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showAuthMenu && authMenuRef.current && !authMenuRef.current.contains(event.target as Node)) {
        setShowAuthMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAuthMenu]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/15 backdrop-blur-xl shadow-lg border-b border-white/20' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                HackHub
              </span>
            </motion.div>
          </Link>

          {/* Search Bar with glassmorphism */}
          <div className="hidden md:flex items-center max-w-md flex-1 mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search hackathons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder-gray-400 text-gray-800"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/hackathons">
              <motion.span 
                className="text-gray-600 hover:text-indigo-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hackathons
              </motion.span>
            </Link>
            <Link to="/teams">
              <motion.span 
                className="text-gray-600 hover:text-indigo-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Teams
              </motion.span>
            </Link>
            <Link to="/mentors">
              <motion.span 
                className="text-gray-600 hover:text-indigo-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mentors
              </motion.span>
            </Link>
            <Link to="/projects">
              <motion.span 
                className="text-gray-600 hover:text-indigo-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Projects
              </motion.span>
            </Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <motion.button 
                  onClick={() => setShowAuthMenu(!showAuthMenu)}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {user?.name}
                </motion.button>
                <AnimatePresence>
                  {showAuthMenu && (
                    <motion.div
                      ref={authMenuRef}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white/20 backdrop-blur-xl rounded-lg shadow-lg py-2 border border-white/30"
                    >
                      <Link to={`/dashboard/${user?.role}`} onClick={() => setShowAuthMenu(false)}>
                        <motion.button
                          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-white/30 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          Dashboard
                        </motion.button>
                      </Link>
                      <motion.button
                        onClick={(e) => {
                          handleLogout();
                          setShowAuthMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-white/30 transition-colors flex items-center"
                        whileHover={{ x: 5 }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="relative">
                {/* Enhanced Sign In Button */}
                <motion.button 
                  onClick={() => setShowAuthMenu(!showAuthMenu)}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all backdrop-blur-sm border border-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
                <AnimatePresence>
                  {showAuthMenu && (
                    <motion.div
                      ref={authMenuRef}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white/20 backdrop-blur-xl rounded-lg shadow-lg py-2 border border-white/30"
                    >
                      <Link to="/user/login" onClick={() => setShowAuthMenu(false)}>
                        <motion.button
                          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-white/30 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          User Login
                        </motion.button>
                      </Link>
                      <Link to="/organizer/login" onClick={() => setShowAuthMenu(false)}>
                        <motion.button
                          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-white/30 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          Organizer Login
                        </motion.button>
                      </Link>
                      <Link to="/admin/login" onClick={() => setShowAuthMenu(false)}>
                        <motion.button
                          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-white/30 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          Admin Login
                        </motion.button>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden py-4 bg-white/15 backdrop-blur-xl rounded-b-2xl shadow-lg mt-2 border-t border-white/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4 px-2">
                <input
                  type="text"
                  placeholder="Search hackathons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-full bg-white/25 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder-gray-500 text-gray-800"
                />
              </div>
              
              <Link to="/hackathons">
                <motion.div 
                  className="block py-2 text-gray-600 hover:text-indigo-600 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  Hackathons
                </motion.div>
              </Link>
              <Link to="/teams">
                <motion.div 
                  className="block py-2 text-gray-600 hover:text-indigo-600 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  Teams
                </motion.div>
              </Link>
              <Link to="/mentors">
                <motion.div 
                  className="block py-2 text-gray-600 hover:text-indigo-600 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  Mentors
                </motion.div>
              </Link>
              <Link to="/projects">
                <motion.div 
                  className="block py-2 text-gray-600 hover:text-indigo-600 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  Projects
                </motion.div>
              </Link>

              {isAuthenticated ? (
                <>
                  <Link to={`/dashboard/${user?.role}`}>
                    <motion.div 
                      className="block py-2 text-gray-600 hover:text-indigo-600 transition-colors"
                      whileHover={{ x: 10 }}
                    >
                      Dashboard
                    </motion.div>
                  </Link>
                  <motion.button 
                    onClick={handleLogout}
                    className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <Link to="/user/login">
                    <motion.button 
                      className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      User Login
                    </motion.button>
                  </Link>
                  <Link to="/organizer/login">
                    <motion.button 
                      className="w-full mt-2 px-4 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Organizer Login
                    </motion.button>
                  </Link>
                  <Link to="/admin/login">
                    <motion.button 
                      className="w-full mt-2 px-4 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Admin Login
                    </motion.button>
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;