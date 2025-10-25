import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookMarked, LogIn, LogOut, UserPlus, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-50/60 backdrop-blur-lg border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-xl font-bold text-slate-800 hover:text-slate-950 transition-colors"
          >
            <BookMarked className="w-7 h-7 text-blue-600" />
            <span className="hidden sm:block">Personal Library Tracker</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3 sm:gap-4 text-sm font-semibold">
            {token ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-700 hover:text-slate-950 px-3 py-2 rounded-lg transition-colors duration-300"
                >
                  Login
                </Link>
                <motion.Link
                  to="/signup"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
                  title="Signup"
                >
                  <UserPlus className="w-4 h-4" />
                  Signup
                </motion.Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden mt-2 bg-white rounded-lg shadow-md py-2 flex flex-col gap-2 px-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {token ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </motion.button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-slate-700 hover:text-slate-950 px-3 py-2 rounded-lg transition-colors duration-300"
                  >
                    Login
                  </Link>
                  <motion.Link
                    to="/signup"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
                  >
                    <UserPlus className="w-4 h-4" />
                    Signup
                  </motion.Link>
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
