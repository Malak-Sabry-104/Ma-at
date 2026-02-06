import { useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { FaArrowRight, FaExchangeAlt, FaPlus, FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

type TripType = "oneway" | "round" | "multicity";

interface Leg {
  from: string;
  to: string;
  departureDate: string;
}

const Hero = () => {
  const { t } = useTranslation();
  const [tripType, setTripType] = useState<TripType>("oneway");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [multiLegs, setMultiLegs] = useState<Leg[]>([
    { from: "", to: "", departureDate: "" },
  ]);

  const [showPassengers, setShowPassengers] = useState(false);
  const [adults, setAdults] = useState(1);
  const [infants, setInfants] = useState(0);
  const [swapped, setSwapped] = useState(false);

  const swapStations = () => {
    setFrom(to);
    setTo(from);
    setSwapped(!swapped);
  };

  const buttonStyle = (type: TripType) =>
    `md:px-4 md:py-2 rounded-lg p-2 
  my-3 text-sm cursor-pointer font-medium transition-all ${tripType === type
      ? "bg-black text-white"
      : "bg-white text-gray-700 hover:bg-gray-100"
    }`;

  // Multi-city handlers
  const updateLeg = (index: number, field: keyof Leg, value: string) => {
    const newLegs = [...multiLegs];
    newLegs[index][field] = value;
    setMultiLegs(newLegs);
  };

  const addLeg = () => {
    setMultiLegs([...multiLegs, { from: "", to: "", departureDate: "" }]);
  };

  const removeLeg = (index: number) => {
    if (multiLegs.length === 1) return; // always keep at least one leg
    setMultiLegs(multiLegs.filter((_, i) => i !== index));
  };
  const ticketClasses = ["Luxury", "Executive", "Business", "Economy"] as const;
  type TicketClass = (typeof ticketClasses)[number];

  const [selectedClass, setSelectedClass] = useState<TicketClass>("Economy");
  return (
    <section id="hero" className="min-h-screen overflow-hidden">
      <div className="bg-black/30 min-h-screen py-12">
        <h1
          className="md:pt-90 pt-25 mx-4 text-white md-w[100%] 
        leading-relaxed md:leading-normal ltr:text-left rtl:text-right
         w-[90%] text-4xl md:text-5xl mb-8"
        >
          {t("hero.title")}
        </h1>

        <div
          className="md:mx-7 bg-black/10 backdrop-blur-md
         rounded-2xl md:p-6 py-2 px-1 md:flex  flex-col"
        >
          {/* Header */}
          <div
            className=" flex md:flex-row flex-col 
        justify-between items-center  mb-6"
          >
            <h2
              className="md:text-2xl md:pt-0 pt-2
             text-white italic font-semibold"
            >
              {t("hero.subtitle")}
            </h2>
            <div className="flex gap-3  ">
              <button
                onClick={() => setTripType("oneway")}
                className={buttonStyle("oneway")}
              >
                {t("hero.oneWay")}
              </button>
              <button
                onClick={() => setTripType("round")}
                className={buttonStyle("round")}
              >
                {t("hero.round")}
              </button>
              <button
                onClick={() => setTripType("multicity")}
                className={buttonStyle("multicity")}
              >
                {t("hero.multiCity")}
              </button>
            </div>
          </div>
          {/* Booking Bar */}
          <div
            className="flex flex-col gap-4 
           bg-white/80 rounded-xl p-4 relative"
          >
            {/* Oneway / Round logic */}
            {(tripType === "oneway" || tripType === "round") && (
              <div
                className="flex 
               flex-wrap items-center md:justify-start
                justify-center gap-3"
              >
                <div
                  className="input-wrapper p-2 md:w-[300px]
                 w-[100%] flex flex-col"
                >
                  <label htmlFor="from" className="mb-2">
                    {t("hero.from")}
                  </label>
                  <input
                    id="from"
                    name="from"
                    className="input ring-3 ring-black/10 p-2
                     rounded-lg focus:outline-0"
                    placeholder={t("hero.from")}
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </div>

                <button
                  onClick={swapStations}
                  className="w-10 h-10 rounded-full md:mt-7
          ring-3 ring-black/10 cursor-pointer flex 
          items-center justify-center hover:bg-gray-100
          transition-transform duration-300"
                  style={{
                    transform: swapped ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <FaExchangeAlt />
                </button>

                <div
                  className="input-wrapper p-2 md:w-[300px]
                 w-[100%] flex flex-col"
                >
                  <label htmlFor="to" className="mb-2">
                    {t("hero.to")}
                  </label>
                  <input
                    id="to"
                    name="to"
                    className="input ring-3 ring-black/10
                     p-2 rounded-lg focus:outline-0"
                    placeholder={t("hero.to")}
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </div>

                <div
                  className="input-wrapper p-2
              md:w-[300px]  w-[100%] flex flex-col"
                >
                  <label htmlFor="departure" className="mb-2">
                    {t("hero.departure")}
                  </label>
                  <input
                    className="input ring-3  w-[100%]
                     ring-black/10 p-2 rounded-lg focus:outline-0"
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                </div>

                {tripType === "round" && (
                  <div className="input-wrapper  flex flex-col">
                    <label htmlFor="return" className="mb-2">
                      {t("hero.return")}
                    </label>
                    <input
                      id="return"
                      name="return"
                      className="input ring-3 ring-black/10
                       p-2 rounded-lg focus:outline-0"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </div>
                )}

                {/* Passengers inline */}
                <div className="relative flex flex-col">
                  <label htmlFor="passengers" className="mb-2">
                    {t("hero.passengers")}
                  </label>
                  <button
                    id="passengers"
                    onClick={() => setShowPassengers(!showPassengers)}
                    className="input  rounded-lg ring-3 
                     ring-black/10 flex items-center gap-2 p-2 cursor-pointer"
                  >
                    <IoMdPerson />
                    {adults} {adults > 1 ? t("hero.adults_plural") : t("hero.adult")}
                    {infants > 0 && `, ${infants} ${t("hero.infant")}`}
                  </button>

                  {showPassengers && (
                    <div
                      className="absolute ltr:right-0 rtl:left-0 top-16 
                     bg-white rounded-xl shadow-lg w-45 p-4 z-20"
                    >
                      <div className="flex  justify-between items-center mb-3">
                        <span>{t("hero.adults")}</span>
                        <div className="flex gap-2 items-center">
                          <button
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            className="counter-btn cursor-pointer"
                          >
                            −
                          </button>
                          <span>{adults}</span>
                          <button
                            onClick={() => setAdults(adults + 1)}
                            className="counter-btn cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>{t("hero.infants")}</span>
                        <div className="flex gap-2 items-center">
                          <button
                            onClick={() => setInfants(Math.max(0, infants - 1))}
                            className="counter-btn cursor-pointer"
                          >
                            −
                          </button>
                          <span>{infants}</span>
                          <button
                            onClick={() => setInfants(infants + 1)}
                            className="counter-btn cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Multi-city logic */}
            {tripType === "multicity" && (
              <div
                className="
      flex w-full lg:w-3/4
      mx-auto flex-col
      p-4 gap-6
    "
              >
                {/* Legs */}
                <div className="space-y-4">
                  {multiLegs.map((leg, index) => (
                    <div
                      key={index}
                      className="
            flex flex-col md:flex-row
            gap-3 items-center justify-center 
             rounded-xl p-3
          "
                    >
                      {/* From */}
                      <div className="input-wrapper flex flex-col w-full lg:w-1/4">
                        <label>{t("hero.from")}</label>
                        <input
                          className="input ring-3 ring-black/10 p-2 rounded-lg focus:outline-0"
                          placeholder={t("hero.from")}
                          value={leg.from}
                          onChange={(e) =>
                            updateLeg(index, "from", e.target.value)
                          }
                        />
                      </div>

                      {/* To */}
                      <div className="input-wrapper flex flex-col w-full lg:w-1/4">
                        <label>{t("hero.to")}</label>
                        <input
                          className="input ring-3 ring-black/10 p-2 rounded-lg focus:outline-0"
                          placeholder={t("hero.to")}
                          value={leg.to}
                          onChange={(e) =>
                            updateLeg(index, "to", e.target.value)
                          }
                        />
                      </div>

                      {/* Date */}
                      <div className="input-wrapper flex flex-col w-full lg:w-1/4">
                        <label>{t("hero.departure")}</label>
                        <div className="flex justify-between gap-3 items-center ">
                          <input
                            type="date"
                            className="input ring-3 ring-black/10
               p-2 rounded-lg focus:outline-0 w-[90%]"
                            value={leg.departureDate}
                            onChange={(e) =>
                              updateLeg(index, "departureDate", e.target.value)
                            }
                          />
                          {/* Remove */}
                          <button
                            onClick={() => removeLeg(index)}
                            className="
              text-red-500 hover:text-red-700
               bg-white/20 rounded-md shadow p-2  
            "
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Controls */}
                <div
                  className="
        flex flex-col md:flex-row
        gap-4 items-center
        justify-center ltr:ms-4 rtl:me-4 
      "
                >
                  {/* Add Leg */}
                  <button
                    onClick={addLeg}
                    className="
          flex items-center gap-2 md:mt-5  p-2
          text-indigo-600 hover:text-indigo-800 font-medium
        "
                  >
                    <FaPlus /> {t("hero.addLeg")}
                  </button>

                  {/* Passengers */}
                  <div className="relative flex flex-col w-full md:w-56">
                    <label className="mb-2">{t("hero.passengers")}</label>
                    <button
                      onClick={() => setShowPassengers(!showPassengers)}
                      className="
            flex justify-center items-center gap-2
            input rounded-lg ring-3 ring-black/10
            p-2 w-full
          "
                    >
                      <IoMdPerson />
                      {adults} {adults > 1 ? t("hero.adults_plural") : t("hero.adult")}
                      {infants > 0 && `, ${infants} ${t("hero.infant")}`}
                    </button>

                    {showPassengers && (
                      <div
                        className="
              absolute ltr:right-0 rtl:left-0 top-full mt-2
              bg-white rounded-xl shadow-lg
              w-full md:w-64 p-4 z-20
            "
                      >
                        {/* Adults */}
                        <div className="flex justify-between items-center mb-3">
                          <span>{t("hero.adults")}</span>
                          <div className="flex gap-2 items-center">
                            <button
                              onClick={() => setAdults(Math.max(1, adults - 1))}
                              className="counter-btn"
                            >
                              −
                            </button>
                            <span>{adults}</span>
                            <button
                              onClick={() => setAdults(adults + 1)}
                              className="counter-btn"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Infants */}
                        <div className="flex justify-between items-center">
                          <span>{t("hero.infants")}</span>
                          <div className="flex gap-2 items-center">
                            <button
                              onClick={() =>
                                setInfants(Math.max(0, infants - 1))
                              }
                              className="counter-btn"
                            >
                              −
                            </button>
                            <span>{infants}</span>
                            <button
                              onClick={() => setInfants(infants + 1)}
                              className="counter-btn"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 mt-4  p-2">
              <label className="ltr:ms-3 rtl:me-3 font-medium text-gray-700">
                {t("hero.ticketClass")}
              </label>

              <div className="flex gap-3 flex-wrap justify-between ltr:mx-3 rtl:mx-3">
                <div
                  className="gap-3 flex  flex-wrap justify-center 
                items-center px-2"
                >
                  {ticketClasses.map((cls) => (
                    <button
                      key={cls}
                      onClick={() => setSelectedClass(cls)}
                      className={`px-4 py-2 
                         rounded-lg text-sm font-medium transition-all
          ${selectedClass === cls
                          ? "bg-black text-white"
                          : "bg-white text-gray-700 ring-1 ring-black/10 hover:bg-gray-100"
                        }`}
                    >
                      {t(`hero.${cls}`)}
                    </button>
                  ))}
                </div>
                <button
                  className="flex  items-center gap-2 
                  justify-center cursor-pointer bg-black rounded-lg
     text-white  p-3 md:w-40  w-full"
                >
                  {t("hero.search")} <FaArrowRight className="rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

