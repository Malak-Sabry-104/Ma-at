import textLogo from "/src/assets/logo-english.png";
import imglogo from "../assets/train-station.png";

const NavBar = () => {
  return (
    <nav
      className=" py-4
        fixed top-0 left-0 right-0 z-50
        bg-black/40 backdrop-blur-md
        text-white
        flex items-center justify-between
        px-6
      "
    >
      {/* Left side */}
      <ul className="flex items-center gap-8">
        <a
          href="/"
          className="flex items-center gap-3 hover:opacity-90 transition"
        >
          <img src={imglogo} className="w-10 h-10" />
          <img src={textLogo} className="w-24" />
        </a>

        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="#">Find my Train</a>
        </li>
        <li>
          <a href="#">Inbox</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <a
          href=""
          className="
      px-4 py-2 rounded-full
      bg-white text-black
      font-medium
      hover:bg-gray-200
      transition-colors
    "
        >
          Log In
        </a>

        <a
          href=""
          className="
      px-4 py-2 rounded-full
      bg-white text-black
      font-medium
      hover:bg-gray-200
      transition-colors
    "
        >
          Sign Up
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
