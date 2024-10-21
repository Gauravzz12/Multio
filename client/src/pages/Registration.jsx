import React, { useState } from "react";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";


const Register = () => {
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX=/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  const [passMatch,setPassMatch]=useState(true);
  
  return (
    <div className="Container h-screen w-screen flex justify-center items-center relative">
      <div className="absolute h-screen w-screen brightness-[0.3] bg-[url('../src/assets/images/Auth/Authbg.png')] bg-no-repeat bg-center bg-cover"></div>

      <main
        className="register-form w-fit h-fit bg-[#30303059]/65 backdrop-blur-lg rounded-xl flex flex-col p-6 gap-1 border-[#4C4C4C40] border-2"
        aria-label="Register Form"
      >
        {/* Header Section */}
        <header className="heading flex items-center justify-start mb-3 font-mono">
          <img
            src="../src/assets/images/Auth/Logo.png"
            className="w-16 bg-contain"
            alt="Multio Logo"
          />
          <h1 className="text-white ml-2 text-3xl font-semibold tracking-wider font-Outfit">
            MULTIO
          </h1>
        </header>

        <section aria-labelledby="create-profile" className="text-section">
          <h2 id="create-profile" className="text-white ml-2 text-[26px] font-normal">
            Create Your Gaming Profile
          </h2>
          <p className="text-white ml-2 text-sm font-normal">
            Sign up to unlock multiplayer fun!
          </p>
        </section>

        <section className="inputs flex flex-col gap-4 ml-4 mt-4 mr-6" aria-labelledby="inputs">
          {/* Username Input */}
          <div className="relative rounded-lg bg-gradient-to-tr from-[#D0517E80]/20 to-[#5612E180]/20 p-[0.8px] shadow-lg">
            <label
              htmlFor="username"
              className="sr-only"
            >
              Username
            </label>
            <div className="input-field w-[340px] flex items-center bg-[#212121] rounded-lg p-[12px]">
              <AiOutlineUser className="text-white mr-2" />
              <input
                id="username"
                className="bg-transparent text-white placeholder:text-white placeholder:text-sm w-full h-full focus:outline-none"
                placeholder="Username"
                aria-label="Username"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="relative rounded-lg bg-gradient-to-tr from-[#D0517E80]/20 to-[#5612E180]/20 p-[0.8px] shadow-lg">
            <label
              htmlFor="email"
              className="sr-only"
            >
              Email
            </label>
            <div className="input-field flex items-center bg-[#212121] rounded-lg p-[12px]">
              <AiOutlineMail className="text-white mr-2" />
              <input
                id="email"
                type="email"
                className="bg-transparent text-white placeholder:text-white placeholder:text-sm w-full focus:outline-none"
                placeholder="Email"
                aria-label="Email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative rounded-lg bg-gradient-to-tr from-[#D0517E80]/20 to-[#5612E180]/20 p-[0.8px] shadow-lg">
            <label
              htmlFor="password"
              className="sr-only"
            >
              Password
            </label>
            <div className="input-field flex items-center bg-[#212121] rounded-lg p-[12px]">
              <AiOutlineLock className="text-white mr-2" />
              <input
                id="password"
                type="password"
                className="bg-transparent text-white placeholder:text-white placeholder:text-sm w-full focus:outline-none"
                placeholder="Password"
                aria-label="Password"
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="relative rounded-lg bg-gradient-to-tr from-[#D0517E80]/20 to-[#5612E180]/20 p-[0.8px] shadow-lg">
            <label
              htmlFor="confirm-password"
              className="sr-only"
            >
              Confirm Password
            </label>
            <div className="input-field flex items-center bg-[#212121] rounded-lg p-[12px]">
              <AiOutlineLock className="text-white mr-2" />
              <input
                id="confirm-password"
                type="password"
                className="bg-transparent text-white placeholder:text-white placeholder:text-sm w-full focus:outline-none"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="py-2 px-6 bg-gradient-to-r from-[#D0517E] to-[#5612E1] text-base border-none text-white"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
            }}
            aria-label="Sign up"
          >
            SIGN UP
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 justify-center">
            <hr className="w-full bg-[#484848] h-[2px] border-none" />
            <span className="text-[#484848]">Or</span>
            <hr className="w-full bg-[#484848] h-[2px] border-none" />
          </div>

          {/* Social Login */}
          <section className="methods flex justify-center gap-2 -mt-2 items-center">
            <button aria-label="Sign in with Google">
              <FcGoogle className="text-4xl cursor-pointer" />
            </button>
            <button aria-label="Sign in with GitHub">
              <AiOutlineGithub className="text-4xl cursor-pointer text-white" />
            </button>
          </section>

        </section>
      </main>
    </div>
  );
};

export default Register;
