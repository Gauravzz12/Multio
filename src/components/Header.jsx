import React ,{useState} from 'react';
function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn);
  
  return (
    <div className='header p-3 m-0 radius-20 bg-black text-white flex items-center justify-center w-full  '>
      
      <nav className='navbar p-3 relative z-30 text-2xl w-full flex justify-between items-center rounded-full bg-transparent '>
        <div className="title italic font-extrabold text-4xl mx-3 text-[#7f5cd2] font-reggae-one">
          Multio
        </div>
        <div className='pages  flex gap-20 justify-end w-full font-bold'>
          <a href='/'>Home</a>
          <a href='/Games'>Games</a>
          {loggedIn?<a href='/Profile'>Profile</a>:<a href='/Login'>Sign In</a>}
          
        </div>
      </nav>
    </div>
  );
}

export default Header;
