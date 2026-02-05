import textLogo from "/src/assets/logo-english.png";
import imglogo from "../assets/train-station.png";
import { useEffect, useState } from "react";
import { Ticket, Tag, Upload, CheckCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const [inboxes, setInboxes] = useState(false);
  const Location = useLocation();
  const [navCustomClasses, setNavCustomClasses] = useState('');
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (Location.pathname == '/about') {
      setNavCustomClasses("fade-away-nav");
    } else {
      setNavCustomClasses("");
    }
  }, [])

  const handleScroll = () => {
    setScrollY(document.documentElement.scrollTop + document.body.scrollTop);
    if (document.documentElement.scrollTop + document.body.scrollTop > 100 && Location.pathname == '/about') {
      setNavCustomClasses("fade-away-nav fade-away-now")
    } else {
      setNavCustomClasses("fade-away-nav")
    }
  };

  useEffect(() => {
    // Set initial position
    handleScroll(); 
    
    // Add event listener on mount
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  return (
    <nav
      className={`
        py-4 fixed top-0 left-0 right-0 z-50
        bg-black/40 backdrop-blur-md
        text-white
        flex items-center justify-between
        px-6 ` + navCustomClasses}
    >
      {/* Left side */}
      <ul className="flex items-center gap-8 relative">
        <Link to="/" className="flex items-center gap-3">
          <img src={imglogo} className="w-10 h-10" />
          <img src={textLogo} className="w-24" />
        </Link>

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
                      <span className="text-xs text-gray-400">2 mins ago</span>
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
                      <span className="text-xs text-gray-400">1 hour ago</span>
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
                      <span className="text-xs text-gray-400">5 hours ago</span>
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
          <Link to="#">Contact</Link>
        </li>
      </ul>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <Link to="#"
         className="px-4 py-2 rounded-full bg-white text-black">Log In</Link>
        <Link to="#"
         className="px-4 py-2 rounded-full bg-white text-black">Sign Up</Link>
      </div>
    </nav>
  );
};

export default NavBar;
