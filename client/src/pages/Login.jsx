import React, { useState, useCallback } from "react";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineGithub,
} from "react-icons/ai";
import { PiEyeClosedBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { PiEyeBold } from "react-icons/pi";

const Login = React.memo(() => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(true);
  const toggleShowPass = useCallback((e) => {
    e.preventDefault();
    setShowPass((prevShowPass) => !prevShowPass);
  }, []);

  return (
    <div className="Container h-screen w-screen flex justify-center items-center relative">
      <div className=" inset-0 absolute bg-center h-screen w-screen brightness-[0.3] bg-[url('../src/assets/images/Auth/Authbg.png')] bg-no-repeat bg-cover "></div>
    
      <form
        className="login-form w-fit h-fit bg-[#30303059]/65 backdrop-blur-lg rounded-xl flex flex-col p-6 gap-1 border-[#4C4C4C40] border-2 bg-center"
        aria-label="Login Form"
      >
        {/* Header Section */}
        <header className="heading flex items-center justify-start mb-12 font-mono">
          <img
            src="../src/assets/images/Auth/Logo.png"
            className="w-16 bg-contain"
            alt="Multio Logo"
          />
          <h1 className="text-white ml-2 text-3xl font-semibold tracking-wider font-Outfit">
            MULTIO
          </h1>
        </header>

        {/* Login Information Section */}
        <section aria-labelledby="login-heading" className="text-section">
          <h2 id="login-heading" className="text-white ml-2 text-[26px] font-normal tracking-wider">
            Login & Enter the Arena!
          </h2>
          <p className="text-white ml-2 text-base font-normal tracking-wide">
            Glad you're back!
          </p>
        </section>

        {/* Input Section */}
        <section className="inputs flex flex-col gap-4 ml-4 mt-4 mr-6" aria-labelledby="inputs-section">
          {/* Username/Email Input */}
          <div className="relative rounded-lg bg-gradient-to-tr from-[#D0517E80]/20 to-[#5612E180]/20 p-[0.8px] shadow-lg">
            <label htmlFor="username-email" className="sr-only">Username or Email</label>
            <div className="input-field w-[320px] flex items-center bg-[#212121] rounded-lg p-[12px]">
              <AiOutlineMail className="text-white mr-2" />
              <input
                id="username-email"
                className="bg-transparent text-white placeholder:text-white placeholder:text-sm w-full focus:outline-none"
                placeholder="Username/Email"
                aria-label="Username or Email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative rounded-lg bg-gradient-to-tr from-[#D0517E80]/20 to-[#5612E180]/20 p-[0.8px] shadow-lg">
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="input-field flex items-center bg-[#212121] rounded-lg p-[12px]">
              <AiOutlineLock className="text-white mr-2" />
              <input
                id="password"
                className="bg-transparent text-white placeholder:text-white placeholder:text-sm w-full focus:outline-none"
                type={showPass ? "password" : "text"}
                placeholder="Password"
                aria-label="Password"
              />
              <button aria-label="Toggle Password Visibility" onClick={toggleShowPass}>
                {showPass ? <PiEyeClosedBold className="text-white size-5" /> : <PiEyeBold className="text-white size-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex gap-3 ml-1 items-center">
            <input type="checkbox" id="remember-me" aria-label="Remember Me" />
            <label htmlFor="remember-me" className="text-white">Remember Me</label>
          </div>

          {/* Login Button */}
          <button
            className="py-2 px-6 bg-gradient-to-r from-[#D0517E] to-[#5612E1] text-base border-none text-white"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
            }}
            aria-label="Login"
          >
            LOGIN
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 justify-center">
            <hr className="w-full bg-[#484848] h-[2px] border-none" />
            <span className="text-[#484848]">Or</span>
            <hr className="w-full bg-[#484848] h-[2px] border-none" />
          </div>

          {/* Social Login Section */}
          <section className="methods flex justify-center gap-2 -mt-2 items-center">
            <button aria-label="Login with Google">
              <FcGoogle className="text-4xl cursor-pointer" />
            </button>
            <button aria-label="Login with GitHub">
              <AiOutlineGithub className="text-white text-4xl cursor-pointer" />
            </button>
          </section>

          {/* Sign Up Redirect */}
          <div className="flex justify-center items-center">
            <p className="text-white text-sm">
              Don't have an account?{" "}
              <span
                className="text-[#D0517E] cursor-pointer"
                onClick={() => navigate("/Register")}
              >
                Sign up
              </span>
            </p>
          </div>

          {/* Guest Login */}
          <div className="relative rounded-lg bg-gradient-to-tr from-[#D0517E80] to-[#5612E180] p-[0.8px] shadow-lg">
            <button className="h-full w-full bg-gradient-to-b from-[#393838]/100 to-[#3a3939]/80 text-white text-sm rounded-lg py-2 px-6 text-center font-semibold tracking-wide" aria-label="Continue as guest">
              Continue as a Guest
            </button>
          </div>
        </section>
      </form>
    </div>
  );
});

export default Login;
