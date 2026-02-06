import textLogo from "/src/assets/logo-english.png";
import imglogo from "../assets/train-station.png";
import { useEffect, useState } from "react";
import { Ticket, Tag, Upload, CheckCircle, Languages } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const { t, i18n } = useTranslation();
  const [inboxes, setInboxes] = useState(false);
  const [mobileInbox, setMobileInbox] = useState(false);

  const Location = useLocation();
  const [navCustomClasses, setNavCustomClasses] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

                  <div className="flex gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                      <Tag className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{t("nav.discount")}</p>
                        <span className="text-xs text-gray-400">1 hour ago</span>
                      </div>
                      <p className="text-sm text-gray-500">{t("nav.discountCode")}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                      <Upload className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{t("nav.systemUpdate")}</p>
                        <span className="text-xs text-gray-400">5 hours ago</span>
                      </div>
                      <p className="text-sm text-gray-500">{t("nav.trackingImproved")}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{t("nav.paymentSuccessful")}</p>
                        <span className="text-xs text-gray-400 text-end">Yesterday</span>
                      </div>
                      <p className="text-sm text-gray-500">{t("nav.paymentProcessed")}</p>
                    </div>
                  </div>
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

        <Link to="/login" className="md:block hidden px-4 py-2 rounded-full bg-white text-black font-medium">
          {t("nav.login")}
        </Link>
        <Link to="/register" className="p-2 md:px-4 md:py-2 md:rounded-full rounded-lg bg-white text-black font-medium">
          {t("nav.register")}
        </Link>

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
                <li className="w-full text-center">
                  <Link
                    to="/"
                    className="block w-full py-3 hover:bg-white/10 transition rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.home")}
                  </Link>
                </li>
                <li className="w-full text-center">
                  <button
                    onClick={() => setMobileInbox(!mobileInbox)}
                    className="w-full py-3 hover:bg-white/10 transition rounded-lg flex justify-center items-center gap-2"
                  >
                    {t("nav.inbox")}
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                  </button>

                  {mobileInbox && (
                    <div className="mt-2 mx-4 bg-white text-black rounded-xl p-3 space-y-2 text-start">
                      <div className="flex gap-3 p-2 rounded-lg bg-gray-50">
                        <Ticket className="w-5 h-5 text-blue-600 shrink-0" />
                        <div>
                          <p className="font-medium text-sm">{t("nav.bookingConfirmed")}</p>
                          <p className="text-xs text-gray-500">{t("nav.ticketReady")}</p>
                        </div>
                      </div>

                      <div className="flex gap-3 p-2 rounded-lg bg-gray-50">
                        <Tag className="w-5 h-5 text-yellow-600 shrink-0" />
                        <div>
                          <p className="font-medium text-sm">{t("nav.discount")}</p>
                          <p className="text-xs text-gray-500">{t("nav.discountCode")}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </li>

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
                  <Link
                    to="/login"
                    className="block w-full text-center py-3 rounded-lg bg-white text-black font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.login")}
                  </Link>
                  <button
                    onClick={() => {
                      toggleLanguage();
                      setIsOpen(false);
                    }}
                    className="block w-full text-center py-3 rounded-lg border border-white text-white font-medium"
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

