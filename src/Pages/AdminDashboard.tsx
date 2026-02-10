import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaUsers, FaWallet, FaCreditCard, FaTicketAlt,
    FaPlus, FaTimes, FaSearch, FaUserPlus,
    FaMoneyBillWave, FaTag, FaCheck,
    FaChartBar
} from "react-icons/fa";
import Layout from "../Components/Layout";
import * as adminApi from "../api/admin.api";

// ===== Types =====
interface Stats {
    users: number;
    registered_cards: number;
    unpaired_cards: number;
    bookings: number;
    total_revenue: number;
}

interface User {
    id: string;
    national_id: string;
    full_name: string;
    email: string;
    phone: string;
    gender: string;
    balance: number;
    role: string;
    created_at: string;
}

interface NfcCard {
    id: string;
    card_uid: string;
    user_id: string | null;
    registered_by: string | null;
    status: string;
    created_at: string;
    user?: { full_name: string; national_id: string } | null;
}

interface Booking {
    id: string;
    train_id: number;
    passengers: number;
    total_fare: number;
    status: string;
    booking_date: string;
    from_station: string;
    to_station: string;
    ticket_class: string;
    user?: { full_name: string; email: string } | null;
}

type Tab = "overview" | "users" | "nfc" | "bookings";

const TABS: { key: Tab; label: string; icon: any }[] = [
    { key: "overview", label: "Overview", icon: FaChartBar },
    { key: "users", label: "Users", icon: FaUsers },
    { key: "nfc", label: "NFC Tags", icon: FaCreditCard },
    { key: "bookings", label: "Bookings", icon: FaTicketAlt },
];

// ===== Main Component =====
const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>("overview");

    // Redirect non-admin users
    useEffect(() => {
        if (user && user.role !== "admin" && user.role !== "manager") {
            navigate("/");
        }
    }, [user, navigate]);

    if (!user || (user.role !== "admin" && user.role !== "manager")) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <p className="text-gray-500 text-lg font-medium">Access denied</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-black tracking-tight">Admin Dashboard</h1>
                        <p className="text-gray-500 font-medium mt-1">
                            Welcome back, <span className="text-black font-bold">{user.full_name}</span>
                        </p>
                    </div>

                    {/* Tab Bar */}
                    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.key;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${isActive
                                        ? "bg-black text-white shadow-lg"
                                        : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow"
                                        }`}
                                >
                                    <Icon className="text-sm" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === "overview" && <OverviewTab />}
                            {activeTab === "users" && <UsersTab />}
                            {activeTab === "nfc" && <NfcTab />}
                            {activeTab === "bookings" && <BookingsTab />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </Layout>
    );
};

// ===== Overview Tab =====
const OverviewTab = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminApi.getStats().then((r) => {
            setStats(r.data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading) return <Spinner />;

    const cards = [
        { label: "Total Users", value: stats?.users || 0, icon: FaUsers, color: "bg-blue-500" },
        { label: "NFC Cards", value: stats?.registered_cards || 0, icon: FaCreditCard, color: "bg-purple-500" },
        { label: "Unpaired Cards", value: stats?.unpaired_cards || 0, icon: FaTag, color: "bg-amber-500" },
        { label: "Bookings", value: stats?.bookings || 0, icon: FaTicketAlt, color: "bg-emerald-500" },
        { label: "Revenue", value: `${(stats?.total_revenue || 0).toLocaleString()} EGP`, icon: FaMoneyBillWave, color: "bg-rose-500" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cards.map((c, i) => {
                const Icon = c.icon;
                return (
                    <motion.div
                        key={c.label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md"
                    >
                        <div className={`w-10 h-10 ${c.color} rounded-xl flex items-center justify-center mb-4`}>
                            <Icon className="text-white" />
                        </div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">{c.label}</p>
                        <p className="text-2xl font-black text-black">{c.value}</p>
                    </motion.div>
                );
            })}
        </div>
    );
};

// ===== Users Tab =====
const UsersTab = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showTopUpModal, setShowTopUpModal] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = () => {
        setLoading(true);
        adminApi.getUsers(1, 100).then((r) => {
            setUsers(r.data.users || []);
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    useEffect(() => { fetchUsers(); }, []);

    const filtered = users.filter((u) =>
        u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.national_id?.includes(searchTerm) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Actions bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search users by name, ID, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all shadow-md whitespace-nowrap"
                >
                    <FaUserPlus /> New User
                </button>
            </div>

            {loading ? <Spinner /> : (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left text-[10px] uppercase tracking-widest font-bold text-gray-400 px-6 py-4">Name</th>
                                    <th className="text-left text-[10px] uppercase tracking-widest font-bold text-gray-400 px-6 py-4">National ID</th>
                                    <th className="text-left text-[10px] uppercase tracking-widest font-bold text-gray-400 px-6 py-4">Email</th>
                                    <th className="text-left text-[10px] uppercase tracking-widest font-bold text-gray-400 px-6 py-4">Balance</th>
                                    <th className="text-left text-[10px] uppercase tracking-widest font-bold text-gray-400 px-6 py-4">Role</th>
                                    <th className="text-right text-[10px] uppercase tracking-widest font-bold text-gray-400 px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((u) => (
                                    <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-black">{u.full_name}</td>
                                        <td className="px-6 py-4 text-gray-600 font-mono text-sm">{u.national_id}</td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">{u.email}</td>
                                        <td className="px-6 py-4 font-black text-black">{(u.balance || 0).toFixed(0)} EGP</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${u.role === "admin" ? "bg-red-100 text-red-600" :
                                                u.role === "manager" ? "bg-blue-100 text-blue-600" :
                                                    "bg-gray-100 text-gray-600"
                                                }`}>{u.role}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setShowTopUpModal(u)}
                                                className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors"
                                            >
                                                <FaWallet className="inline mr-1" /> Top Up
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12 text-gray-400 font-medium">No users found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Create User Modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <CreateUserModal
                        onClose={() => setShowCreateModal(false)}
                        onCreated={() => { setShowCreateModal(false); fetchUsers(); }}
                    />
                )}
            </AnimatePresence>

            {/* Top Up Modal */}
            <AnimatePresence>
                {showTopUpModal && (
                    <TopUpModal
                        user={showTopUpModal}
                        onClose={() => setShowTopUpModal(null)}
                        onDone={() => { setShowTopUpModal(null); fetchUsers(); }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// ===== NFC Tab =====
const NfcTab = () => {
    const [cards, setCards] = useState<NfcCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTag, setNewTag] = useState("");
    const [registering, setRegistering] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchCards = () => {
        setLoading(true);
        adminApi.getCards(1, 100).then((r) => {
            setCards(r.data.cards || []);
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    useEffect(() => { fetchCards(); }, []);

    const handleRegister = async () => {
        if (!newTag.trim()) return;
        setRegistering(true);
        setError("");
        setSuccess("");
        try {
            await adminApi.registerNfcTag(newTag.trim());
            setSuccess(`NFC tag "${newTag.trim()}" registered!`);
            setNewTag("");
            fetchCards();
        } catch (err: any) {
            setError(err.response?.data?.error || "Registration failed");
        } finally {
            setRegistering(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Register new tag */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
                <h3 className="font-black text-lg text-black mb-4">Register New NFC Tag</h3>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={newTag}
                        onChange={(e) => { setNewTag(e.target.value); setError(""); setSuccess(""); }}
                        placeholder="Enter NFC tag UID (e.g. A1:B2:C3:D4)"
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white font-mono text-black focus:outline-none focus:ring-2 focus:ring-black/10"
                        onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                    />
                    <button
                        onClick={handleRegister}
                        disabled={registering || !newTag.trim()}
                        className="px-6 py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        {registering ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FaPlus />}
                        Register
                    </button>
                </div>
                {error && <p className="mt-3 text-red-500 text-sm font-medium">{error}</p>}
                {success && <p className="mt-3 text-emerald-600 text-sm font-medium flex items-center gap-1"><FaCheck /> {success}</p>}
            </div>

            {/* Cards list */}
            {loading ? <Spinner /> : (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-black text-lg text-black">All NFC Tags</h3>
                        <span className="text-sm text-gray-500 font-medium">{cards.length} total</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left text-[10px] uppercase tracking-widest font-bold text-gray-400 px-6 py-3">Tag UID</th>
                                    <th className="text-left text-[10px] uppercase tracking-widest font-bold text-gray-400 px-6 py-3">Paired User</th>
                                    <th className="text-left text-[10px] uppercase tracking-widest font-bold text-gray-400 px-6 py-3">Status</th>
                                    <th className="text-left text-[10px] uppercase tracking-widest font-bold text-gray-400 px-6 py-3">Registered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cards.map((c) => (
                                    <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-mono font-bold text-black">{c.card_uid}</td>
                                        <td className="px-6 py-4">
                                            {c.user ? (
                                                <span className="text-black font-medium">{c.user.full_name}</span>
                                            ) : (
                                                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-600">UNPAIRED</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${c.status === "active" ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-500"
                                                }`}>{c.status}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(c.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                                {cards.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="text-center py-12 text-gray-400 font-medium">No NFC tags registered</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

// ===== Bookings Tab =====
const BookingsTab = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminApi.getBookings(1, 100).then((r) => {
            setBookings(r.data.bookings || []);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const statusStyles: Record<string, string> = {
        confirmed: "bg-emerald-100 text-emerald-700",
        cancelled: "bg-red-100 text-red-600",
        completed: "bg-blue-100 text-blue-700",
    };

    if (loading) return <Spinner />;

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-black text-lg text-black">All Bookings</h3>
                <span className="text-sm text-gray-500 font-medium">{bookings.length} total</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left text-[10px] uppercase tracking-widest font-bold text-gray-400 px-6 py-3">User</th>
                            <th className="text-left text-[10px] uppercase tracking-widest font-bold text-gray-400 px-6 py-3">Route</th>
                            <th className="text-left text-[10px] uppercase tracking-widest font-bold text-gray-400 px-6 py-3">Class</th>
                            <th className="text-left text-[10px] uppercase tracking-widest font-bold text-gray-400 px-6 py-3">Fare</th>
                            <th className="text-left text-[10px] uppercase tracking-widest font-bold text-gray-400 px-6 py-3">Status</th>
                            <th className="text-left text-[10px] uppercase tracking-widest font-bold text-gray-400 px-6 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-black">{b.user?.full_name || "—"}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{b.from_station || "—"} → {b.to_station || "—"}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{b.ticket_class || "—"}</td>
                                <td className="px-6 py-4 font-black text-black">{(b.total_fare || 0).toFixed(0)} EGP</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${statusStyles[b.status] || "bg-gray-100 text-gray-500"}`}>
                                        {b.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{new Date(b.booking_date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        {bookings.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-12 text-gray-400 font-medium">No bookings yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// ===== Create User Modal =====
const CreateUserModal = ({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) => {
    const [form, setForm] = useState({
        national_id: "", full_name: "", email: "", phone: "", password: "", gender: "", card_uid: ""
    });
    const [unpairedCards, setUnpairedCards] = useState<NfcCard[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        adminApi.getUnpairedCards(true).then((r) => {
            setUnpairedCards(r.data.cards || []);
        }).catch(() => { });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.national_id || !form.full_name || !form.password) {
            setError("National ID, Full Name, and Password are required");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await adminApi.createUser(form);
            onCreated();
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to create user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalWrapper onClose={onClose}>
            <h2 className="text-2xl font-black text-black mb-6 flex items-center gap-2">
                <FaUserPlus /> Create New User
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="National ID *" value={form.national_id} onChange={(v) => setForm({ ...form, national_id: v })} />
                    <InputField label="Full Name *" value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} />
                    <InputField label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    <InputField label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                    <InputField label="Password *" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Gender</label>
                        <select
                            value={form.gender}
                            onChange={(e) => setForm({ ...form, gender: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black/10"
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>

                {/* NFC Tag pairing */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Pair NFC Tag {unpairedCards.length > 0 && <span className="text-amber-500">({unpairedCards.length} available)</span>}
                    </label>
                    {unpairedCards.length > 0 ? (
                        <select
                            value={form.card_uid}
                            onChange={(e) => setForm({ ...form, card_uid: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-black font-mono font-medium focus:outline-none focus:ring-2 focus:ring-black/10"
                        >
                            <option value="">None — skip pairing</option>
                            {unpairedCards.map((c) => (
                                <option key={c.id} value={c.card_uid}>{c.card_uid}</option>
                            ))}
                        </select>
                    ) : (
                        <p className="text-sm text-gray-400 font-medium py-3 px-4 bg-gray-50 rounded-xl">
                            No unpaired tags available. Register one in the NFC Tags tab first.
                        </p>
                    )}
                </div>

                {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FaCheck />}
                        Create User
                    </button>
                    <button type="button" onClick={onClose} className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all">
                        Cancel
                    </button>
                </div>
            </form>
        </ModalWrapper>
    );
};

// ===== Top Up Modal =====
const TopUpModal = ({ user, onClose, onDone }: { user: User; onClose: () => void; onDone: () => void }) => {
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("cash");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const METHODS = ["cash", "vodafone", "card", "bank_transfer", "other"];
    const QUICK_AMOUNTS = [50, 100, 200, 500, 1000];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const parsedAmount = parseFloat(amount);
        if (!parsedAmount || parsedAmount <= 0) {
            setError("Enter a valid amount");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await adminApi.topUpUser(user.id, parsedAmount, method);
            onDone();
        } catch (err: any) {
            setError(err.response?.data?.error || "Top-up failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalWrapper onClose={onClose}>
            <h2 className="text-2xl font-black text-black mb-1 flex items-center gap-2">
                <FaWallet className="text-emerald-500" /> Top Up Balance
            </h2>
            <p className="text-gray-500 font-medium mb-6">
                For <span className="text-black font-bold">{user.full_name}</span> — Current: <span className="font-black text-black">{(user.balance || 0).toFixed(0)} EGP</span>
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Quick amounts */}
                <div className="flex flex-wrap gap-2">
                    {QUICK_AMOUNTS.map((a) => (
                        <button
                            key={a}
                            type="button"
                            onClick={() => { setAmount(a.toString()); setError(""); }}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${amount === a.toString()
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            {a} EGP
                        </button>
                    ))}
                </div>

                <InputField
                    label="Amount (EGP)"
                    type="number"
                    value={amount}
                    onChange={(v) => { setAmount(v); setError(""); }}
                    placeholder="Enter custom amount"
                />

                {/* Payment method */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Payment Method</label>
                    <div className="flex flex-wrap gap-2">
                        {METHODS.map((m) => (
                            <button
                                key={m}
                                type="button"
                                onClick={() => setMethod(m)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border capitalize ${method === m
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                {m.replace("_", " ")}
                            </button>
                        ))}
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FaMoneyBillWave />}
                    Confirm Top Up
                </button>
            </form>
        </ModalWrapper>
    );
};

// ===== Shared Components =====

const ModalWrapper = ({ onClose, children }: { onClose: () => void; children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
    >
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
        >
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors">
                <FaTimes />
            </button>
            {children}
        </motion.div>
    </motion.div>
);

const InputField = ({ label, value, onChange, type = "text", placeholder }: {
    label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) => (
    <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black/10"
        />
    </div>
);

const Spinner = () => (
    <div className="flex items-center justify-center py-16">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
);

export default AdminDashboard;
