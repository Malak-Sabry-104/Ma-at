import api from "./axios";

// Dashboard
export const getStats = () => api.get("/admin/stats");

// Users
export const getUsers = (page = 1, limit = 20) => api.get(`/admin/users?page=${page}&limit=${limit}`);
export const createUser = (data) => api.post("/admin/users", data);
export const topUpUser = (userId, amount, payment_method) =>
    api.post(`/admin/users/${userId}/top-up`, { amount, payment_method });

// NFC Tags
export const getCards = (page = 1, limit = 20) => api.get(`/admin/cards?page=${page}&limit=${limit}`);
export const registerNfcTag = (card_uid) => api.post("/admin/nfc/register", { card_uid });
export const getUnpairedCards = (mine = false) => api.get(`/admin/nfc/unpaired?mine=${mine}`);

// Bookings
export const getBookings = (page = 1, limit = 20) => api.get(`/admin/bookings?page=${page}&limit=${limit}`);
