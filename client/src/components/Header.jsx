import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import Loader from "./Loader";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await logout().unwrap();
      dispatch(logOut());
      navigate("/Login");
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const navItems = [
    { text: "Home", onClick: () => handleNavigation("/") },
    { text: "Games", onClick: () => handleNavigation("/Games") },
    ...(currentUser && currentUser !== "Guest"
      ? [
          { text: "Profile", onClick: () => handleNavigation("/Profile") },
          { text: "Logout", onClick: handleLogOut },
        ]
      : [{ text: "Login", onClick: () => handleNavigation("/Login") }]),
  ];

  return (
    <>
      {isLoading && <Loader />}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#020530] to-[#13063e] text-white ">
        <nav className="container mx-auto p-3 ">
          <div className="flex justify-between items-center relative mx-8">
            <h1 className="title italic font-extrabold text-3xl md:text-4xl text-[#f508ff] font-reggae-one cursor-pointer" onClick={()=>navigate('/Home')}>
              Multio
            </h1>

            <button
              className="md:hidden text-white text-2xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div
              className={`${
                isOpen ? "flex" : "hidden"
              } md:flex flex-col md:flex-row absolute md:relative 
              top-full right-0 md:right-auto w-48 md:w-auto
              bg-[#020530] md:bg-transparent mt-2 md:mt-0 p-4 md:p-0 
              space-y-4 md:space-y-0 md:space-x-6 rounded-lg md:rounded-none
              shadow-lg md:shadow-none z-50`}
            >
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="md:w-auto px-6 py-2 rounded-full
                  bg-gradient-to-r from-purple-500 to-pink-500 
                  hover:from-purple-600 hover:to-pink-600
                  transform hover:scale-105 transition duration-300
                  text-white font-semibold shadow-lg
                  max-w-[200px] mx-auto w-full md:max-w-none"
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
