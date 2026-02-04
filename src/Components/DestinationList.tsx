import { useState } from "react";
import { Target, Heart, Train } from "lucide-react";
import alex from "../assets/alex.jpg";
import aswan from "../assets/aswan.jpg";
import giza from "../assets/giza.jpg";
import cairo from "../assets/cairo.jpg";

const destinationsData = [
  { name: "Alexandria to Beheira", image: alex, price: 115, target: "Economy" },
  { name: "Aswan to Luxor", image: aswan, price: 180, target: "Luxury" },
  { name: "Giza to Cairo", image: giza, price: 90, target: "Business" },
  { name: "Cairo to Alexandria", image: cairo, price: 120, target: "Luxury" },
];

const DestinationList = () => {
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const toggleFavorite = (index: number) => {
    setFavorites((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
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
  );
};

export default DestinationList;
