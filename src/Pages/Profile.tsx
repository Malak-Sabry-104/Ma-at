import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import {
    FaEdit, FaSave, FaTimes, FaDownload, FaQrcode,
    FaUser, FaEnvelope, FaPhone, FaVenusMars, FaIdCard, FaWallet,
    FaTrain, FaMapMarkerAlt, FaCalendarAlt, FaTimesCircle, FaTicketAlt
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";
import Layout from "../Components/Layout";
import * as bookingApi from "../api/booking.api";

interface Booking {
    id: string;
    train_id: number;
    passengers: number;
    fare_per_passenger: number;
    total_fare: number;
    status: string;
    booking_date: string;
    from_station: string;
    to_station: string;
    travel_date: string;
    ticket_class: string;
    train?: {
        id: number;
        train_number: string;
        train_classes?: {
            name_ar: string;
            name_en: string;
        };
    };
}

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const { t, i18n } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState("");

    // Bookings state
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [bookingsLoading, setBookingsLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        gender: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                full_name: user?.full_name || "",
                email: user?.email || "",
                phone: user?.phone || "",
                gender: user?.gender || ""
            });

            if (user?.card_id) {
                QRCode.toDataURL(user.card_id, {
                    width: 300,
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    }
                }).then(url => {
                    setQrCodeUrl(url);
                }).catch(err => {
                    console.error('QR Code generation error:', err);
                });
            }

            // Fetch bookings
            fetchBookings();
        }
    }, [user]);

    const fetchBookings = async () => {
        setBookingsLoading(true);
        try {
            const res = await bookingApi.getUserBookings();
            setBookings(res.data.bookings || []);
        } catch {
            setBookings([]);
        } finally {
            setBookingsLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId: string) => {
        if (!confirm("Are you sure you want to cancel this booking? The fare will be refunded to your balance.")) return;
        setCancellingId(bookingId);
        try {
            await bookingApi.cancelBooking(bookingId);
            // Refresh bookings
            await fetchBookings();
        } catch (err) {
            console.error("Cancel error:", err);
        } finally {
            setCancellingId(null);
        }
    };

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateProfile(formData);
            setIsEditing(false);
        } catch (error) {
            console.error("Profile update error:", error);
        } finally {
            setLoading(false);
        }
    };

    const downloadQR = () => {
        if (qrCodeUrl) {
            const link = document.createElement('a');
            link.href = qrCodeUrl;
            link.download = `MAAT-Digital-Card-${user?.card_id}.png`;
            link.click();
        }
    };

    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString(i18n.language === "ar" ? "ar-EG" : "en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        } catch {
            return dateStr;
        }
    };

    const statusStyles: Record<string, string> = {
        confirmed: "bg-emerald-100 text-emerald-700",
        cancelled: "bg-red-100 text-red-600",
        completed: "bg-blue-100 text-blue-700",
    };

    if (!user) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-black text-xl font-medium"
                    >
                        {t("common.loading")}
                    </motion.div>
                </div>
            </Layout>
        );
    }

    const ProfileField = ({ icon: Icon, label, value, name, type = "text", disabled = true, options = null }: any) => (
        <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 ltr:ml-1 rtl:mr-1">
                <Icon className="text-gray-400" />
                {label}
            </label>
            {options ? (
                <div className="relative">
                    <select
                        name={name}
                        value={value}
                        onChange={handleChange}
                        disabled={disabled}
                        className={`w-full p-4 rounded-xl border transition-all duration-300 appearance-none shadow-sm ${!disabled
                            ? "bg-white border-blue-500 text-black focus:ring-2 focus:ring-blue-500/20"
                            : "bg-gray-100 border-gray-200 text-gray-600 cursor-not-allowed"
                            }`}
                    >
                        <option value="" disabled>{t("profile.selectGender")}</option>
                        {options.map((opt: any) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    {!disabled && (
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                            <div className="border-t-2 border-r-2 border-gray-400 w-2 h-2 rotate-[135deg]"></div>
                        </div>
                    )}
                </div>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    className={`w-full p-4 rounded-xl border transition-all duration-300 shadow-sm ${!disabled
                        ? "bg-white border-blue-500 text-black focus:ring-2 focus:ring-blue-500/20 shadow-md"
                        : "bg-gray-100 border-gray-200 text-gray-600 cursor-not-allowed"
                        }`}
                />
            )}
        </div>
    );

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 relative overflow-hidden py-20 px-4">
                <div className="max-w-6xl mx-auto w-full relative z-10">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="grid lg:grid-cols-12 gap-8 items-stretch"
                    >
                        {/* Digital Card Area - Left Column */}
                        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-[2rem] p-8 border border-gray-200 shadow-xl overflow-hidden relative group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16"></div>

                                <div className="flex justify-between items-start mb-12 relative z-10">
                                    <div className="space-y-1">
                                        <h3 className="text-blue-600 font-bold tracking-[0.2em] text-[10px] uppercase">Official Travel ID</h3>
                                        <p className="text-black text-xl font-black tracking-tight">MAAT <span className="font-light">PAY</span></p>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                                        <FaQrcode className="text-gray-400 text-xl" />
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center mb-10 relative z-10">
                                    <div className="bg-white p-4 rounded-2xl shadow-inner w-full aspect-square flex items-center justify-center overflow-hidden border border-gray-100">
                                        {qrCodeUrl ? (
                                            <img src={qrCodeUrl} alt="QR Code" className="w-full h-full object-contain" />
                                        ) : (
                                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-end border-t border-gray-100 pt-6">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Holder</p>
                                            <p className="text-black font-bold text-lg">{user?.full_name}</p>
                                        </div>
                                        <div className="text-right space-y-1">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold ltr:text-right rtl:text-left">Card ID</p>
                                            <p className="text-gray-900 font-mono text-xs font-bold bg-gray-100 px-2 py-0.5 rounded ltr:text-right rtl:text-left">{user?.card_id || "NOT ASSIGNED"}</p>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        onClick={downloadQR}
                                        className="w-full py-4 rounded-xl bg-black hover:bg-gray-800 text-white text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <FaDownload />
                                        {t("profile.downloadQR")}
                                    </motion.button>
                                </div>
                            </motion.div>

                            {/* Info Tiles */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
                                    <FaWallet className="text-emerald-500 mb-3 text-xl" />
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Balance</p>
                                    <p className="text-black text-xl font-black">{user?.balance || "0.00"} EGP</p>
                                </div>
                                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
                                    <FaIdCard className="text-blue-500 mb-3 text-xl" />
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Status</p>
                                    <p className="text-black text-xl font-black uppercase">Active</p>
                                </div>
                            </div>
                        </div>

                        {/* Personal Settings area - Right Column */}
                        <div className="lg:col-span-12 xl:col-span-8 flex flex-col">
                            <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-gray-200 shadow-xl h-full flex flex-col">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                                    <div className="space-y-1">
                                        <h2 className="text-4xl font-black text-black tracking-tight ltr:text-left rtl:text-right">
                                            {t("profile.title")}
                                        </h2>
                                        <p className="text-gray-500 font-medium ltr:text-left rtl:text-right">{t("profile.subtitle")}</p>
                                    </div>
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className={`px-8 py-3 rounded-xl font-bold text-sm tracking-widest uppercase transition-all flex items-center gap-2 ${isEditing
                                            ? "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
                                            : "bg-black text-white hover:bg-gray-800 shadow-md"
                                            }`}
                                    >
                                        {isEditing ? <><FaTimes /> {t("common.cancel")}</> : <><FaEdit /> {t("common.edit")}</>}
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8 flex-1">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <ProfileField
                                            icon={FaIdCard}
                                            label={t("register.nationalId.label")}
                                            value={user?.national_id}
                                            disabled={true}
                                        />
                                        <ProfileField
                                            icon={FaUser}
                                            label={t("profile.fullName")}
                                            name="full_name"
                                            value={formData.full_name}
                                            disabled={!isEditing}
                                        />
                                        <ProfileField
                                            icon={FaEnvelope}
                                            label={t("profile.email")}
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            disabled={!isEditing}
                                        />
                                        <ProfileField
                                            icon={FaPhone}
                                            label={t("profile.phone")}
                                            name="phone"
                                            value={formData.phone}
                                            disabled={!isEditing}
                                        />
                                        <ProfileField
                                            icon={FaVenusMars}
                                            label={t("profile.gender")}
                                            name="gender"
                                            value={formData.gender}
                                            disabled={!isEditing}
                                            options={[
                                                { label: t("profile.male"), value: "male" },
                                                { label: t("profile.female"), value: "female" }
                                            ]}
                                        />
                                    </div>

                                    <AnimatePresence>
                                        {isEditing && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="pt-8"
                                            >
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="w-full md:w-auto px-16 py-4 rounded-xl bg-black text-white font-black text-lg hover:bg-gray-800 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                                                >
                                                    {loading ? (
                                                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    ) : <FaSave />}
                                                    {loading ? t("common.saving") : t("common.save")}
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </div>
                        </div>
                    </motion.div>

                    {/* ====== Recent Bookings Section ====== */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-8"
                    >
                        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-gray-200 shadow-xl">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                <div className="space-y-1">
                                    <h2 className="text-3xl font-black text-black tracking-tight">
                                        Recent Bookings
                                    </h2>
                                    <p className="text-gray-500 font-medium">Your recent train reservations</p>
                                </div>
                                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                                    <FaTicketAlt className="text-gray-400" />
                                    <span className="font-black text-black">{bookings.length}</span>
                                    <span className="text-gray-500 text-sm font-medium">total</span>
                                </div>
                            </div>

                            {bookingsLoading ? (
                                <div className="flex items-center justify-center py-16">
                                    <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : bookings.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaTrain className="text-3xl text-gray-300" />
                                    </div>
                                    <h3 className="font-black text-lg text-gray-800 mb-1">No Bookings Yet</h3>
                                    <p className="text-gray-400 font-medium text-sm">Search for a train and book your first trip!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {bookings.map((booking, index) => (
                                        <motion.div
                                            key={booking.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-md transition-all group"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                                {/* Train info */}
                                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                                    <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center shrink-0">
                                                        <FaTrain className="text-white text-lg" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <span className="font-black text-black text-lg">
                                                                #{booking.train?.train_number || booking.train_id}
                                                            </span>
                                                            {booking.ticket_class && (
                                                                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
                                                                    {i18n.language === "ar"
                                                                        ? booking.train?.train_classes?.name_ar || booking.ticket_class
                                                                        : booking.ticket_class}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                                                            <FaMapMarkerAlt className="text-xs text-gray-400 shrink-0" />
                                                            <span className="truncate font-medium">
                                                                {booking.from_station || "—"} → {booking.to_station || "—"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Date & passengers */}
                                                <div className="flex items-center gap-6 text-sm shrink-0">
                                                    <div className="flex items-center gap-1.5 text-gray-500">
                                                        <FaCalendarAlt className="text-xs text-gray-400" />
                                                        <span className="font-medium">
                                                            {booking.travel_date
                                                                ? formatDate(booking.travel_date)
                                                                : formatDate(booking.booking_date)}
                                                        </span>
                                                    </div>
                                                    <div className="text-gray-500 font-medium">
                                                        {booking.passengers} {booking.passengers === 1 ? "passenger" : "passengers"}
                                                    </div>
                                                </div>

                                                {/* Fare */}
                                                <div className="text-right shrink-0">
                                                    <p className="font-black text-black text-xl">
                                                        {(booking.total_fare || 0).toFixed(0)} <span className="text-xs text-gray-400 font-bold">EGP</span>
                                                    </p>
                                                </div>

                                                {/* Status & cancel */}
                                                <div className="flex items-center gap-3 shrink-0">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${statusStyles[booking.status] || "bg-gray-100 text-gray-600"}`}>
                                                        {booking.status}
                                                    </span>
                                                    {booking.status === "confirmed" && (
                                                        <button
                                                            onClick={() => handleCancelBooking(booking.id)}
                                                            disabled={cancellingId === booking.id}
                                                            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-xl hover:bg-red-50 text-red-400 hover:text-red-600 disabled:opacity-50"
                                                            title="Cancel booking"
                                                        >
                                                            {cancellingId === booking.id ? (
                                                                <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                                                            ) : (
                                                                <FaTimesCircle />
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;

