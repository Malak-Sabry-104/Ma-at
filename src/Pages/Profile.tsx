import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import {
    FaEdit, FaSave, FaTimes, FaDownload, FaQrcode,
    FaUser, FaEnvelope, FaPhone, FaVenusMars, FaIdCard, FaWallet
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";
import Layout from "../Components/Layout";

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState("");

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
        }
    }, [user]);

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
            <div className="min-h-screen bg-gray-50 relative overflow-hidden flex items-center py-20 px-4">
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
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
