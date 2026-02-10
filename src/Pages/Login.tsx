import React, { useState } from "react";
import { User, KeyRound } from "lucide-react";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { t } = useTranslation();
  const { login, verify } = useAuth();
  const navigate = useNavigate();

  const [nationalId, setNationalId] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"input" | "otp">("input");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      await login(nationalId);
      setStep("otp");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to send OTP. Please check your National ID.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    setIsLoading(true);
    try {
      await verify(nationalId, otp);
      navigate("/"); // Redirect to home on success
    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <section className="flex justify-center md:p-0 pb-4 mt-17 md:w-[90%] md:mx-auto ltr:text-left rtl:text-right">
        <div className="flex md:flex-row w-full flex-col justify-center h-screen items-center md:w-[70%]">

          {/* Left side */}
          <div className="md:rounded-tl-2xl md:rounded-bl-2xl rtl:md:rounded-tl-0 rtl:md:rounded-tr-2xl rtl:md:rounded-bl-0 rtl:md:rounded-br-2xl w-full md:w-[50%] h-[70%] relative overflow-hidden login-bg bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[#0f172a]/90"></div>
            <div className="absolute inset-0 flex flex-col justify-end md:mb-24 mb-10 items-center text-white text-center px-6 z-10">
              <h2 className="md:text-3xl text-xl font-bold mb-4 ">{t("auth.welcomeTo")} {t("auth.maat")}</h2>
              <p className="md:text-sm text-xs text-gray-200">
                {t("auth.welcomeSubtitle")}
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="right h-[70%] w-full md:w-[50%]">
            <div className="h-full rounded-tr-2xl rounded-br-2xl rtl:md:rounded-tr-0 rtl:md:rounded-tl-2xl rtl:md:rounded-br-0 rtl:md:rounded-bl-2xl bg-gray-100 flex flex-col justify-between px-10 py-8">

              {/* Title */}
              <h1 className="text-4xl mb-4 font-bold text-slate-800 text-center">
                {t("auth.welcomeBack").split(' ').map((word, i) => (
                  <React.Fragment key={i}>{word}{i === 0 && <br />}</React.Fragment>
                ))}
              </h1>

              {/* Inputs */}
              <div className="space-y-5">
                {error && <p className="text-red-500 text-center text-sm">{error}</p>}

                {step === "input" && (
                  <div className="flex items-center mx-4 bg-white rounded-2xl px-4 py-3 shadow-sm">
                    <User className="text-teal-500 ltr:mr-3 rtl:ml-3 shrink-0" size={20} />
                    <input
                      type="text"
                      placeholder={t("auth.enterNationalId") || "National ID"}
                      className="w-full bg-transparent outline-none text-gray-600"
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                    />
                  </div>
                )}

                {step === "otp" && (
                  <div className="flex items-center mx-4 bg-white rounded-2xl px-4 py-3 shadow-sm">
                    <KeyRound className="text-teal-500 ltr:mr-3 rtl:ml-3 shrink-0" size={20} />
                    <input
                      type="text"
                      placeholder={t("auth.enterOtp") || "Enter OTP"}
                      className="w-full bg-transparent outline-none text-gray-600"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                )}

                {/* Submit button */}
                <button
                  onClick={step === "input" ? handleLogin : handleVerify}
                  disabled={isLoading}
                  className="w-full cursor-pointer my-3 bg-slate-800 text-white py-2 rounded-full text-lg font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
                >
                  {isLoading ? "Loading..." : (step === "input" ? t("auth.login") : t("auth.verify") || "Verify")}
                </button>
              </div>

              {/* Bottom */}
              <div>
                <p className="text-center text-gray-500 mb-3">{t("auth.orLoginWith")}</p>

                <div className="flex justify-center gap-4">
                  <div className="cursor-pointer p-3 bg-white rounded-xl shadow-sm flex justify-center hover:scale-105 transition">
                    <FaFacebookF className="text-blue-500 text-xl" />
                  </div>
                  <div className="cursor-pointer p-3 bg-white rounded-xl shadow-sm flex justify-center hover:scale-105 transition">
                    <FaApple className="text-black text-xl" />
                  </div>
                  <div className="cursor-pointer p-3 bg-white rounded-xl shadow-sm flex justify-center hover:scale-105 transition">
                    <FaGoogle className="text-red-500 text-xl" />
                  </div>
                  <div className="cursor-pointer bg-white rounded-xl shadow-sm p-3 flex justify-center hover:scale-105 transition">
                    <FaXTwitter className="text-black text-xl" />
                  </div>
                </div>

                <p className="text-center text-gray-600 my-3">
                  {t("auth.dontHaveAccount")}{" "}
                  <Link to="/register" className="font-semibold text-slate-800 cursor-pointer hover:underline">
                    {t("auth.registerNow")}
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

export default Login;
