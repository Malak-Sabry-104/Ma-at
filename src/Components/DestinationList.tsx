import { useState } from "react";
import { Target, Heart, Train } from "lucide-react";
import alex from "../assets/alex.jpg";
import aswan from "../assets/aswan.jpg";
import giza from "../assets/giza.jpg";
import cairoImg from "../assets/cairo.jpg";
import visa from "../assets/visa-logo.png";
import masterCard from "../assets/Mastercard-logo.svg";
import { FaArrowRight, FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const DestinationList = () => {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const destinationsData = [
    {
      name: `${t("footer.routes.alex")} ${t("footer.routes.to")} ${t("footer.routes.damanhour")}`,
      image: alex,
      price: 115,
      target: t("hero.Economy"),
    },
    {
      name: `${t("footer.routes.aswan")} ${t("footer.routes.to")} ${t("footer.routes.luxor")}`,
      image: aswan,
      price: 180,
      target: t("hero.Luxury")
    },
    {
      name: `${t("footer.routes.cairo")} ${t("footer.routes.to")} ${t("footer.routes.cairo")}`, // Wait, Giza to Cairo? 
      image: giza,
      price: 90,
      target: t("hero.Business")
    },
    {
      name: `${t("footer.routes.cairo")} ${t("footer.routes.to")} ${t("footer.routes.alex")}`,
      image: cairoImg,
      price: 120,
      target: t("hero.Luxury")
    },
  ];

  const egyptTrainRoutes = [
    { from: "cairo", to: "alex" },
    { from: "cairo", to: "tanta" },
    { from: "cairo", to: "mansoura" },
    { from: "cairo", to: "zagazig" },
    { from: "cairo", to: "benha" },
    { from: "cairo", to: "damanhour" },
    { from: "cairo", to: "ismailia" },
    { from: "cairo", to: "portSaid" },
    { from: "cairo", to: "suez" },
    { from: "cairo", to: "minya" },
    { from: "cairo", to: "asyut" },
    { from: "cairo", to: "sohag" },
    { from: "cairo", to: "qena" },
    { from: "cairo", to: "luxor" },
    { from: "cairo", to: "aswan" },
    { from: "alex", to: "tanta" },
    { from: "tanta", to: "mansoura" },
    { from: "benha", to: "zagazig" },
  ];

  const toggleFavorite = (index: number) => {
    setFavorites((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <>
      {/* section 2 */}
      <section className="px-6 py-10 ltr:text-left rtl:text-right">
        <h1 className="text-3xl font-semibold mb-6">
          {t("footer.popularRoutes")}
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
                  className="absolute top-3 ltr:right-3 rtl:left-3 bg-white/90 rounded-full p-1 shadow cursor-pointer active:scale-90 transition"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${favorites[index]
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
                  {t("footer.egyptianRailways")}
                </span>

                <span className="text-xs text-gray-500 mt-1">{t("footer.startFrom")}</span>

                <p className="text-2xl">{dest.price} {t("footer.currency")}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* section 3 */}
      <section className="px-6 ltr:text-left rtl:text-right">
        <h1 className="font-semibold mb-3 text-3xl ">
          {t("footer.trendingRoutes")}
        </h1>
        <p className="text-gray-500">
          {t("footer.trendingDescription")}
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
            cursor-pointer
            hover:border-gray-700
            hover:shadow-sm
            active:scale-95
          "
            >
              {t(`footer.routes.${route.from}`)} {t("footer.routes.to")} {t(`footer.routes.${route.to}`)}
            </button>
          ))}
        </div>
      </section>

      {/* section 4 */}
      <section className="px-6 mt-6 mb-5 ltr:text-left rtl:text-right">
        <h1 className="text-3xl font-semibold mb-6">
          {t("footer.promoTitle")}
        </h1>
        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-4 overflow-x-auto py-5 px-4">
          {/* Mastercard Offer */}
          <div
            className="min-w-[30%] flex 
          rounded-2xl bg-white p-2 shadow-customized border border-gray-200"
          >
            <div className="w-24 flex flex-col items-center justify-center bg-[#F6EFE6] ltr:rounded-l-2xl rtl:rounded-r-2xl">
              <img src={masterCard} alt="Mastercard" className="mb-2" />
              <span className="text-sm font-semibold text-gray-900 uppercase">
                25% {t("footer.off")}
              </span>
            </div>

            <div className="flex-1 flex items-center px-4">
              <p className="text-sm font-medium text-gray-800">
                {t("footer.discountMastercard")}
              </p>
            </div>
          </div>

          {/* Visa Offer */}
          <div
            className="min-w-[30%] flex 
          rounded-2xl bg-white p-2 shadow-customized  border border-gray-200"
          >
            <div className="w-24 flex flex-col items-center justify-center bg-[#EEF0FF] ltr:rounded-l-2xl rtl:rounded-r-2xl">
              <img src={visa} alt="Visa" className="mb-2" />
              <span className="text-sm font-semibold text-gray-900 uppercase">
                33% {t("footer.off")}
              </span>
            </div>

            <div className="flex-1 flex items-center px-4">
              <p className="text-sm font-medium text-gray-800">
                {t("footer.discountVisa")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section 5 */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 min-h-[80vh] ltr:text-left rtl:text-right">
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
                  {t("footer.travelBeyond")}
                </h2>
                <p className="text-white/80 text-md">
                  {t("footer.travelBeyondDesc")}
                </p>
              </div>
              <button className="w-fit flex items-center
               gap-3 md:py-3 cursor-pointer bg-white
               px-4 py-2
                text-black rounded-lg 
                text-sm font-medium hover:bg-gray-200 transition">
                {t("footer.startJourney")} <FaArrowRight className="rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* Bottom left card */}
          <div
            className="relative h-[350px] md:h-1/2 rounded-2xl overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/routes.png')" }}
          >
            <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end">
              <p className="text-white/80 text-3xl mb-3">
                {t("footer.routesToExplore")}
              </p>
              <h3 className="text-white text-4xl font-bold">1,895+</h3>
              <p className="text-white/80 text-md mt-1">
                {t("footer.routesToExploreDesc")}
              </p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div
          className="relative lg:col-span-2
           rounded-2xl h-[350px] md:h-[550px] overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/img.png')" }}
        >
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-center p-6">
            <div>
              <h1 className="text-white text-2xl
               md:text-3xl lg:text-5xl font-semibold leading-snug max-w-3xl">
                {t("footer.journeyExploreRemember")}
              </h1>
              <p className="text-white/80 md:text-lg mt-4 max-w-2xl mx-auto">
                {t("footer.journeyDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DestinationList;

