import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaTrain, FaClock, FaUsers, FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaIdCard, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import * as bookingApi from "../api/booking.api";
import * as trainApi from "../api/train.api";

interface TrainResult {
    id: number;
    train_number: string;
    departure_time: string;
    arrival_time: string;
    duration: string;
    duration_minutes: number;
    fare_per_passenger: number;
    total_fare: number;
    class: { name_ar: string; name_en: string };
}

interface StationInfo {
    id: number;
    name?: string;
    name_ar?: string;
    name_en?: string;
}

interface SearchResultsData {
    from: StationInfo;
    to: StationInfo;
    date: string;
    passengers: number;
    ticketClass: string;
    trains: TrainResult[];
}

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === "ar";

    const [results, setResults] = useState<SearchResultsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [bookingStatus, setBookingStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
    const [bookingInProgress, setBookingInProgress] = useState<number | null>(null);

    // Read search params from URL
    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";
    const date = searchParams.get("date") || "";
    const passengers = parseInt(searchParams.get("passengers") || "1");
    const ticketClass = searchParams.get("class") || "";

    useEffect(() => {
        if (!from || !to || !date) {
            setLoading(false);
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            try {
                const response = await trainApi.searchTrains({
                    from,
                    to,
                    date,
                    passengers,
                    ticketClass: ticketClass || undefined,
                });
                setResults(response.data.results);
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [from, to, date, passengers, ticketClass]);

    const getStationDisplayName = (station: StationInfo) => {
        if (isAr) return station.name_ar || station.name || station.name_en || "";
        return station.name_en || station.name || station.name_ar || "";
    };

    const handleBooking = async (train: TrainResult) => {
        try {
            setBookingInProgress(train.id);
            setBookingStatus({ type: null, message: '' });

            const response = await bookingApi.createBooking(
                train.id,
                passengers,
                {
                    from: results?.from?.name_ar || from,
                    to: results?.to?.name_ar || to,
                    date,
                    ticketClass,
                }
            );

            setBookingStatus({
                type: 'success',
                message: `Booking confirmed! Booking ID: ${response.data.booking.id}`
            });

            setTimeout(() => setBookingStatus({ type: null, message: '' }), 5000);
        } catch (error: any) {
            setBookingStatus({
                type: 'error',
                message: error.response?.data?.error || 'Failed to create booking'
            });
            setTimeout(() => setBookingStatus({ type: null, message: '' }), 5000);
        } finally {
            setBookingInProgress(null);
        }
    };

    // Loading state
    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-6"></div>
                        <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Searching trains...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    // No params or no results
    if (!from || !to || !results) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center bg-white p-12 rounded-[2rem] shadow-xl border border-gray-100 max-w-md w-full mx-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <FaTrain className="text-3xl text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-black text-black mb-2">No search results found</h2>
                        <p className="text-gray-500 mb-8">We couldn't find any journeys matching your criteria. Try adjusting your filters.</p>
                        <button
                            onClick={() => navigate("/")}
                            className="w-full bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-black/10"
                        >
                            Back to Search
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 py-20 px-4">
                <div className="max-w-6xl mx-auto w-full">
                    {/* Header Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        <button
                            onClick={() => navigate("/")}
                            className="group flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-all font-bold text-sm uppercase tracking-widest"
                        >
                            <FaArrowLeft className="rtl:rotate-180 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
                            Back to Home
                        </button>

                        {/* Toast Notification */}
                        <AnimatePresence>
                            {bookingStatus.type && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    className={`mb-6 p-4 rounded-2xl border-2 flex items-center gap-3 ${bookingStatus.type === 'success'
                                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                                        : 'bg-red-50 border-red-500 text-red-900'
                                        }`}
                                >
                                    {bookingStatus.type === 'success' ? (
                                        <FaCheckCircle className="text-2xl text-emerald-500" />
                                    ) : (
                                        <FaExclamationCircle className="text-2xl text-red-500" />
                                    )}
                                    <p className="font-black flex-1">{bookingStatus.message}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="bg-white rounded-[2rem] p-8 border border-gray-200 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-32 -mt-32"></div>

                            <div className="relative z-10">
                                <h1 className="text-4xl font-black text-black tracking-tight mb-8">
                                    Available Journeys
                                </h1>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    <div className="space-y-1">
                                        <p className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest font-black">
                                            <FaMapMarkerAlt className="text-blue-500" /> From
                                        </p>
                                        <p className="text-xl font-black text-black">{getStationDisplayName(results.from)}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest font-black">
                                            <FaMapMarkerAlt className="text-emerald-500" /> To
                                        </p>
                                        <p className="text-xl font-black text-black">{getStationDisplayName(results.to)}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest font-black">
                                            <FaCalendarAlt className="text-orange-500" /> Date
                                        </p>
                                        <p className="text-xl font-black text-black">{results.date}</p>
                                        {results.ticketClass && results.ticketClass !== "all" && (
                                            <p className="text-xs text-gray-400 font-bold">{results.ticketClass} Class</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest font-black">
                                            <FaUsers className="text-purple-500" /> Passengers
                                        </p>
                                        <p className="text-xl font-black text-black">{results.passengers}</p>
                                        <p className="text-xs text-gray-400 font-bold">{results.passengers > 1 ? 'Travellers' : 'Traveller'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Results List */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="space-y-6"
                    >
                        {results.trains.map((train) => (
                            <motion.div
                                key={train.id}
                                variants={item}
                                whileHover={{ y: -4 }}
                                className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-lg hover:shadow-2xl transition-all group"
                            >
                                <div className="flex flex-col xl:flex-row gap-10 items-center">
                                    {/* Train Identity */}
                                    <div className="w-full xl:w-48 space-y-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-black group-hover:text-white transition-colors">
                                                <FaTrain className="text-xl" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-black text-black leading-none">{train.train_number}</p>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mt-1">
                                                    {isAr ? train.class?.name_ar : train.class?.name_en || "Train"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-blue-600 font-black text-xs bg-blue-50 px-3 py-1.5 rounded-xl w-fit">
                                            <FaIdCard className="text-sm" />
                                            {isAr ? train.class?.name_ar : train.class?.name_en || "—"}
                                        </div>
                                    </div>

                                    {/* Route Timeline */}
                                    <div className="flex-1 w-full">
                                        <div className="flex items-center justify-between relative">
                                            <div className="text-center md:text-left">
                                                <p className="text-4xl font-black text-black tracking-tighter">{train.departure_time}</p>
                                                <p className="text-sm font-bold text-gray-400 mt-1">{getStationDisplayName(results.from)}</p>
                                            </div>

                                            <div className="flex-1 mx-8 relative">
                                                <div className="absolute inset-0 flex items-center">
                                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ x: "-100%" }}
                                                            animate={{ x: "100%" }}
                                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                            className="w-1/3 h-full bg-blue-600 blur-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="relative z-10 flex justify-center">
                                                    <div className="bg-white px-4 py-1.5 rounded-full border border-gray-200 shadow-sm flex items-center gap-2 text-gray-500">
                                                        <FaClock className="text-xs" />
                                                        <span className="text-xs font-black tracking-tighter">{train.duration}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-center md:text-right">
                                                <p className="text-4xl font-black text-black tracking-tighter">{train.arrival_time}</p>
                                                <p className="text-sm font-bold text-gray-400 mt-1">{getStationDisplayName(results.to)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fare & Booking */}
                                    <div className="w-full xl:w-64 flex flex-col md:flex-row xl:flex-col gap-6 items-center">
                                        <div className="flex-1 text-center md:text-left xl:text-center w-full">
                                            <p className="text-4xl font-black text-black tracking-tighter">
                                                {(train.total_fare ?? train.fare_per_passenger ?? 0).toFixed(0)} <span className="text-sm text-gray-400">EGP</span>
                                            </p>
                                            {passengers > 1 && (
                                                <p className="text-xs text-gray-400 font-bold mt-1">
                                                    {(train.fare_per_passenger ?? 0).toFixed(0)} EGP × {passengers}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleBooking(train)}
                                            disabled={bookingInProgress === train.id}
                                            className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-black py-5 px-8 rounded-2xl transition-all shadow-xl shadow-black/10 hover:shadow-black/20 text-sm uppercase tracking-widest active:scale-95 disabled:cursor-not-allowed"
                                        >
                                            {bookingInProgress === train.id ? 'Booking...' : 'Book Seat'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {results.trains.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white rounded-[2rem] p-20 border border-gray-100 shadow-xl text-center"
                        >
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaTrain className="text-4xl text-gray-200" />
                            </div>
                            <h3 className="text-2xl font-black text-black">No trains found</h3>
                            <p className="text-gray-400 mt-2 max-w-sm mx-auto">No scheduled routes match your search criteria for this date.</p>
                            <button
                                onClick={() => navigate("/")}
                                className="mt-8 text-blue-600 font-bold hover:underline"
                            >
                                Try different dates
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default SearchResults;
