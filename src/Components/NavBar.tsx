import textLogo from "/src/assets/logo-english.png";
import imglogo from "../assets/train-station.png";
const NavBar = () => {
  return (
    <>
      <nav>
        <a
          href="/"
          className="flex justify-start items-center
             bg-red-500 gap-3"
        >
          <img src={imglogo} className="w-[70px] ms-4 my-3" />
          <img src={textLogo} className="w-[100px] my-3" />
        </a>
        <ul>
          <li>
            <a href="/"></a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
