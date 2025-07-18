import { Link, useNavigate } from 'react-router-dom';
import { BookMarked, LogIn, LogOut, UserPlus } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-900/10 bg-slate-50/70 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-xl font-bold text-slate-800 hover:text-slate-950 transition-colors"
          >
            <BookMarked className="w-7 h-7 text-blue-600" />
            <span className="hidden sm:block">Personal Library Tracker</span>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4 text-sm font-semibold">
            {token ? (
              // Logout Button
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <>
                {/* Login Link */}
                <Link
                  to="/login"
                  className="text-slate-700 hover:text-slate-950 px-3 py-2 rounded-lg transition-colors duration-300"
                >
                  Login
                </Link>
                {/* Signup Button */}
                <Link
                  to="/signup"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  <UserPlus className="w-4 h-4" />
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;