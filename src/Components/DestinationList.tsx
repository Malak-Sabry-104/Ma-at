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
import { useNavigate } from "react-router-dom";

const DestinationList = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isAr = i18n.language === "ar";
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  // Real popular routes with actual fares from the database
  const destinationsData = [
    {
      fromKey: "cairo",
      toKey: "alex",
      fromAr: "القاهره",
      toAr: "الاسكندريه",
      image: cairoImg,
      price: 90,
      trainClass: "Spanish",
      trainClassAr: "اسباني مطور",
      duration: "2h 30m",
    },
    {
      fromKey: "cairo",
      toKey: "aswan",
      fromAr: "القاهره",
      toAr: "اسوان",
      image: aswan,
      price: 380,
      trainClass: "Sleeping",
      trainClassAr: "القطار النائم",
      duration: "13h",
    },
    {
      fromKey: "aswan",
      toKey: "luxor",
      fromAr: "اسوان",
      toAr: "الاقصر",
      image: giza,
      price: 115,
      trainClass: "VIP",
      trainClassAr: "خدمه خاصه VIP",
      duration: "3h",
    },
    {
      fromKey: "cairo",
      toKey: "luxor",
      fromAr: "القاهره",
      toAr: "الاقصر",
      image: alex,
      price: 90,
      trainClass: "Russian",
      trainClassAr: "روسي",
      duration: "9h 30m",
    },
  ];

  // Real trending routes — all actually served by Egyptian Railways
  const egyptTrainRoutes = [
    { from: "cairo", to: "alex", fromAr: "القاهره", toAr: "الاسكندريه" },
    { from: "cairo", to: "tanta", fromAr: "القاهره", toAr: "طنطا" },
    { from: "cairo", to: "mansoura", fromAr: "القاهره", toAr: "المنصوره" },
    { from: "cairo", to: "zagazig", fromAr: "القاهره", toAr: "الزقازيق" },
    { from: "cairo", to: "benha", fromAr: "القاهره", toAr: "بنها" },
    { from: "cairo", to: "damanhour", fromAr: "القاهره", toAr: "دمنهور" },
    { from: "cairo", to: "ismailia", fromAr: "القاهره", toAr: "الاسماعيليه" },
    { from: "cairo", to: "portSaid", fromAr: "القاهره", toAr: "بورسعيد" },
    { from: "cairo", to: "suez", fromAr: "القاهره", toAr: "السويس" },
    { from: "cairo", to: "minya", fromAr: "القاهره", toAr: "المنيا" },
    { from: "cairo", to: "asyut", fromAr: "القاهره", toAr: "اسيوط" },
    { from: "cairo", to: "sohag", fromAr: "القاهره", toAr: "سوهاج" },
    { from: "cairo", to: "qena", fromAr: "القاهره", toAr: "قنا" },
    { from: "cairo", to: "luxor", fromAr: "القاهره", toAr: "الاقصر" },
    { from: "cairo", to: "aswan", fromAr: "القاهره", toAr: "اسوان" },
    { from: "alex", to: "tanta", fromAr: "الاسكندريه", toAr: "طنطا" },
    { from: "tanta", to: "mansoura", fromAr: "طنطا", toAr: "المنصوره" },
    { from: "benha", to: "zagazig", fromAr: "بنها", toAr: "الزقازيق" },
  ];

  const toggleFavorite = (index: number) => {
    setFavorites((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Navigate to search results with query params
  const navigateToRoute = (fromAr: string, toAr: string) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split("T")[0];

    const params = new URLSearchParams({
      from: fromAr,
      to: toAr,
      date: dateStr,
      passengers: "1",
    });

    navigate(`/search-results?${params.toString()}`);
  };

  return (
    <>
      {/* section 2 - Popular Routes */}
      <section className="px-6 py-10 ltr:text-left rtl:text-right">
        <h1 className="text-3xl font-semibold mb-6">
          {t("footer.popularRoutes")}
        </h1>

        <div className="flex flex-wrap gap-6 justify-center">
          {destinationsData.map((dest, index) => (
            <div
              key={index}
              onClick={() => navigateToRoute(dest.fromAr, dest.toAr)}
              className="w-72 overflow-hidden bg-white rounded-xl shadow cursor-pointer hover:shadow-lg transition-shadow group"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={dest.image}
                  alt={`${t(`footer.routes.${dest.fromKey}`)} ${t("footer.routes.to")} ${t(`footer.routes.${dest.toKey}`)}`}
                  className="w-full h-44 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Favorite button */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(index); }}
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

                {/* Duration badge */}
                <div className="absolute bottom-2 ltr:left-2 rtl:right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
                  ⏱ {dest.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">
                  {t(`footer.routes.${dest.fromKey}`)} {t("footer.routes.to")} {t(`footer.routes.${dest.toKey}`)}
                </h2>

                <span className="flex items-center gap-2 text-gray-600 text-sm">
                  <Target className="w-4 h-4" />
                  {isAr ? dest.trainClassAr : dest.trainClass}
                </span>

                <span className="flex items-center gap-2 text-gray-500 text-sm">
                  <Train className="w-4 h-4" />
                  {t("footer.egyptianRailways")}
                </span>

                <span className="text-xs text-gray-500 mt-1">{t("footer.startFrom")}</span>

                <p className="text-2xl font-bold">{dest.price} {t("footer.currency")}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* section 3 - Trending Routes */}
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
              onClick={() => navigateToRoute(route.fromAr, route.toAr)}
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

      {/* section 4 - Promo */}
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

      {/* section 5 - Grid showcase */}
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
              <button
                onClick={() => navigate("/")}
                className="w-fit flex items-center
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
              <h3 className="text-white text-4xl font-bold">831+</h3>
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
