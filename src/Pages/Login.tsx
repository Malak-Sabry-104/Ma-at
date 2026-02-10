import React, { useState, useEffect, useRef } from "react";
import { User, Smartphone, CheckCircle2, ShieldCheck } from "lucide-react";
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
  const [step, setStep] = useState<"input" | "checking" | "typing" | "verifying" | "done">("input");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [displayedDigits, setDisplayedDigits] = useState<string[]>([]);
  const otpRef = useRef<string>("");

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      const data = await login(nationalId);
      const receivedOtp = data?.user?.otp || "";
      otpRef.current = receivedOtp;
      setStep("checking");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to send OTP. Please check your National ID.");
    } finally {
      setIsLoading(false);
    }
  };

  // Phase 1: "Checking SMS" delay → then start typing
  useEffect(() => {
    if (step !== "checking") return;
    const timer = setTimeout(() => {
      setStep("typing");
      setDisplayedDigits([]);
    }, 2000);
    return () => clearTimeout(timer);
  }, [step]);

  // Phase 2: Auto-type digits one by one
  useEffect(() => {
    if (step !== "typing") return;
    const digits = otpRef.current.split("");
    if (displayedDigits.length < digits.length) {
      const timer = setTimeout(() => {
        setDisplayedDigits((prev) => [...prev, digits[prev.length]]);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // All digits typed, pause briefly then auto-verify
      const timer = setTimeout(() => {
        setStep("verifying");
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [step, displayedDigits]);

  // Phase 3: Auto-verify
  useEffect(() => {
    if (step !== "verifying") return;
    const doVerify = async () => {
      try {
        await verify(nationalId, otpRef.current);
        setStep("done");
        setTimeout(() => navigate("/"), 800);
      } catch (err: any) {
        setError(err.response?.data?.error || "Verification failed. Please try again.");
        setStep("input");
      }
    };
    doVerify();
  }, [step]);

  const otpLength = otpRef.current.length || 6;

  return (
    <>
      <NavBar />
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.4); }
          50% { box-shadow: 0 0 20px 10px rgba(20, 184, 166, 0.15); }
        }
        @keyframes sms-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes digit-pop {
          0% { transform: scale(0.3); opacity: 0; }
          60% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes check-scale {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        .digit-enter {
          animation: digit-pop 0.35s ease-out forwards;
        }
        .check-enter {
          animation: check-scale 0.5s ease-out forwards;
        }
        .sms-icon {
          animation: sms-bounce 1.2s ease-in-out infinite;
        }
        .pulse-ring {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
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

              {/* Content area */}
              <div className="space-y-5">
                {error && <p className="text-red-500 text-center text-sm">{error}</p>}

                {/* Step 1: National ID input */}
                {step === "input" && (
                  <>
                    <div className="flex items-center mx-4 bg-white rounded-2xl px-4 py-3 shadow-sm">
                      <User className="text-teal-500 ltr:mr-3 rtl:ml-3 shrink-0" size={20} />
                      <input
                        type="text"
                        placeholder={t("auth.enterNationalId") || "National ID"}
                        className="w-full bg-transparent outline-none text-gray-600"
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      />
                    </div>
                    <button
                      onClick={handleLogin}
                      disabled={isLoading}
                      className="w-full cursor-pointer my-3 bg-slate-800 text-white py-2 rounded-full text-lg font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
                    >
                      {isLoading ? "Loading..." : t("auth.login")}
                    </button>
                  </>
                )}

                {/* Step 2: Checking SMS animation */}
                {step === "checking" && (
                  <div className="flex flex-col items-center justify-center py-6 space-y-4">
                    <div className="pulse-ring rounded-full p-5 bg-teal-50">
                      <Smartphone className="text-teal-500 sms-icon" size={36} />
                    </div>
                    <p className="text-slate-600 font-medium text-lg">Checking your SMS...</p>
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                )}

                {/* Step 3: Auto-typing OTP digits */}
                {step === "typing" && (
                  <div className="flex flex-col items-center justify-center py-6 space-y-4">
                    <p className="text-slate-600 font-medium text-lg">OTP Found!</p>
                    <div className="flex gap-2 justify-center">
                      {Array.from({ length: otpLength }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-11 h-13 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-all duration-200 ${displayedDigits[i]
                              ? "border-teal-500 bg-teal-50 text-teal-700"
                              : "border-gray-300 bg-white text-gray-300"
                            }`}
                        >
                          {displayedDigits[i] ? (
                            <span className="digit-enter">{displayedDigits[i]}</span>
                          ) : (
                            "•"
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Verifying */}
                {step === "verifying" && (
                  <div className="flex flex-col items-center justify-center py-6 space-y-4">
                    <div className="pulse-ring rounded-full p-5 bg-teal-50">
                      <ShieldCheck className="text-teal-500 sms-icon" size={36} />
                    </div>
                    <p className="text-slate-600 font-medium text-lg">Verifying...</p>
                    <div className="flex gap-2 justify-center">
                      {otpRef.current.split("").map((d, i) => (
                        <div
                          key={i}
                          className="w-11 h-13 rounded-xl border-2 border-teal-500 bg-teal-50 flex items-center justify-center text-xl font-bold text-teal-700"
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 5: Done */}
                {step === "done" && (
                  <div className="flex flex-col items-center justify-center py-6 space-y-4">
                    <div className="check-enter">
                      <CheckCircle2 className="text-emerald-500" size={52} />
                    </div>
                    <p className="text-emerald-600 font-semibold text-lg">Welcome back!</p>
                  </div>
                )}
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
