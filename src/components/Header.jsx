import React, { useState } from "react";
function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn);

  return (
    <div className="header top-0 p-3 m-0 radius-20 bg-gradient-to-r from-[#020530] to-[#13063e] text-white flex items-center justify-center w-full ">
      <nav className="navbar p-3 text-2xl w-full flex justify-between items-center rounded-full bg-transparent ">
        <div className="title italic font-extrabold text-4xl mx-3 text-[#f508ff] font-reggae-one">
          Multio
        </div>
        <div className="pages flex gap-20 justify-end w-full font-bold">
          <button onClick={() => (window.location.href = "/")} class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            Home
          </button>
          <button onClick={() => (window.location.href = "/Games")} class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            Games
          </button>
          {loggedIn ? (
          <button onClick={() => (window.location.href = "/")} class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
           Login
          </button>
          ) : (
            <button onClick={() => (window.location.href = "/")} class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            Profile
          </button>
          )}

         
        </div>
      </nav>
    </div>
  );
}

export default Header;
