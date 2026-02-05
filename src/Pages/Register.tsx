import { useState } from "react";
import { Eye, EyeOff, User, Mail } from "lucide-react";
import { FaApple, FaFacebookF, FaGoogle, FaLock } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <NavBar />

      <section className="flex justify-center pb-6 md:pb-0 md:mt-16">
        <div
          className=" md:my-10
            flex flex-col md:flex-row
            w-full md:w-[70%]
            min-h-screen md:min-h-0 md:h-[90vh]
            items-stretch
          "
        >
          {/* LEFT SIDE */}
          <div
            className="
              relative w-full md:w-1/2
              min-h-[40vh] md:min-h-full
              md:rounded-tl-2xl md:rounded-bl-2xl
              overflow-hidden
              login-bg bg-cover bg-center
            "
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[#0f172a]/90" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end items-center text-center px-6 pb-10 md:pb-24 z-10 text-white">
              <h2 className="text-xl md:text-3xl font-bold mb-4">
                Welcome to Ma’at
              </h2>
              <p className="text-xs md:text-sm text-gray-200 max-w-sm">
                We help organize your train boarding smoothly and efficiently.
                Enjoy a comfortable and well-organized journey.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full md:w-1/2 flex">
            <div
              className="
                flex flex-col justify-between
                w-full
                bg-gray-100
                px-6 md:px-10 py-8
                md:rounded-tr-2xl md:rounded-br-2xl
              "
            >
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">
                Hello! Register <br /> to get started
              </h1>

              {/* Inputs */}
              <div className="space-y-5">
                {/* Username */}
                <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-sm">
                  <User className="text-teal-500 mr-3" size={20} />
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full bg-transparent outline-none text-gray-600"
                  />
                </div>

                {/* Email */}
                <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-sm">
                  <Mail className="text-teal-500 mr-3" size={20} />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-transparent outline-none text-gray-600"
                  />
                </div>

                {/* Password */}
                <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-sm">
                  <FaLock className="text-teal-500 mr-3 w-4 h-4" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full bg-transparent outline-none text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-sm">
                  <FaLock className="text-teal-500 mr-3 w-4 h-4" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full bg-transparent outline-none text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <Eye size={20} />
                    ) : (
                      <EyeOff size={20} />
                    )}
                  </button>
                </div>

                <Link
                  to="#"
                  className="block text-center text-sm text-gray-500 hover:underline"
                >
                  Forgot Password?
                </Link>

                {/* Register Button */}
                <button className="w-full cursor-pointer bg-slate-800 text-white py-4 rounded-full text-lg font-semibold shadow-lg hover:opacity-90 transition">
                  Register
                </button>
              </div>

              {/* Socials */}
              <div>
                <p className="text-center text-gray-500 my-3">
                  Or Register with
                </p>

                <div className="flex justify-center gap-4">
                  <SocialIcon>
                    <FaFacebookF className="text-blue-500 text-xl" />
                  </SocialIcon>
                  <SocialIcon>
                    <FaApple className="text-black text-xl" />
                  </SocialIcon>
                  <SocialIcon>
                    <FaGoogle className="text-red-500 text-xl" />
                  </SocialIcon>
                  <SocialIcon>
                    <FaXTwitter className="text-black text-xl" />
                  </SocialIcon>
                </div>

                <p className="text-center text-gray-600 mt-4">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-slate-800 hover:underline"
                  >
                    Login Now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

const SocialIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="cursor-pointer p-3 bg-white rounded-xl shadow-sm hover:scale-105 transition">
    {children}
  </div>
);

export default Register;
