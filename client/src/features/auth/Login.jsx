import { useDispatch } from "react-redux";
import { logIn, guest } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import React, { useState, useCallback, useEffect } from "react";
import { AiOutlineMail, AiOutlineLock, AiOutlineGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { PiEyeClosedBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { PiEyeBold } from "react-icons/pi";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useLogoutMutation } from "./authApiSlice";
import AuthLogo from "../../assets/images/Auth/Logo.png";
import AuthBg from "../../assets/images/Auth/Authbg.png";
export const Login = () => {
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(true);
  const [formData, setFormData] = useState({
    user: "",
    pwd: "",
  });
  const toggleShowPass = useCallback((e) => {
    e.preventDefault();
    setShowPass((prevShowPass) => !prevShowPass);
  }, []);

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleGuest = () => {
    dispatch(guest());
    navigate("/Home");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ ...formData }).unwrap();
      dispatch(logIn({ ...userData, user: formData.user }));
      setFormData({
        user: "",
        pwd: "",
      });
      toast.success("Login Successful");
      navigate("/Home");
    } catch (err) {
      console.log(err);
      if (err.status === 403) {
        toast.error(err.data.message);
      } else if (err.status === 404) {
        toast.error(err.data.message);
      } else if (err.status === 401) {
        toast.warn(err.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.MODE === "development"
        ? "http://localhost:5000/auth/google"
        : "https://multio-backend.up.railway.app/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href =
      import.meta.env.MODE === "development"
        ? "http://localhost:5000/auth/github"
        : "https://multio-backend.up.railway.app/auth/github";
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="Container min-h-screen w-full flex justify-center items-center relative px-4 py-6">
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover brightness-[0.3]"
        style={{ backgroundImage: `url(${AuthBg})` }}
      ></div>

      <form 
        className="login-form w-full max-w-[420px] bg-[#30303059]/65 backdrop-blur-lg rounded-xl flex flex-col p-4 sm:p-6 gap-2 border-[#4C4C4C40] border-2 transition-all duration-300"
        aria-label="Login Form"
        onSubmit={handleSubmit}
      >
        <header className="heading flex items-center justify-start mb-4 sm:mb-6">
          <img src={AuthLogo} className="w-12 sm:w-16 bg-contain" alt="Multio Logo" />
          <h1 className="text-white ml-2 text-2xl sm:text-3xl font-semibold tracking-wider font-Outfit">
            MULTIO
          </h1>
        </header>

        <section aria-labelledby="login-heading" className="text-section">
          <h2
            id="login-heading"
            className="text-white ml-2 text-[26px] font-normal tracking-wider"
          >
            Login & Enter the Arena!
          </h2>
          <p className="text-white ml-2 text-base font-normal tracking-wide">
            Glad you're back!
          </p>
        </section>

        <section className="inputs flex flex-col gap-3 sm:gap-4 mx-2 sm:mx-4 mt-4">
          <div className="relative rounded-lg bg-gradient-to-tr from-[#D0517E80]/20 to-[#5612E180]/20 p-[0.8px] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <label htmlFor="username-email" className="sr-only">
              Username or Email
            </label>
            <div className="input-field w-full flex items-center bg-[#212121] rounded-lg p-3 sm:p-[12px]">
              <AiOutlineMail className="text-white mr-2" />
              <input
                id="username-email"
                className="bg-transparent text-white placeholder:text-white placeholder:text-sm w-full focus:outline-none"
                placeholder="Username/Email"
                aria-label="Username or Email"
                name="user"
                required
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="relative rounded-lg bg-gradient-to-tr from-[#D0517E80]/20 to-[#5612E180]/20 p-[0.8px] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="input-field flex items-center bg-[#212121] rounded-lg p-3 sm:p-[12px]">
              <AiOutlineLock className="text-white mr-2" />
              <input
                id="password"
                className="bg-transparent text-white placeholder:text-white placeholder:text-sm w-full focus:outline-none"
                type={showPass ? "password" : "text"}
                placeholder="Password "
                required
                name="pwd"
                onChange={handleInput}
              />
              <button
                aria-label="Toggle Password Visibility"
                onClick={toggleShowPass}
              >
                {showPass ? (
                  <PiEyeClosedBold className="text-white size-5" />
                ) : (
                  <PiEyeBold className="text-white size-5" />
                )}
              </button>
            </div>
          </div>

          <button
            className="py-2 px-6 bg-gradient-to-r from-[#D0517E] to-[#5612E1] text-base border-none text-white transform hover:scale-[1.02] transition-transform duration-200 active:scale-[0.98]"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 1em) 0, 100% 0.85em, 100% 100%, 1em 100%, 0 calc(100% - 0.85em))",
            }}
            aria-label="Login"
            type="submit"
          >
            LOGIN
          </button>

          <div className="flex items-center gap-4 justify-center">
            <hr className="w-full bg-[#484848] h-[2px] border-none" />
            <span className="text-[#484848]">Or</span>
            <hr className="w-full bg-[#484848] h-[2px] border-none" />
          </div>

          <section className="methods flex justify-center gap-2 -mt-2 items-center">
            <button aria-label="Login with Google" onClick={handleGoogleLogin}>
              <FcGoogle className="text-4xl cursor-pointer" />
            </button>
            <button aria-label="Login with GitHub" onClick={handleGithubLogin}>
              <AiOutlineGithub className="text-white text-4xl cursor-pointer" />
            </button>
          </section>

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

          <div className="relative rounded-lg bg-gradient-to-tr from-[#D0517E80] to-[#5612E180] p-[0.8px] shadow-lg hover:shadow-xl transition-all duration-300">
            <button
              className="h-full w-full bg-gradient-to-b from-[#393838]/100 to-[#3a3939]/80 text-white text-sm rounded-lg py-2 px-6 text-center font-semibold tracking-wide hover:brightness-110 transition-all duration-300"
              aria-label="Continue as guest"
              onClick={handleGuest}
            >
              Continue as a Guest
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};
