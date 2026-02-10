import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaWallet,
    FaCreditCard,
    FaMobileAlt,
    FaArrowLeft,
    FaCheckCircle,
    FaShieldAlt,
    FaLock,
    FaPlus,
} from "react-icons/fa";
import Layout from "../Components/Layout";
import { useAuth } from "../context/AuthContext";
import * as paymentApi from "../api/payment.api";

type PaymentMethod = "vodafone" | "debit" | null;

const quickAmounts = [50, 100, 200, 500, 1000, 2000];

const Payment = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { user, isAuthenticated } = useAuth();

    const [balance, setBalance] = useState<number | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
    const [amount, setAmount] = useState<string>("");
    const [step, setStep] = useState<"method" | "details" | "processing" | "success">("method");

    // Vodafone Cash fields
    const [vodafoneNumber, setVodafoneNumber] = useState("");
    const [vodafonePin, setVodafonePin] = useState("");

    // Debit card fields
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvv, setCardCvv] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }
        fetchBalance();
    }, [isAuthenticated]);

    const fetchBalance = async () => {
        try {
            const res = await paymentApi.getBalance();
            setBalance(res.data.balance ?? 0);
        } catch {
            setBalance(0);
        }
    };

    const parsedAmount = parseFloat(amount) || 0;

    const handleTopUp = async () => {
        if (parsedAmount < 10) {
            setError("Minimum top-up is 10 EGP");
            return;
        }
        if (parsedAmount > 10000) {
            setError("Maximum top-up is 10,000 EGP");
            return;
        }

        // Validate payment details
        if (selectedMethod === "vodafone") {
            if (!vodafoneNumber || vodafoneNumber.length < 11) {
                setError("Enter a valid Vodafone number");
                return;
            }
            if (!vodafonePin || vodafonePin.length < 4) {
                setError("Enter your Vodafone Cash PIN");
                return;
            }
        } else if (selectedMethod === "debit") {
            if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
                setError("Enter a valid card number");
                return;
            }
            if (!cardName) {
                setError("Enter cardholder name");
                return;
            }
            if (!cardExpiry || cardExpiry.length < 5) {
                setError("Enter card expiry date");
                return;
            }
            if (!cardCvv || cardCvv.length < 3) {
                setError("Enter CVV");
                return;
            }
        }

        setError("");
        setStep("processing");

        // Simulate payment processing delay
        await new Promise((resolve) => setTimeout(resolve, 2500));

        try {
            const res = await paymentApi.topUp(parsedAmount);
            setBalance(res.data.balance);
            setStep("success");
        } catch (err: any) {
            setError(err.response?.data?.error || "Top-up failed");
            setStep("details");
        }
    };

    const formatCardNumber = (val: string) => {
        const digits = val.replace(/\D/g, "").slice(0, 16);
        return digits.replace(/(.{4})/g, "$1 ").trim();
    };

    const formatExpiry = (val: string) => {
        const digits = val.replace(/\D/g, "").slice(0, 4);
        if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
        return digits;
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 py-20 px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <button
                            onClick={() => step === "method" ? navigate(-1) : setStep("method")}
                            className="group flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-all font-bold text-sm uppercase tracking-widest"
                        >
                            <FaArrowLeft className="rtl:rotate-180 transition-transform group-hover:-translate-x-1" />
                            {step === "method" ? "Back" : "Change Method"}
                        </button>

                        {/* Balance Card */}
                        <div className="bg-black rounded-[2rem] p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -ml-12 -mb-12"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                        <FaWallet className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-xs uppercase tracking-widest font-bold">Your Balance</p>
                                        <p className="text-3xl font-black tracking-tight">
                                            {balance !== null ? `${balance.toFixed(0)} EGP` : "..."}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-white/40 text-xs font-medium">
                                    {user?.full_name || "User"} • Ma'at Wallet
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {/* Step 1: Choose Payment Method */}
                        {step === "method" && (
                            <motion.div
                                key="method"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-black text-black">Top Up Your Wallet</h2>

                                {/* Quick amount buttons */}
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-3">Quick Amount</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        {quickAmounts.map((amt) => (
                                            <button
                                                key={amt}
                                                onClick={() => setAmount(String(amt))}
                                                className={`py-4 rounded-2xl font-black text-lg transition-all border-2 ${amount === String(amt)
                                                        ? "bg-black text-white border-black shadow-xl shadow-black/10"
                                                        : "bg-white text-black border-gray-200 hover:border-gray-400"
                                                    }`}
                                            >
                                                {amt} <span className="text-xs font-bold opacity-60">EGP</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Custom amount */}
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-3">Or Enter Custom Amount</p>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0"
                                            className="w-full bg-white border-2 border-gray-200 rounded-2xl px-6 py-5 text-2xl font-black text-black placeholder:text-gray-300 focus:border-black focus:outline-none transition-colors"
                                        />
                                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">EGP</span>
                                    </div>
                                </div>

                                {/* Payment Methods */}
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-3">Payment Method</p>
                                    <div className="space-y-3">
                                        {/* Vodafone Cash */}
                                        <button
                                            onClick={() => {
                                                setSelectedMethod("vodafone");
                                                if (parsedAmount >= 10) setStep("details");
                                            }}
                                            className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all group ${selectedMethod === "vodafone"
                                                    ? "border-red-500 bg-red-50"
                                                    : "border-gray-200 bg-white hover:border-gray-400"
                                                }`}
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center shrink-0">
                                                <FaMobileAlt className="text-2xl text-white" />
                                            </div>
                                            <div className="flex-1 text-left rtl:text-right">
                                                <p className="font-black text-black text-lg">Vodafone Cash</p>
                                                <p className="text-sm text-gray-500">Pay using your Vodafone Cash wallet</p>
                                            </div>
                                            <div className="text-red-600 font-black text-sm bg-red-50 px-3 py-1 rounded-full">
                                                Instant
                                            </div>
                                        </button>

                                        {/* Debit Card */}
                                        <button
                                            onClick={() => {
                                                setSelectedMethod("debit");
                                                if (parsedAmount >= 10) setStep("details");
                                            }}
                                            className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all group ${selectedMethod === "debit"
                                                    ? "border-blue-500 bg-blue-50"
                                                    : "border-gray-200 bg-white hover:border-gray-400"
                                                }`}
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shrink-0">
                                                <FaCreditCard className="text-2xl text-white" />
                                            </div>
                                            <div className="flex-1 text-left rtl:text-right">
                                                <p className="font-black text-black text-lg">Debit Card</p>
                                                <p className="text-sm text-gray-500">Visa, Mastercard, Meeza</p>
                                            </div>
                                            <div className="text-blue-600 font-black text-sm bg-blue-50 px-3 py-1 rounded-full">
                                                Secure
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {parsedAmount < 10 && amount !== "" && (
                                    <p className="text-red-500 text-sm font-bold text-center">Minimum top-up is 10 EGP</p>
                                )}
                            </motion.div>
                        )}

                        {/* Step 2: Enter Payment Details */}
                        {step === "details" && (
                            <motion.div
                                key="details"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-black text-black">
                                        {selectedMethod === "vodafone" ? "Vodafone Cash" : "Debit Card"}
                                    </h2>
                                    <span className="bg-black text-white font-black text-lg px-4 py-2 rounded-xl">
                                        {parsedAmount} EGP
                                    </span>
                                </div>

                                <div className="bg-white rounded-[2rem] p-8 border border-gray-200 shadow-xl space-y-5">
                                    {selectedMethod === "vodafone" ? (
                                        <>
                                            {/* Vodafone Cash UI */}
                                            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl mb-2">
                                                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
                                                    <FaMobileAlt className="text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-sm text-red-800">Vodafone Cash</p>
                                                    <p className="text-xs text-red-600">*166# for assistance</p>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-xs text-gray-400 uppercase tracking-widest font-bold block mb-2">
                                                    Vodafone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    maxLength={11}
                                                    value={vodafoneNumber}
                                                    onChange={(e) => setVodafoneNumber(e.target.value.replace(/\D/g, ""))}
                                                    placeholder="010 XXXX XXXX"
                                                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg font-bold focus:border-red-500 focus:outline-none transition-colors"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-xs text-gray-400 uppercase tracking-widest font-bold block mb-2">
                                                    Vodafone Cash PIN
                                                </label>
                                                <input
                                                    type="password"
                                                    maxLength={6}
                                                    value={vodafonePin}
                                                    onChange={(e) => setVodafonePin(e.target.value.replace(/\D/g, ""))}
                                                    placeholder="••••••"
                                                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg font-bold tracking-[0.5em] focus:border-red-500 focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Debit Card UI */}
                                            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl mb-2">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                                                    <FaCreditCard className="text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-sm text-blue-800">Debit Card Payment</p>
                                                    <p className="text-xs text-blue-600">256-bit SSL encrypted</p>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-xs text-gray-400 uppercase tracking-widest font-bold block mb-2">
                                                    Card Number
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cardNumber}
                                                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                                    placeholder="1234 5678 9012 3456"
                                                    maxLength={19}
                                                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg font-bold tracking-wider focus:border-blue-500 focus:outline-none transition-colors"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-xs text-gray-400 uppercase tracking-widest font-bold block mb-2">
                                                    Cardholder Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cardName}
                                                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                                    placeholder="AHMED MOHAMED"
                                                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg font-bold focus:border-blue-500 focus:outline-none transition-colors uppercase"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-xs text-gray-400 uppercase tracking-widest font-bold block mb-2">
                                                        Expiry
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={cardExpiry}
                                                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                                                        placeholder="MM/YY"
                                                        maxLength={5}
                                                        className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg font-bold focus:border-blue-500 focus:outline-none transition-colors"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs text-gray-400 uppercase tracking-widest font-bold block mb-2">
                                                        CVV
                                                    </label>
                                                    <input
                                                        type="password"
                                                        maxLength={4}
                                                        value={cardCvv}
                                                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                                                        placeholder="•••"
                                                        className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg font-bold tracking-[0.5em] focus:border-blue-500 focus:outline-none transition-colors"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {error && (
                                        <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-xl text-center">{error}</p>
                                    )}

                                    <button
                                        onClick={handleTopUp}
                                        className="w-full bg-black hover:bg-gray-800 text-white font-black py-5 px-8 rounded-2xl transition-all shadow-xl shadow-black/10 hover:shadow-black/20 text-sm uppercase tracking-widest active:scale-[0.98]"
                                    >
                                        <FaPlus className="inline mr-2" />
                                        Top Up {parsedAmount} EGP
                                    </button>

                                    <div className="flex items-center justify-center gap-4 text-gray-400 text-xs">
                                        <span className="flex items-center gap-1"><FaLock /> Encrypted</span>
                                        <span className="flex items-center gap-1"><FaShieldAlt /> Secure Payment</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Processing */}
                        {step === "processing" && (
                            <motion.div
                                key="processing"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center justify-center py-20"
                            >
                                <div className="relative mb-8">
                                    <div className="w-24 h-24 border-4 border-gray-200 rounded-full"></div>
                                    <div className="w-24 h-24 border-4 border-black border-t-transparent rounded-full animate-spin absolute inset-0"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {selectedMethod === "vodafone" ? (
                                            <FaMobileAlt className="text-2xl text-red-600" />
                                        ) : (
                                            <FaCreditCard className="text-2xl text-blue-600" />
                                        )}
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-black mb-2">Processing Payment</h3>
                                <p className="text-gray-400 font-medium text-sm">
                                    {selectedMethod === "vodafone"
                                        ? "Connecting to Vodafone Cash..."
                                        : "Verifying card with your bank..."}
                                </p>
                            </motion.div>
                        )}

                        {/* Step 4: Success */}
                        {step === "success" && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-12"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                    className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <FaCheckCircle className="text-5xl text-emerald-500" />
                                </motion.div>

                                <h2 className="text-3xl font-black text-black mb-2">Top-Up Successful!</h2>
                                <p className="text-gray-500 mb-2">
                                    {parsedAmount} EGP has been added to your wallet
                                </p>
                                <p className="text-4xl font-black text-black mb-8">
                                    {balance !== null ? `${balance.toFixed(0)} EGP` : "—"}
                                </p>
                                <p className="text-xs text-gray-400 mb-8">
                                    {selectedMethod === "vodafone"
                                        ? `Paid via Vodafone Cash • ${vodafoneNumber}`
                                        : `Paid via •••• ${cardNumber.slice(-4)}`}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                    <button
                                        onClick={() => {
                                            setAmount("");
                                            setStep("method");
                                            setSelectedMethod(null);
                                            setVodafoneNumber("");
                                            setVodafonePin("");
                                            setCardNumber("");
                                            setCardName("");
                                            setCardExpiry("");
                                            setCardCvv("");
                                        }}
                                        className="flex-1 bg-black hover:bg-gray-800 text-white font-black py-4 px-6 rounded-2xl transition-all text-sm uppercase tracking-widest"
                                    >
                                        Top Up Again
                                    </button>
                                    <button
                                        onClick={() => navigate("/")}
                                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-black font-black py-4 px-6 rounded-2xl transition-all text-sm uppercase tracking-widest"
                                    >
                                        Back to Home
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </Layout>
    );
};

export default Payment;
