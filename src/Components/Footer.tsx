import textLogo from "/src/assets/logo-english.png";
import imglogo from "../assets/train-station.png";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white px-6 py-12 ltr:text-left rtl:text-right">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between">
        {/* Brand */}
        <div className="max-w-md">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-90 transition sm:justify-start justify-center"
          >
            <img src={imglogo} className="w-7 h-7" />
            <img src={textLogo} className="w-24" />
          </Link>

          <p className="text-gray-300 text-sm tracking-wide mt-4 leading-relaxed sm:text-left rtl:sm:text-right text-center">
            {t("footer.footerDescription")}
          </p>
        </div>

        {/* Links */}
        <ul className="text-sm sm:text-left rtl:sm:text-right text-center">
          <li className="text-lg mb-4 font-semibold">{t("footer.about")}</li>
          <li className="mb-3 text-gray-300 hover:text-white transition">
            <Link to="/about">{t("nav.about")}</Link>
          </li>
          <li className="mb-3 text-gray-300 hover:text-white transition">
            <Link to="/contact">{t("nav.contact")}</Link>
          </li>
        </ul>

        {/* Subscribe */}
        <div className="max-w-md w-full sm:text-left rtl:sm:text-right text-center">
          <h3 className="text-lg mb-4 font-semibold">{t("footer.getUpdates")}</h3>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              className="w-full
               bg-white/20 focus:outline-none
                py-2 px-4 rounded-lg ring-1 mb-2
                 ring-white/30 placeholder:text-gray-300"
              placeholder={t("footer.enterEmail")}
              name="email"
            />
            <button
              type="button"
              className="sm:w-auto w-full h-10 rounded-lg text-black bg-white px-6 py-2 font-medium hover:bg-gray-200 transition"
            >
              {t("footer.subscribe")}
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-6 sm:justify-start justify-center">
            {[FaFacebook, FaInstagram, FaTiktok, FaXTwitter].map(
              (Icon, i) => (
                <Link key={i} to="#">
                  <Icon className="w-10 h-10 p-2 rounded-full bg-white/20 hover:bg-white hover:text-black transition" />
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/10 my-8" />

      {/* Bottom Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center text-sm text-gray-300">
        <p>&copy; 2026 {t("footer.rightsReserved")}</p>
        <div className="flex gap-6">
          <Link className="hover:text-white transition" to="#">
            {t("footer.privacyPolicy")}
          </Link>
          <Link className="hover:text-white transition" to="#">
            {t("footer.termsService")}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

