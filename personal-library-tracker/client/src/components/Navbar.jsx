import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-2 flex justify-between">
      <Link to="/" className="font-bold">📚 Library Tracker</Link>
      <div className="space-x-4">
        {token ? (
          <button onClick={logout} className="bg-white text-blue-600 px-3 py-1 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
