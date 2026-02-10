import { useState, useEffect, useRef } from "react";
import { IoMdPerson } from "react-icons/io";
import { FaArrowRight, FaExchangeAlt, FaPlus, FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as trainApi from "../api/train.api";

type TripType = "oneway" | "round" | "multicity";

interface Leg {
  from: string;
  to: string;
  departureDate: string;
}

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Autocomplete state
  const [fromSuggestions, setFromSuggestions] = useState<any[]>([]);
  const [toSuggestions, setToSuggestions] = useState<any[]>([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [isLoadingFrom, setIsLoadingFrom] = useState(false);
  const [isLoadingTo, setIsLoadingTo] = useState(false);
  const fromInputRef = useRef<HTMLDivElement>(null);
  const toInputRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const swapStations = () => {
    setFrom(to);
    setTo(from);
    setSwapped(!swapped);
  };

  // Debounced station search
  const searchStations = async (query: string, type: 'from' | 'to') => {
    if (!query || query.trim().length === 0) {
      if (type === 'from') {
        setFromSuggestions([]);
        setShowFromDropdown(false);
      } else {
        setToSuggestions([]);
        setShowToDropdown(false);
      }
      return;
    }

    if (type === 'from') setIsLoadingFrom(true);
    else setIsLoadingTo(true);

    try {
      const response = await trainApi.searchStations(query);
      const stations = response.data.stations || [];

      if (type === 'from') {
        setFromSuggestions(stations);
        setShowFromDropdown(stations.length > 0);
      } else {
        setToSuggestions(stations);
        setShowToDropdown(stations.length > 0);
      }
    } catch (error) {
      console.error('Station search error:', error);
    } finally {
      if (type === 'from') setIsLoadingFrom(false);
      else setIsLoadingTo(false);
    }
  };

  const handleFromChange = (value: string) => {
    setFrom(value);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      searchStations(value, 'from');
    }, 300);
  };

  const handleToChange = (value: string) => {
    setTo(value);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      searchStations(value, 'to');
    }, 300);
  };

  const selectFromStation = (station: any) => {
    setFrom(station.name_ar || station.name_en || station.name);
    setShowFromDropdown(false);
    setFromSuggestions([]);
  };

  const selectToStation = (station: any) => {
    setTo(station.name_ar || station.name_en || station.name);
    setShowToDropdown(false);
    setToSuggestions([]);
  };

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromInputRef.current && !fromInputRef.current.contains(event.target as Node)) {
        setShowFromDropdown(false);
      }
      if (toInputRef.current && !toInputRef.current.contains(event.target as Node)) {
        setShowToDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async () => {
    setSearchError("");

    if (!from || !to || !departureDate) {
      setSearchError("Please fill in all required fields");
      return;
    }

    // Build query params URL so the results page is shareable and refreshable
    const params = new URLSearchParams({
      from,
      to,
      date: departureDate,
      passengers: String(adults + infants),
    });

    if (selectedClass && selectedClass !== "All") {
      params.set("class", selectedClass);
    }

    navigate(`/search-results?${params.toString()}`);
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
  const ticketClasses = ["All", "VIP", "Spanish", "Russian", "Sleeping", "Talgo"] as const;
  type TicketClass = (typeof ticketClasses)[number];

  const [selectedClass, setSelectedClass] = useState<TicketClass>("All");
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
                  ref={fromInputRef}
                  className="input-wrapper p-2 md:w-[300px]
                 w-[100%] flex flex-col relative"
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
                    onChange={(e) => handleFromChange(e.target.value)}
                    onFocus={() => from && searchStations(from, 'from')}
                    autoComplete="off"
                  />
                  {showFromDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                      {isLoadingFrom ? (
                        <div className="p-4 text-center text-gray-500">
                          <div className="inline-block w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                        </div>
                      ) : fromSuggestions.length > 0 ? (
                        fromSuggestions.map((station) => (
                          <button
                            key={station.id}
                            onClick={() => selectFromStation(station)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                          >
                            <div className="font-medium text-gray-900">{station.name_ar || station.name}</div>
                            <div className="text-sm text-gray-500">{station.name_en}</div>
                          </button>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500 text-sm">
                          No stations found
                        </div>
                      )}
                    </div>
                  )}
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
                  ref={toInputRef}
                  className="input-wrapper p-2 md:w-[300px]
                 w-[100%] flex flex-col relative"
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
                    onChange={(e) => handleToChange(e.target.value)}
                    onFocus={() => to && searchStations(to, 'to')}
                    autoComplete="off"
                  />
                  {showToDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                      {isLoadingTo ? (
                        <div className="p-4 text-center text-gray-500">
                          <div className="inline-block w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                        </div>
                      ) : toSuggestions.length > 0 ? (
                        toSuggestions.map((station) => (
                          <button
                            key={station.id}
                            onClick={() => selectToStation(station)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                          >
                            <div className="font-medium text-gray-900">{station.name_ar || station.name}</div>
                            <div className="text-sm text-gray-500">{station.name_en}</div>
                          </button>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500 text-sm">
                          No stations found
                        </div>
                      )}
                    </div>
                  )}
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
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="flex  items-center gap-2 
                  justify-center cursor-pointer bg-black rounded-lg
     text-white  p-3 md:w-40  w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSearching ? "Searching..." : t("hero.search")} {!isSearching && <FaArrowRight className="rtl:rotate-180" />}
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

