import { useState } from "react";
import { IoMdPerson } from "react-icons/io";

type TripType = "oneway" | "round" | "multicity";

const Hero = () => {
  const [tripType, setTripType] = useState<TripType>("oneway");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [showPassengers, setShowPassengers] = useState(false);
  const [adults, setAdults] = useState(1);
  const [infants, setInfants] = useState(0);

  const swapStations = () => {
    setFrom(to);
    setTo(from);
  };

  const buttonStyle = (type: TripType) =>
    `px-4 py-2 rounded-lg my-3 text-sm font-medium transition-all ${
      tripType === type
        ? "bg-black text-white"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <section
      id="hero"
      className="h-screen  "
    >
      <div className="bg-black/20 h-screen ">

  
      <h1 className="pt-105 ms-4 text-white text-5xl mb-8">
        Navigate the world by rail
      </h1>

      <div className="mx-7 bg-white/10 backdrop-blur-md rounded-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-white font-semibold">Find Your Train Journey</h2>

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
              Return
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
        <div className="flex items-center gap-3 bg-white rounded-xl p-4 relative">
          <input
            className="input"
            placeholder="Origin station"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />

          <button
            onClick={swapStations}
            className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100"
          >
            ⇄
          </button>

          <input
            className="input"
            placeholder="Destination station"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />

          <input
            className="input"
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />

          {tripType === "round" && (
            <input
              className="input"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          )}

          {/* Passengers */}
          <div className="relative">
            <button
              onClick={() => setShowPassengers(!showPassengers)}
              className="input flex items-center gap-2"
            >
              <IoMdPerson />
              {adults} adult{adults > 1 && "s"}
              {infants > 0 && `, ${infants} infant`}
            </button>

            {showPassengers && (
              <div className="absolute right-0 top-14 bg-white rounded-xl shadow-lg w-64 p-4 z-20">
                {/* Adults */}
                <div className="flex justify-between items-center mb-3">
                  <span>Adults</span>
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
                  <span>Infants</span>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => setInfants(Math.max(0, infants - 1))}
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
          </div>
    </section>
  );
};

export default Hero;
