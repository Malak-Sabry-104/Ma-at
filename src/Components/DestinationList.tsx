import { useState } from "react";
import { Target, Heart, Train } from "lucide-react";
import alex from "../assets/alex.jpg";
import aswan from "../assets/aswan.jpg";
import giza from "../assets/giza.jpg";
import cairo from "../assets/cairo.jpg";
import visa from "../assets/visa-logo.png";
import masterCard from "../assets/Mastercard-logo.svg";
import { FaArrowRight, FaGlobe } from "react-icons/fa";

const destinationsData = [
  {
    name: "Alexandria to Damanhour",
    image: alex,
    price: 115,
    target: "Economy",
  },
  { name: "Aswan to Luxor", image: aswan, price: 180, target: "Luxury" },
  { name: "Giza to Cairo", image: giza, price: 90, target: "Business" },
  { name: "Cairo to Alexandria", image: cairo, price: 120, target: "Luxury" },
];
const egyptTrainRoutes = [
  "Cairo to Alexandria",
  "Cairo to Tanta",
  "Cairo to Mansoura",
  "Cairo to Zagazig",
  "Cairo to Benha",
  "Cairo to Damanhour",
  "Cairo to Ismailia",
  "Cairo to Port Said",
  "Cairo to Suez",
  "Cairo to Minya",
  "Cairo to Asyut",
  "Cairo to Sohag",
  "Cairo to Qena",
  "Cairo to Luxor",
  "Cairo to Aswan",
  "Alexandria to Tanta",
  "Tanta to Mansoura",
  "Benha to Zagazig",
];

const DestinationList = () => {
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const toggleFavorite = (index: number) => {
    setFavorites((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <>
      {/* section 2 */}
      <section className="px-6 py-10">
        <h1 className="text-3xl font-semibold mb-6">
          Popular rail routes across Egypt
        </h1>

        <div className="flex flex-wrap gap-6 justify-center">
          {destinationsData.map((dest, index) => (
            <div
              key={index}
              className="w-72 overflow-hidden bg-white rounded-xl shadow"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-44 rounded-xl"
                />

                {/* Favorite button */}
                <button
                  onClick={() => toggleFavorite(index)}
                  className="absolute top-3 right-3 bg-white/90 rounded-full p-1 shadow"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      favorites[index]
                        ? "fill-red-500 text-red-500"
                        : "text-gray-700"
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{dest.name}</h2>

                <span className="flex items-center gap-2 text-gray-600 text-sm">
                  <Target className="w-4 h-4" />
                  {dest.target}
                </span>

                <span className="flex items-center gap-2 text-gray-500 text-sm">
                  <Train className="w-4 h-4" />
                  Egyptian Railways
                </span>

                <span className="text-xs text-gray-500 mt-1">Start from</span>

                <p className="text-2xl">{dest.price} E£</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* section 3 */}
      <section className="px-6">
        <h1 className="font-semibold mb-3 text-3xl ">
          Most Trending Rail routes in Egypt{" "}
        </h1>
        <p className="text-gray-500">
          The most exceptional travel experiences that captivated travelers'
          hearts.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          {egyptTrainRoutes.map((route, index) => (
            <button
              key={index}
              className="
            rounded-lg
            border
            border-gray-200
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-gray-700
            transition
            hover:border-gray-700
            hover:shadow-sm
          "
            >
              {route}
            </button>
          ))}
        </div>
      </section>
      {/* section 4 */}
      <section className="px-6 mt-6 mb-5">
        <h1 className="text-3xl font-semibold mb-6">
          Get promo for a cheaper price
        </h1>
        {/* Cards */}
        <div className="md:flex-row flex-col flex gap-4 overflow-x-auto py-5 px-4">
          {/* Mastercard Offer */}
          <div
            className="min-w-[30%] flex 
          rounded-2xl bg-white p-2 shadow-customized border border-gray-200"
          >
            <div className="w-24 flex flex-col items-center justify-center bg-[#F6EFE6] rounded-l-2xl">
              <img src={masterCard} alt="Mastercard" className="mb-2" />
              <span className="text-sm font-semibold text-gray-900">
                25% OFF
              </span>
            </div>

            <div className="flex-1 flex items-center px-4">
              <p className="text-sm font-medium text-gray-800">
                25% discount <br />
                <span className="text-gray-500 font-normal">
                  with mastercard
                </span>
              </p>
            </div>
          </div>

          {/* Visa Offer */}
          <div
            className="min-w-[30%] flex 
          rounded-2xl bg-white p-2 shadow-customized  border border-gray-200"
          >
            <div className="w-24 flex flex-col items-center justify-center bg-[#EEF0FF] rounded-l-2xl">
              <img src={visa} alt="Visa" className="mb-2" />
              <span className="text-sm font-semibold text-gray-900">
                33% OFF
              </span>
            </div>

            <div className="flex-1 flex items-center px-4">
              <p className="text-sm font-medium text-gray-800">
                33% discount <br />
                <span className="text-gray-500 font-normal">with visa</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section 5 */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 min-h-[80vh]">
        {/* Left side */}
        <div className="flex flex-col gap-4 lg:col-span-1 h-full">
          {/* Top left card */}
          <div
            className="relative h-[300px] md:h-1/2 rounded-2xl overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/station.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm p-6 flex flex-col justify-between">
              <div>
                <FaGlobe className="text-white/50 mb-8 w-[50px] h-[50px] bg-white/20 p-3 rounded-lg" />
                <h2 className="text-white text-2xl md:text-4xl mb-2">
                  Travel Beyond Limits
                </h2>
                <p className="text-white/80 text-md">
                  Discover Egypt’s hidden gems with comfort and style.
                </p>
              </div>
              <button className="w-fit flex items-center
               gap-3 md:py-3 cursor-pointer bg-white
               p-2
                text-black md:px-5 rounded-lg 
                text-sm font-medium hover:bg-gray-200 transition">
                Start Your Journey <FaArrowRight />
              </button>
            </div>
          </div>

          {/* Bottom left card */}
          <div
            className="relative h-1/2 rounded-2xl overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/routes.png')" }}
          >
            <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end">
              <p className="text-white/80 text-3xl mb-3">
                Routes Ready to Explore
              </p>
              <h3 className="text-white text-4xl font-bold">1,895+</h3>
              <p className="text-white/80 text-md mt-1">
                Train routes connecting major Egyptian cities
              </p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div
          className="relative lg:col-span-2 rounded-2xl overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/img.png')" }}
        >
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-center p-6">
            <div>
              <h1 className="text-white text-2xl
               md:text-3xl lg:text-5xl font-semibold leading-snug max-w-3xl">
                Journey. Explore. Remember.
              </h1>
              <p className="text-white/80 md:text-lg mt-4 max-w-2xl mx-auto">
                Experience unforgettable trips across Egypt with our curated
                train routes and cozy stays.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DestinationList;
