import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Search, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
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

          {/* Search Bar */}
          <div className="hidden md:flex items-center max-w-md flex-1 mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search hackathons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
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
            
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            
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
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                    >
                      <Link to={`/dashboard/${user?.role}`}>
                        <motion.button
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          whileHover={{ x: 5 }}
                        >
                          Dashboard
                        </motion.button>
                      </Link>
                      <motion.button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center"
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
                <motion.button 
                  onClick={() => setShowAuthMenu(!showAuthMenu)}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
                <AnimatePresence>
                  {showAuthMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                    >
                      <Link to="/user/login">
                        <motion.button
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          whileHover={{ x: 5 }}
                        >
                          User Login
                        </motion.button>
                      </Link>
                      <Link to="/organizer/login">
                        <motion.button
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          whileHover={{ x: 5 }}
                        >
                          Organizer Login
                        </motion.button>
                      </Link>
                      <Link to="/admin/login">
                        <motion.button
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
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
              className="md:hidden py-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search hackathons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
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