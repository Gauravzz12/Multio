import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import Logo from '../assets/images/Auth/Logo.png'
import { useLogoutMutation } from '../features/auth/authApiSlice'
import { logOut, selectCurrentUser } from '../features/auth/authSlice'
import Loader from './Loader'

function Header() {
  const currentUser = useSelector(selectCurrentUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [logout, { isLoading }] = useLogoutMutation()
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const handleLogOut = async () => {
    try {
      await logout().unwrap()
      dispatch(logOut())
      navigate('/Login')
      setIsOpen(false)
    } catch (error) {
      console.error('Failed to log out:', error)
    }
  }

  const isActiveRoute = (route) => {
    return location.pathname === route
  }

  return (
    <>
      {isLoading && <Loader />}
      <header className='sticky top-0 z-50 text-white bg-black'>
        <nav className='p-3 mx-auto Container'>
          <div className='relative flex items-center justify-between mx-8 sm:text-sm ss:text-xs'>
            <div className='flex items-center'>
              <h1
                className='flex items-center justify-center text-3xl text-white cursor-pointer font-Outfit md:text-2xl title'
                onClick={() => navigate('/Home')}>
                <picture>
                  <img src={Logo} alt='logo' className='inline-block w-16 h-10 md:w-12 md:h-8' />
                </picture>
                MULTIO
              </h1>
              <div className='hidden ml-20 tracking-wider ss:flex'>
                <button
                  onClick={() => navigate('/')}
                  className={`md:w-auto px-6 py-2 rounded-full bg-black transform hover:scale-105 transition duration-300 text-white font-semibold shadow-lg font-Outfit tex-xl relative
                    ${isActiveRoute('/Home') ? 'after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-2/3 after:h-[3px] after:bg-gradient-to-r after:from-[#D0517E] after:to-[#5612E1]' : ''}`}>
                  HOME
                </button>
                <button
                  onClick={() => navigate('/Games')}
                  className={`md:w-auto px-6 py-2 rounded-full bg-black transform hover:scale-105 transition duration-300 text-white font-semibold shadow-lg font-Outfit tex-xl relative
                    ${isActiveRoute('/Games') ? 'after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-2/3 after:h-[3px] after:bg-gradient-to-r after:from-[#D0517E] after:to-[#5612E1]' : ''}`}>
                  GAMES
                </button>
                {currentUser && currentUser !== 'Guest' && (
                  <button
                    onClick={() => navigate('/Profile')}
                    className={`md:w-auto px-6 py-2 rounded-full bg-black transform hover:scale-105 transition duration-300 text-white font-semibold shadow-lg font-Outfit tex-xl relative
                      ${isActiveRoute('/Profile') ? 'after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-2/3 after:h-[3px] after:bg-gradient-to-r after:from-[#D0517E] after:to-[#5612E1]' : ''}`}>
                    PROFILE
                  </button>
                )}
              </div>
            </div>

            <div className='flex items-center mr-6'>
              <div className='hidden space-x-4 ss:flex'>
                {currentUser && currentUser !== 'Guest' ? (
                  <button
                    onClick={handleLogOut}
                    className="relative bg-black px-6 py-2 text-base text-white transform transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      clipPath: "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
                      background: 'linear-gradient(to right, #D0517E, #5612E1)',
                      padding: '2px',
                    }}>
                    <span className="block w-full h-full px-6 py-2 bg-black"
                      style={{
                        clipPath: "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
                      }}>
                      LOGOUT
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/Login')}
                    className="relative bg-black px-6 py-2 text-base text-white transform transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      clipPath: "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
                      background: 'linear-gradient(to right, #D0517E, #5612E1)',
                      padding: '2px',
                    }}>
                    <span className="block w-full h-full px-6 py-2 bg-black"
                      style={{
                        clipPath: "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
                      }}>
                      LOGIN
                    </span>
                  </button>
                )}
              </div>
              <button
                className='text-2xl text-white ss:hidden'
                onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
            <div
              className={`${isOpen ? 'flex' : 'hidden'} ss:hidden flex-col absolute top-full right-0 w-48 bg-black mt-2 p-4 space-y-4 rounded-lg shadow-lg z-50`}>
              <button
                onClick={() => {
                  navigate('/')
                  setIsOpen(false)
                }}
                className="relative bg-black px-6 py-2 border-none text-base text-white transform transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
                  background: 'linear-gradient(to right, #D0517E, #5612E1)',
                  padding: '2px',
                }}>
                <span className="block w-full h-full px-6 py-2 bg-black"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
                  }}>
                  HOME
                </span>
              </button>
              <button
                onClick={() => {
                  navigate('/Games')
                  setIsOpen(false)
                }}
                className="relative bg-black px-6 py-2 border-none text-base text-white transform transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
                  background: 'linear-gradient(to right, #D0517E, #5612E1)',
                  padding: '2px',
                }}>
                <span className="block w-full h-full px-6 py-2 bg-black"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
                  }}>
                  GAMES
                </span>
              </button>
              {currentUser && currentUser !== 'Guest' && (
                <button
                  onClick={() => {
                    navigate('/Profile')
                    setIsOpen(false)
                  }}
                  className="relative bg-black px-6 py-2 border-none text-base text-white transform transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
                    background: 'linear-gradient(to right, #D0517E, #5612E1)',
                    padding: '2px',
                  }}>
                  <span className="block w-full h-full px-6 py-2 bg-black"
                    style={{
                      clipPath: "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
                    }}>
                    PROFILE
                  </span>
                </button>
              )}
              {currentUser && currentUser !== 'Guest' ? (
                <button
                  onClick={() => {
                    handleLogOut()
                    setIsOpen(false)
                  }}
                  className="relative bg-black px-6 py-2 border-none text-base text-white transform transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
                    background: 'linear-gradient(to right, #D0517E, #5612E1)',
                    padding: '2px',
                  }}>
                  <span className="block w-full h-full px-6 py-2 bg-black"
                    style={{
                      clipPath: "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
                    }}>
                    LOGOUT
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate('/Login')
                    setIsOpen(false)
                  }}
                  className="relative bg-black px-6 py-2 border-none text-base text-white transform transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
                    background: 'linear-gradient(to right, #D0517E, #5612E1)',
                    padding: '2px',
                  }}>
                  <span className="block w-full h-full px-6 py-2 bg-black"
                    style={{
                      clipPath: "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
                    }}>
                    LOGIN
                  </span>
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
