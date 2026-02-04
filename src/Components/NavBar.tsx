import textLogo from "/src/assets/logo-english.png";
import imglogo from "../assets/train-station.png";
const NavBar = () => {
  return (
    <>
      <nav className="fixed top-0 right-0 left-0 text-white
       flex items-center justify-between">
        <ul className="flex justify-start items-center  gap-7">
          <a
            href="/"
            className="flex me-7 justify-start items-center
             gap-3"
          >
            <img src={imglogo} className="w-10.5 ms-4 my-3" />
            <img src={textLogo} className="w-20 my-3" />
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
        <div className="btns-group me-6 gap-6 flex ">
          <a href="">Log In</a>
          <a href="">Sign Up</a>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
