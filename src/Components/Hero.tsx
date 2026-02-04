import { useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { FaExchangeAlt, FaPlus, FaTrash } from "react-icons/fa";

type TripType = "oneway" | "round" | "multicity";

interface Leg {
  from: string;
  to: string;
  departureDate: string;
}

const Hero = () => {
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
    `px-4 py-2 rounded-lg my-3 text-sm cursor-pointer font-medium transition-all ${
      tripType === type
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

  return (
    <section id="hero" className="min-h-screen">
      <div className="bg-black/30 min-h-screen py-12">
        <h1 className="pt-90 ms-4 text-white text-5xl mb-8">
          Navigate the world by rail
        </h1>

        <div className="mx-7 bg-white/10 backdrop-blur-md rounded-2xl p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-white italic font-semibold">
              Find Your Train Journey
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => setTripType("oneway")}
                className={buttonStyle("oneway")}
              >
                One Way
              </button>
              <button
                onClick={() => setTripType("round")}
                className={buttonStyle("round")}
              >
                Round
              </button>
              <button
                onClick={() => setTripType("multicity")}
                className={buttonStyle("multicity")}
              >
                Multi-City
              </button>
            </div>
          </div>
          {/* Booking Bar */}
          <div className="flex flex-col gap-4 bg-white/80 rounded-xl p-4 relative">
            {/* Oneway / Round logic */}
            {(tripType === "oneway" || tripType === "round") && (
              <div className="flex flex-wrap items-center gap-3">
                <div className="input-wrapper flex flex-col">
                  <label htmlFor="from" className="mb-2">
                    From
                  </label>
                  <input
                    id="from"
                    name="from"
                    className="input ring-3 ring-black/10 p-2 rounded-lg focus:outline-0"
                    placeholder="Origin station"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </div>

                <button
                  onClick={swapStations}
                  className="w-10 h-10 rounded-full mt-7
          ring-3 ring-black/10 cursor-pointer flex 
          items-center justify-center hover:bg-gray-100
          transition-transform duration-300"
                  style={{
                    transform: swapped ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <FaExchangeAlt />
                </button>

                <div className="input-wrapper flex flex-col">
                  <label htmlFor="to" className="mb-2">
                    To
                  </label>
                  <input
                    id="to"
                    name="to"
                    className="input ring-3 ring-black/10 p-2 rounded-lg focus:outline-0"
                    placeholder="Destination station"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </div>

                <div className="input-wrapper flex flex-col">
                  <label htmlFor="departure" className="mb-2">
                    Departure
                  </label>
                  <input
                    className="input ring-3 ring-black/10 p-2 rounded-lg focus:outline-0"
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                </div>

                {tripType === "round" && (
                  <div className="input-wrapper flex flex-col">
                    <label htmlFor="return" className="mb-2">
                      Return
                    </label>
                    <input
                      id="return"
                      name="return"
                      className="input ring-3 ring-black/10 p-2 rounded-lg focus:outline-0"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </div>
                )}

                {/* Passengers inline */}
                <div className="relative flex flex-col">
                  <label htmlFor="passengers" className="mb-2">
                    Passengers
                  </label>
                  <button
                    id="passengers"
                    onClick={() => setShowPassengers(!showPassengers)}
                    className="input rounded-lg ring-3 
                     ring-black/10 flex items-center gap-2 p-2 cursor-pointer"
                  >
                    <IoMdPerson />
                    {adults} adult{adults > 1 && "s"}
                    {infants > 0 && `, ${infants} infant`}
                  </button>

                  {showPassengers && (
                    <div className="absolute right-0  top-16 
                     bg-white rounded-xl shadow-lg w-64 p-4 z-20">
                      <div className="flex  justify-between items-center mb-3">
                        <span>Adults</span>
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
                        <span>Infants</span>
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
                className="flex w-[50%] items-center
                mx-auto flex-col p-2 gap-4"
              >
                <div className=" p-2">
                  {multiLegs.map((leg, index) => (
                    <div key={index} className="flex mb-2 items-center gap-3">
                      <div className="input-wrapper flex flex-col">
                        <label>From</label>
                        <input
                          className="input ring-3 ring-black/10 p-2 rounded-lg focus:outline-0"
                          placeholder="Origin station"
                          value={leg.from}
                          onChange={(e) =>
                            updateLeg(index, "from", e.target.value)
                          }
                        />
                      </div>

                      <div className="input-wrapper flex flex-col">
                        <label>To</label>
                        <input
                          className="input ring-3 ring-black/10 p-2 rounded-lg focus:outline-0"
                          placeholder="Destination station"
                          value={leg.to}
                          onChange={(e) =>
                            updateLeg(index, "to", e.target.value)
                          }
                        />
                      </div>

                      <div className="input-wrapper flex flex-col">
                        <label>Departure</label>
                        <input
                          type="date"
                          className="input ring-3 ring-black/10 p-2 rounded-lg focus:outline-0"
                          value={leg.departureDate}
                          onChange={(e) =>
                            updateLeg(index, "departureDate", e.target.value)
                          }
                        />
                      </div>

                      <button
                        onClick={() => removeLeg(index)}
                        className="mt-6 text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>

                <div
                  className="flex gap-8 py-2 items-center
                 justify-between  px-12.5"
                >
                  <button
                    onClick={addLeg}
                    className="flex items-center gap-2 mt-2
                     text-blue-500 hover:text-blue-700"
                  >
                    <FaPlus /> Add another flight
                  </button>

                  {/* Passengers for multi-city */}
                  <div className="relative flex flex-col w-25 mt-2">
                    <label htmlFor="passengers" className="mb-2">
                      Passengers
                    </label>
                    <button
                      id="passengers"
                      onClick={() => setShowPassengers(!showPassengers)}
                      className="w-42.5 flex justify-center input rounded-lg 
                      ring-3 ring-black/10 items-center gap-2 p-2 cursor-pointer"
                    >
                      <IoMdPerson />
                      {adults} adult{adults > 1 && "s"}
                      {infants > 0 && `, ${infants} infant`}
                    </button>

                    {showPassengers && (
                      <div
                        className="absolute right-0 top-14 bg-
                     rounded-xl shadow-lg  w-64 p-4 z-20 bg-white mt-6"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span>Adults</span>
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
                          <span>Infants</span>
                          <div className="flex gap-2 items-center">
                            <button
                              onClick={() =>
                                setInfants(Math.max(0, infants - 1))
                              }
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
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
