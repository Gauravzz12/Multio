import React, { useEffect, useState } from "react";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineGithub,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
const Register = () => {
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    pwd: "",
  });
  const [confirmPwd, setConfirmPwd] = useState("");
  const [isPwdSame, setIsPwdSame] = useState(true);

  useEffect(() => {
    setIsPwdSame(comparePwd());
  }, [confirmPwd, formData.pwd]);

  const comparePwd = () => confirmPwd === formData.pwd;

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePwd = (e) => setConfirmPwd(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !USER_REGEX.test(formData.userName) ||
      !EMAIL_REGEX.test(formData.email) ||
      !PWD_REGEX.test(formData.pwd)
    ) {
      toast.error("Please enter valid data");
    } else {
      toast.success("Form Submitted Successfully");
    }
  };

  return (
    <div className="Container h-screen w-screen flex justify-center items-center relative">
      <div className="absolute h-screen w-screen brightness-[0.3] bg-[url('../src/assets/images/Auth/Authbg.png')] bg-no-repeat bg-center bg-cover"></div>

      <main
        className="register-form w-fit h-fit bg-[#30303059]/65 backdrop-blur-lg rounded-xl flex flex-col p-6 gap-1 border-[#4C4C4C40] border-2"
        aria-label="Register Form"
      >
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

        <form
          className="inputs flex flex-col gap-4 ml-4 mt-4 mr-6"
          aria-labelledby="inputs"
          onSubmit={handleSubmit}
        >
          <div className="relative rounded-lg bg-gradient-to-tr from-[#D0517E80]/20 to-[#5612E180]/20 p-[0.8px] shadow-lg">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <div className="input-field w-[300px] flex items-center bg-[#212121] rounded-lg p-[12px] relative">
              <AiOutlineUser className="text-white mr-2" />
              <input
                id="username"
                className="bg-transparent text-white placeholder:text-white placeholder:text-sm w-full h-full focus:outline-none"
                placeholder="Username"
                aria-label="Username"
                name="userName"
                required
                onChange={handleInput}
              />
              <div className="group relative ml-2">
                <AiOutlineInfoCircle className="text-gray-400 cursor-pointer" />
                <div className="absolute w-64 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-8 -left-40">
                  Username must be 4-24 characters long, start with a letter,
                  and can include letters, numbers, hyphens, and underscores.
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-lg bg-gradient-to-tr from-[#D0517E80]/20 to-[#5612E180]/20 p-[0.8px] shadow-lg">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="input-field flex items-center bg-[#212121] rounded-lg p-[12px] relative">
              <AiOutlineMail className="text-white mr-2" />
              <input
                id="email"
                type="email"
                className="bg-transparent text-white placeholder:text-white placeholder:text-sm w-full focus:outline-none"
                placeholder="Email"
                aria-label="Email"
                name="email"
                required
                onChange={handleInput}
              />
              <div className="group relative ml-2">
                <AiOutlineInfoCircle className="text-gray-400 cursor-pointer" />
                <div className="absolute w-64 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-8 -left-24">
                  Enter a valid email address (e.g., user@example.com).
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-lg bg-gradient-to-tr from-[#D0517E80]/20 to-[#5612E180]/20 p-[0.8px] shadow-lg">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="input-field flex items-center bg-[#212121] rounded-lg p-[12px] relative">
              <AiOutlineLock className="text-white mr-2" />
              <input
                id="password"
                type="password"
                className="bg-transparent text-white placeholder:text-white placeholder:text-sm w-full focus:outline-none"
                placeholder="Password"
                aria-label="Password"
                name="pwd"
                required
                onChange={handleInput}
              />
              <div className="group relative ml-2">
                <AiOutlineInfoCircle className="text-gray-400 cursor-pointer" />
                <div className="absolute w-64 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-8 -left-40">
                  Password must be 8-24 characters long, and include at least
                  one uppercase, lowercase, digit, and special character
                  (!@#$%).
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-lg bg-gradient-to-tr from-[#D0517E80]/20 to-[#5612E180]/20 p-[0.8px] shadow-lg">
            <label htmlFor="confirm-password" className="sr-only">
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
                required
                onChange={handlePwd}
              />
            </div>
          </div>

          <div className={`text-center ${!isPwdSame ? "visible" : "hidden"}`}>
            <p className="text-red-400">Passwords don't match</p>
          </div>

          <button
            type="submit"
            className="py-2 px-6 bg-gradient-to-r from-[#D0517E] to-[#5612E1] text-base border-none text-white disabled:cursor-not-allowed disabled:grayscale"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
            }}
            aria-label="Sign up"
            disabled={!isPwdSame}
          >
            SIGN UP
          </button>

          <div className="flex items-center gap-4 justify-center">
            <hr className="w-full bg-[#484848] h-[2px] border-none" />
            <span className="text-[#484848]">Or</span>
            <hr className="w-full bg-[#484848] h-[2px] border-none" />
          </div>

          <section className="methods flex justify-center gap-2 -mt-2 items-center">
            <button aria-label="Sign in with Google">
              <FcGoogle className="text-4xl cursor-pointer" />
            </button>
            <button aria-label="Sign in with GitHub">
              <AiOutlineGithub className="text-4xl cursor-pointer text-white" />
            </button>
          </section>
        </form>
      </main>
    </div>
  );
};

export default Register;
