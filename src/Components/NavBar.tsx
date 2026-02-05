import textLogo from "/src/assets/logo-english.png";
import imglogo from "../assets/train-station.png";
import { useEffect, useState } from "react";
import { Ticket, Tag, Upload, CheckCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

const NavBar = () => {
  const [inboxes, setInboxes] = useState(false);
  const [mobileInbox, setMobileInbox] = useState(false);

  const Location = useLocation();
  const [navCustomClasses, setNavCustomClasses] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (Location.pathname == "/about") {
      setNavCustomClasses("fade-away-nav");
    } else {
      setNavCustomClasses("");
    }
  }, []);

  const handleScroll = () => {
    setScrollY(document.documentElement.scrollTop + document.body.scrollTop);
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
    // Set initial position
    handleScroll();

    // Add event listener on mount
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      <div className="flex   items-center gap-8 relative">
        <Link to="/" className="flex items-center gap-3">
          <img src={imglogo} className="md:w-10 md:h-10 w-7 h-7" />
          <img src={textLogo} className="md:w-24 w-15" />
        </Link>
        <ul className="md:flex hidden  items-center gap-8">
          <li>
            <Link to="/">Home</Link>
          </li>

          {/* Inbox dropdown */}
          <li className="relative">
            <button
              onClick={() => setInboxes(!inboxes)}
              className="hover:opacity-80 cursor-pointer transition relative"
            >
              Inbox
              {/* notification dot */}
              <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {inboxes && (
              <div
                className="
                absolute top-12 left-0
                w-96
                bg-white/90 text-black
                rounded-2xl shadow-xl
                p-4
              "
              >
                <h3 className="font-semibold mb-3">Notifications</h3>

                <div className="space-y-3">
                  {/* Notification 1 */}
                  <div className="flex gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Ticket className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">Booking Confirmed</p>
                        <span className="text-xs text-gray-400">
                          2 mins ago
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Your ticket is ready. Have a safe journey!
                      </p>
                    </div>
                  </div>

                  {/* Notification 2 */}
                  <div className="flex gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Tag className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">20% Discount</p>
                        <span className="text-xs text-gray-400">
                          1 hour ago
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Use code MAAT20 – valid for 24h
                      </p>
                    </div>
                  </div>

                  {/* Notification 3 */}
                  <div className="flex gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">System Update</p>
                        <span className="text-xs text-gray-400">
                          5 hours ago
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Live tracking has been improved
                      </p>
                    </div>
                  </div>

                  {/* Notification 4 */}
                  <div className="flex gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">Payment Successful</p>
                        <span className="text-xs text-gray-400">Yesterday</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Payment has been processed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>

          <li>
            <a href="/about">About</a>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <Link to="/login" className="md:block hidden px-4 py-2  rounded-full bg-white text-black">
          Log In
        </Link>
        <Link to="/register" className="p-2 md:px-4 md:py-2
         md:rounded-full rounded-lg bg-white text-black">
          Register
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
      bg-black/40 backdrop-blur-md
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
          Home
        </Link>
      </li>
    <li className="w-full text-center">
  <button
    onClick={() => setMobileInbox(!mobileInbox)}
    className="w-full py-3 hover:bg-white/10 transition rounded-lg flex justify-center items-center gap-2"
  >
    Inbox
    <span className="w-2 h-2 bg-red-500 rounded-full" />
  </button>

  {mobileInbox && (
    <div className="mt-2 mx-4 bg-white/90 text-black rounded-xl p-3 space-y-2">
      {/* Notification Item */}
      <div className="flex gap-3 p-2 rounded-lg bg-gray-50">
        <Ticket className="w-5 h-5 text-blue-600" />
        <div className="text-left">
          <p className="font-medium text-sm">Booking Confirmed</p>
          <p className="text-xs text-gray-500">Your ticket is ready</p>
        </div>
      </div>

      <div className="flex gap-3 p-2 rounded-lg bg-gray-50">
        <Tag className="w-5 h-5 text-yellow-600" />
        <div className="text-left">
          <p className="font-medium text-sm">20% Discount</p>
          <p className="text-xs text-gray-500">Code: MAAT20</p>
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
          About
        </Link>
      </li>
      <li className="w-full text-center">
        <Link
          to="/contact"
          className="block w-full py-3 hover:bg-white/10 transition rounded-lg"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </Link>
      </li>
      <li className="w-full px-6 pt-4">
  <Link
    to="/login"
    className="block w-full text-center py-3 rounded-lg md:rounded-full bg-white text-black font-medium"
    onClick={() => setIsOpen(false)}
  >
    Log In
  </Link>
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
