import textLogo from "/src/assets/logo-english.png";
import imglogo from "../assets/train-station.png";
import { useEffect, useState } from "react";
import { Ticket, Tag, Upload, CheckCircle, Languages } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { FaCog, FaCreditCard } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";

const NavBar = () => {
  const { t, i18n } = useTranslation();
  const { user, logout, isAuthenticated } = useAuth(); // Use AuthContext
  const [inboxes, setInboxes] = useState(false);
  const [mobileInbox, setMobileInbox] = useState(false);
  const [userMenu, setUserMenu] = useState(false); // State for user dropdown

  const Location = useLocation();
  const [navCustomClasses, setNavCustomClasses] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // ... (Keep existing useEffects and helper functions)

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    if (Location.pathname == "/about") {
      setNavCustomClasses("fade-away-nav");
    } else {
      setNavCustomClasses("");
    }
  }, [Location.pathname]);

  const handleScroll = () => {
    if (
      document.documentElement.scrollTop + document.body.scrollTop > 100 &&
      Location.pathname == "/about"
    ) {
      setNavCustomClasses("fade-away-nav fade-away-now");
    } else {
      setNavCustomClasses("fade-away-nav");
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [Location.pathname]);

  return (
    <nav
      className={
        `
        py-4 fixed top-0 left-0 right-0 z-50
        bg-black/40 backdrop-blur-md
        text-white
        flex items-center justify-between
        px-6 ` + navCustomClasses
      }
    >
      {/* Left side */}
      <div className="flex items-center gap-8 relative">
        <Link to="/" className="flex items-center gap-3">
          <img src={imglogo} className="md:w-10 md:h-10 w-7 h-7" />
          <img src={textLogo} className="md:w-24 w-15" />
        </Link>
        <ul className="md:flex hidden items-center gap-8">
          <li>
            <Link to="/">{t("nav.home")}</Link>
          </li>

          {/* Inbox dropdown */}
          <li className="relative">
            <button
              onClick={() => setInboxes(!inboxes)}
              className="hover:opacity-80 cursor-pointer transition relative flex items-center gap-1"
            >
              {t("nav.inbox")}
              <span className="w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {inboxes && (
              <div
                className="
                absolute top-12 ltr:left-0 rtl:right-0
                w-96
                bg-white/90 text-black
                rounded-2xl shadow-xl
                p-4
                z-50
              "
              >
                {/* ... (Keep existing inbox content) ... */}
                <h3 className="font-semibold mb-3">{t("nav.notifications")}</h3>

                <div className="space-y-3">
                  <div className="flex gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Ticket className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{t("nav.bookingConfirmed")}</p>
                        <span className="text-xs text-gray-400">2 mins ago</span>
                      </div>
                      <p className="text-sm text-gray-500">{t("nav.ticketReady")}</p>
                    </div>
                  </div>
                  {/* ... (Other notifications) ... */}
                </div>
              </div>
            )}
          </li>

          <li>
            <Link to="/about">{t("nav.about")}</Link>
          </li>

          <li>
            <Link to="/contact">{t("nav.contact")}</Link>
          </li>
        </ul>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleLanguage}
          className="p-2 hover:bg-white/10 rounded-full transition flex items-center gap-2"
          title={i18n.language === "ar" ? "English" : "العربية"}
        >
          <Languages className="w-5 h-5" />
          <span className="text-sm font-medium uppercase">{i18n.language === "ar" ? "en" : "ar"}</span>
        </button>

        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setUserMenu(!userMenu)}
              className="px-4 py-2 rounded-full bg-white text-black font-medium flex items-center gap-2"
            >
              <span>{user?.full_name || "User"}</span>
            </button>
            {userMenu && (
              <div className="absolute top-12 ltr:right-0 rtl:left-0 w-48 bg-white text-black rounded-xl shadow-xl p-2 z-50">
                <Link
                  to="/profile"
                  onClick={() => setUserMenu(false)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-black font-medium"
                >
                  {t("profile.title") || "Profile"}
                </Link>
                <Link
                  to="/payment"
                  onClick={() => setUserMenu(false)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-black font-medium"
                >
                  <FaRegCreditCard /> Top Up
                </Link>
                {(user?.role === "admin" || user?.role === "manager") && (
                  <Link
                    to="/admin"
                    onClick={() => setUserMenu(false)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-black font-medium"
                  >
                  <FaCog /> Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-red-500 font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="md:block hidden px-4 py-2 rounded-full bg-white text-black font-medium">
              {t("nav.login")}
            </Link>
            <Link to="/register" className="p-2 md:px-4 md:py-2 md:rounded-full rounded-lg bg-white text-black font-medium">
              {t("nav.register")}
            </Link>
          </>
        )}


        {/* Mobile menu button */}
        <div className="md:hidden flex flex-col">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2"
          >
            <RxHamburgerMenu className="w-6 h-6 text-white" />
          </button>

          {/* Mobile menu links */}
          {isOpen && (
            <div
              className="
                absolute top-full left-0 w-full
                bg-black/80 backdrop-blur-lg
                text-white
                flex flex-col items-center py-4 z-40
              "
            >
              <ul className="w-full flex flex-col items-center gap-2">
                {/* ... (Keep existing mobile links) ... */}
                <li className="w-full text-center">
                  <Link
                    to="/"
                    className="block w-full py-3 hover:bg-white/10 transition rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.home")}
                  </Link>
                </li>
                {/* ... (Inbox mobile) ... */}
                <li className="w-full text-center">
                  <Link
                    to="/about"
                    className="block w-full py-3 hover:bg-white/10 transition rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.about")}
                  </Link>
                </li>
                <li className="w-full text-center">
                  <Link
                    to="/contact"
                    className="block w-full py-3 hover:bg-white/10 transition rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.contact")}
                  </Link>
                </li>

                <li className="w-full px-6 pt-4 flex flex-col gap-2">
                  {isAuthenticated ? (
                    <>
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="block w-full text-center py-3 rounded-lg bg-red-500 text-white font-medium"
                      >
                        Logout
                      </button>
                      <Link
                        to="/payment"
                        className="block w-full text-center py-3 rounded-lg bg-black text-white font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <FaRegCreditCard /> Top Up
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="block w-full text-center py-3 rounded-lg bg-white text-black font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {t("nav.login")}
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      toggleLanguage();
                      setIsOpen(false);
                    }}
                    className="md:block hidden w-full text-center py-3 rounded-lg border border-white text-white font-medium"
                  >
                    {i18n.language === "ar" ? "English" : "العربية"}
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

