import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaHome, FaGamepad, FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { logOut } from "../features/auth/authSlice";
import Logo from '../assets/images/Auth/Logo.png'
import Loader from './Loader'

function Header() {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogOut = async () => {
    try {
      await logout().unwrap();
      dispatch(logOut());
      navigate("/Login");
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  const navItems = [
    { path: "/Home", label: "Home", icon: FaHome },
    { path: "/Games", label: "Games", icon: FaGamepad },
    { path: "/Profile", label: "Profile", icon: FaUserCircle },
  ];

  return (
    <>
      {isLoading && <Loader />}
      <nav className="glass backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/Home" className="flex items-center group">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                MULTIO
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActiveRoute(item.path)
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center gap-3 glass backdrop-blur-xl border border-white/20 rounded-xl px-4 py-2">
                <FaUser className="text-purple-400 w-4 h-4" />
                <span className="text-white font-medium">{currentUser}</span>
              </div>
              
              <button
                onClick={handleLogOut}
                disabled={isLoading}
                className="group flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <FaSignOutAlt className="w-4 h-4 group-hover:animate-bounce" />
                <span>{isLoading ? "Logging out..." : "Logout"}</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="glass backdrop-blur-xl border border-white/20 text-white hover:text-purple-400 p-2 rounded-xl transition-colors duration-300"
              >
                {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden glass backdrop-blur-xl border-t border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                      isActiveRoute(item.path)
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              <div className="border-t border-white/20 my-3"></div>
              
              <div className="flex items-center gap-3 px-4 py-3 text-white">
                <FaUser className="text-purple-400 w-5 h-5" />
                <span className="font-medium">{currentUser}</span>
              </div>
              
              <button
                onClick={handleLogOut}
                disabled={isLoading}
                className="w-full group flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium px-4 py-3 rounded-xl transition-all duration-300"
              >
                <FaSignOutAlt className="w-5 h-5 group-hover:animate-bounce" />
                <span>{isLoading ? "Logging out..." : "Logout"}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Header;
