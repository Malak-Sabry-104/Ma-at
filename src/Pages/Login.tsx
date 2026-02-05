import { useState } from "react";
import { Eye, EyeOff, User } from "lucide-react";
import { FaApple, FaFacebookF, FaGoogle, FaLock } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
    <NavBar/>
    <section className="flex justify-center md:p-0 
    pb-4 mt-17 md:w-[90%] md:mx-auto ">
      <div className="flex md:flex-row w-full
      flex-col justify-center h-screen items-center md:w-[70%]">

        {/* Left side */}
        <div className="md:rounded-tl-2xl  
        md:rounded-tr-0
        md:rounded-bl-2xl w-full
         md:w-[50%]  h-[70%] relative overflow-hidden login-bg bg-cover bg-center">

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[#0f172a]/90"></div>

          {/* Text */}
          <div className="absolute inset-0 flex flex-col
           justify-end md:mb-24 mb-10 items-center  text-white text-center px-6 z-10">
            <h2 className="md:text-3xl text-xl  font-bold mb-4 ">Welcome to Ma’at</h2>
            <p className="md:text-sm text-xs text-gray-200">
              We help organize your train boarding smoothly and efficiently.
              Enjoy a comfortable and well-organized journey.
            </p>
          </div>

        </div>

        {/* Right side */}
        <div className="right h-[70%] w-full md:w-[50%]">
          <div className="h-full rounded-tr-2xl rounded-br-2xl bg-gray-100 flex flex-col justify-between px-10 py-8">

            {/* Title */}
            <h1 className="text-4xl mb-4 font-bold text-slate-800 text-center">
              Welcome <br /> Back!
            </h1>

            {/* Inputs */}
            <div className="space-y-5">

              {/* Username */}
              <div className="flex items-center  mx-4 bg-white rounded-2xl px-4 py-3 shadow-sm">
                <User className="text-teal-500 mr-3" size={20} />
                <input
                  type="text"
                  placeholder="Username or Email"
                  className="w-full bg-transparent outline-none text-gray-600"
                />
              </div>

          {/* Password */}
<div className="flex mx-4 items-center  bg-white rounded-2xl px-4 py-3 shadow-sm">
  {/* Lock Icon */}
  <FaLock className="text-teal-500 mr-3 w-4 h-4 flex-shrink-0" />

  {/* Input */}
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className="w-full bg-transparent outline-none text-gray-600"
  />

  {/* Eye toggle */}
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="text-gray-400 hover:text-gray-600 ml-2"
  >
    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
  </button>
</div>

              {/* Forgot */}
              <Link
                to="#"
                className="text-center px-2 py-1 ms-5 text-gray-500 text-sm cursor-pointer"
              >
                Forgot Password?
              </Link>

              {/* Login button */}
              <button className="w-full cursor-pointer
               my-3 bg-slate-800 text-white py-4 rounded-full text-lg font-semibold shadow-lg hover:opacity-90 transition">
                Login
              </button>
            </div>

            {/* Bottom */}
            <div>
              <p className="text-center text-gray-500 my-3">Or Login with</p>

              <div className="flex justify-center gap-4">
                <div className="cursor-pointer p-3 bg-white rounded-xl shadow-sm flex justify-center">
                  <FaFacebookF className="text-blue-500 text-xl" />
                </div>
                <div className="cursor-pointer p-3 bg-white rounded-xl shadow-sm flex justify-center">
                  <FaApple className="text-black text-xl" />
                </div>
                <div className="cursor-pointer p-3 bg-white rounded-xl shadow-sm flex justify-center">
                  <FaGoogle className="text-red-500 text-xl" />
                </div>
                <div className="cursor-pointer 
                bg-white rounded-xl shadow-sm p-3 flex justify-center">
                  <FaXTwitter className="text-black text-xl" />
                </div>
              </div>

              <p className="text-center text-gray-600 my-3">
                Don't have an account?{" "}
                <Link to="/sign-up" className="font-semibold text-slate-800 cursor-pointer">
                  Register Now
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
    <Footer/>
    </>
    
  );
};

export default Login;
