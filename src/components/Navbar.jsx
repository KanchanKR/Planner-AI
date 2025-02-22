/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DarkModeToggle from './DarkModeToggle';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 dark:bg-blue-800 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-white">Planner-AI</span>
        </Link>

        {/* Nav Links */}
        <div className="flex space-x-6">
          <Link
            to="/"
            className="text-white hover:text-blue-200 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/planner"
            className="text-white hover:text-blue-200 transition-colors duration-200"
          >
            Lesson Planner
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-blue-200 transition-colors duration-200"
          >
            About
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button className="bg-blue-500 hover:bg-blue-700 text-white">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;