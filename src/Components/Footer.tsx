import textLogo from "/src/assets/logo-english.png";
import imglogo from "../assets/train-station.png";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <>
      <footer
        className="bg-black 
       h-[33vh] p-4 text-white "
      >
        <div className="flex  justify-between">
          <div>
            <a
              href="/"
              className="flex items-center mb-4 gap-3 hover:opacity-90 transition"
            >
              <img src={imglogo} className="w-7 h-7" />
              <img src={textLogo} className="w-19" />
            </a>
            <p className="w-[300px] text-gray-300 text-[15px] tracking-wide mt-4">
              Our mission is to provide modern travelers with safe, comfortable,
              and seamless train journeys across Egypt, making every trip
              memorable.
            </p>
          </div>
          <ul>
            <li className="text-xl mb-5 font-semibold ">About</li>
            <li className="mb-4 text-gray-300 italic">
              <a href="#">About Us</a>
            </li>
            <li className="mb-4 text-gray-300 italic">
              <a href="#">Contact Us</a>
            </li>
          </ul>
          <div>
            <h3 className="text-xl mb-3 mb-5 font-semibold">Get Updates </h3>
            <div className="gap-4 flex  items-center  ">
              <input
                type="email"
                className="bg-white/30 focus:outline-none
             py-2 px-4 rounded-lg ring-2  ring-white/40"
                placeholder="Enter Your Email"
                name="email"
              />
              <button
                type="button"
                className=" w-22.5 cursor-pointer
           rounded-lg text-black bg-white p-2"
              >
                Subscribe
              </button>
            </div>
            <div className="icons flex  justify-center gap-3 mt-8 ">
              <a href="#">
                <FaFacebook
                  className="bg-white/30 w-10 h-10 
              rounded-full p-2"
                />
              </a>
              <a href="#">
                {" "}
                <FaInstagram
                  className="bg-white/30 w-10 h-10 
              rounded-full p-2"
                />
              </a>
              <a href="#">
                <FaTiktok
                  className="bg-white/30 w-10 h-10 
              rounded-full p-2"
                />
              </a>
              <a href="#">
                <FaXTwitter
                  className="bg-white/30 w-10 h-10 
              rounded-full p-2"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center my-5 ">
          <p className="tracking-wide">&copy; 2026 All Right reserved. </p>
          <div className="gap-4 flex items-center ">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms Of Service</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
