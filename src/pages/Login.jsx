import React from "react";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineGithub,
} from "react-icons/ai";
import { PiEyeClosedBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate=useNavigate();
  return (
    <div className="Container h-screen w-screen flex justify-center items-center relative">
      <div className=" absolute  h-screen w-screen brightness-[0.3] bg-[url('../src/assets/images/Auth/Authbg.png')] bg-no-repeat bg-center   "></div>
      <form className="Login   w-fit h-fit  bg-[#30303059]/65 backdrop-blur-lg  rounded-xl flex flex-col p-6 gap-1 border-[#4C4C4C40] border-2">
        <div className="Heading flex items-center justify-start mb-12 font-mono ">
          <img
            src="../src/assets/images/Auth/Logo.png"
            className="w-16 bg-contain"
            alt="Logo"
          />
          <p className="Text text-white ml-2 text-3xl font-semibold tracking-wider font-Outfit">
            MULTIO
          </p>
        </div>
        <p className="Text text-white ml-2 text-[26px] font-normal">
          Login & Enter the Arena!
        </p>
        <p className="Text text-white ml-2 text-sm font-normal ">
        Glad you're back.!  
        </p>

        <div className="Inputs flex flex-col gap-4 ml-4 mt-4 mr-6">
          <div className="relative rounded-lg bg-gradient-to-tr from-[#D0517E80]/20 to-[#5612E180]/20 p-[0.8px] shadow-lg">
            <div className="InputField w-[320px] flex items-center bg-[#212121] rounded-lg p-[12px]">
              <AiOutlineMail className="text-white mr-2" />
              <input
                className="Email bg-transparent text-white placeholder:text-white placeholder:text-sm w-full focus:outline-none"
                placeholder="Username/Email"
              />
            </div>
          </div>
          <div className="relative rounded-lg bg-gradient-to-tr from-[#D0517E80]/20 to-[#5612E180]/20 p-[0.8px] shadow-lg">
            <div className="InputField flex items-center bg-[#212121] rounded-lg p-[12px]">
              <AiOutlineLock className="text-white mr-2" />
              <input
                className="Password bg-transparent text-white placeholder:text-white placeholder:text-sm w-full focus:outline-none"
                type="password"
                placeholder="Password"
              />
              <button className="">
              <PiEyeClosedBold className="text-white size-5"/>
              </button>
            </div>
          </div>
          <div className="flex gap-3 ml-1">

          <input type="checkbox"></input><p className="text-white">Remember Me</p>
          </div>

          <button
            className="py-2 px-6 bg-gradient-to-r from-[#D0517E] to-[#5612E1] text-base border-none text-white"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
            }}
          >
            LOGIN
          </button>
          <div className="flex  items-center gap-4 justify-center">
            <hr className="w-full bg-[#484848] h-[2px] border-none"></hr>
            <span className="text-[#484848]">Or</span>
            <hr className="w-full bg-[#484848] h-[2px] border-none"></hr>
          </div>
          <div className="Methods flex justify-center gap-2 -mt-2 items-center">
            <FcGoogle className="text-white text-4xl cursor-pointer" />
            <AiOutlineGithub className="text-white text-4xl cursor-pointer" />
          </div>
          <div className="flex justify-center items-center"> 
            <p className="text-white text-sm">Don't have an account ? <span className="text-[#D0517E] cursor-pointer" onClick={() => navigate('/Register')}> Signup</span></p>
          </div>
          <div className="relative rounded-lg bg-gradient-to-tr from-[#D0517E80] to-[#5612E180] p-[0.8px] shadow-lg">
            <button className="h-full w-full bg-gradient-to-b from-[#393838]/100 from-20% to-[#3a3939]/80 to-100% text-white text-sm rounded-lg py-2 px-6 text-center">
              Continue as a Guest
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
