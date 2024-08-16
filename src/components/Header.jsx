import React from 'react';
function Header() {
  return (
    <div className='header p-3 m-0 radius-20 bg-[#151515] text-white flex items-center justify-center '>
      
      <nav className='navbar p-3 relative z-30 text-2xl w-full flex justify-between items-center rounded-full bg-transparent '>
        <div className="title italic font-extrabold text-4xl font-mono mx-3 text-[#59c5a6] ">
          Multio
        </div>
        <div className='pages  flex gap-20 justify-end w-full'>
          <a href='/'>Home</a>
          <a href='/Games'>Games</a>
          <a href='/Profile'>Profile</a>
        </div>
      </nav>
    </div>
  );
}

export default Header;
