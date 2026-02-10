import React, { useState } from "react";
import { User, Mail, Phone, Lock, CreditCard } from "lucide-react";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    national_id: "",
    full_name: "",
    phoneNumber: "",
    gender: "male",
    email: "",
    cardId: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError("");
    setIsLoading(true);
    try {
      await register(formData);
      navigate("/"); // Redirect to home on success
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <section className="flex justify-center pb-6 md:pb-0 md:mt-16 ltr:text-left rtl:text-right">
        <div className="md:my-10 flex flex-col md:flex-row w-full md:w-[70%] min-h-screen md:min-h-0 md:h-[90vh] items-stretch">

          {/* LEFT SIDE */}
          <div className="relative w-full md:w-1/2 min-h-[40vh] md:min-h-full md:rounded-tl-2xl md:rounded-bl-2xl rtl:md:rounded-tl-0 rtl:md:rounded-tr-2xl rtl:md:rounded-bl-0 rtl:md:rounded-br-2xl overflow-hidden login-bg bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[#0f172a]/90" />
            <div className="absolute inset-0 flex flex-col justify-end items-center text-center px-6 pb-10 md:pb-24 z-10 text-white">
              <h2 className="text-xl md:text-3xl font-bold mb-4">{t("auth.welcomeTo")} {t("auth.maat")}</h2>
              <p className="text-xs md:text-sm text-gray-200 max-w-sm">{t("auth.welcomeSubtitle")}</p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full md:w-1/2 flex">
            <div className="flex flex-col justify-between w-full bg-gray-100 px-6 md:px-10 py-8 md:rounded-tr-2xl md:rounded-br-2xl rtl:md:rounded-tr-0 rtl:md:rounded-tl-2xl rtl:md:rounded-br-0 rtl:md:rounded-bl-2xl overflow-y-auto">

              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">
                {t("auth.helloRegister").split('Register').map((part, i) => (
                  <React.Fragment key={i}>{part}{i === 0 && <br />}</React.Fragment>
                ))}
              </h1>

              <div className="space-y-4">
                {error && <p className="text-red-500 text-center text-sm">{error}</p>}

                {/* National ID */}
                <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-sm">
                  <User className="text-teal-500 ltr:mr-3 rtl:ml-3 shrink-0" size={20} />
                  <input
                    name="national_id"
                    type="text"
                    placeholder={t("auth.nationalId") || "National ID"}
                    className="w-full bg-transparent outline-none text-gray-600"
                    onChange={handleChange}
                  />
                </div>

                {/* Full Name */}
                <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-sm">
                  <User className="text-teal-500 ltr:mr-3 rtl:ml-3 shrink-0" size={20} />
                  <input
                    name="full_name"
                    type="text"
                    placeholder={t("auth.fullName") || "Full Name"}
                    className="w-full bg-transparent outline-none text-gray-600"
                    onChange={handleChange}
                  />
                </div>

                {/* Phone Number */}
                <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-sm">
                  <Phone className="text-teal-500 ltr:mr-3 rtl:ml-3 shrink-0" size={20} />
                  <input
                    name="phoneNumber"
                    type="text"
                    placeholder={t("auth.phoneNumber") || "Phone Number"}
                    className="w-full bg-transparent outline-none text-gray-600"
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-sm">
                  <Mail className="text-teal-500 ltr:mr-3 rtl:ml-3 shrink-0" size={20} />
                  <input
                    name="email"
                    type="email"
                    placeholder={t("auth.email")}
                    className="w-full bg-transparent outline-none text-gray-600"
                    onChange={handleChange}
                  />
                </div>

                {/* Gender */}
                <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-sm">
                  <select
                    name="gender"
                    className="w-full bg-transparent outline-none text-gray-600"
                    onChange={handleChange}
                    value={formData.gender}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                {/* Card ID (Optional) */}
                <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-sm">
                  <CreditCard className="text-teal-500 ltr:mr-3 rtl:ml-3 shrink-0" size={20} />
                  <input
                    name="cardId"
                    type="text"
                    placeholder={t("auth.cardId") || "Card ID (Optional)"}
                    className="w-full bg-transparent outline-none text-gray-600"
                    onChange={handleChange}
                  />
                </div>

                {/* Register Button */}
                <button
                  onClick={handleRegister}
                  disabled={isLoading}
                  className="w-full cursor-pointer bg-slate-800 text-white py-4 rounded-full text-lg font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
                >
                  {isLoading ? "Loading..." : t("auth.register")}
                </button>
              </div>

              {/* Socials */}
              <div>
                <p className="text-center text-gray-500 my-3">{t("auth.orRegisterWith")}</p>
                <div className="flex justify-center gap-4">
                  <SocialIcon><FaFacebookF className="text-blue-500 text-xl" /></SocialIcon>
                  <SocialIcon><FaApple className="text-black text-xl" /></SocialIcon>
                  <SocialIcon><FaGoogle className="text-red-500 text-xl" /></SocialIcon>
                  <SocialIcon><FaXTwitter className="text-black text-xl" /></SocialIcon>
                </div>
                <p className="text-center text-gray-600 mt-4">
                  {t("auth.alreadyHaveAccount")}{" "}
                  <Link to="/login" className="font-semibold text-slate-800 hover:underline">{t("auth.loginNow")}</Link>
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
  <div className="cursor-pointer p-3 bg-white rounded-xl shadow-sm hover:scale-105 transition">{children}</div>
);

export default Register;
