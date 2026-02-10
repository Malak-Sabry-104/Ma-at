import api from "./axios";

export const createBooking = (trainId, passengers, searchParams) => {
    return api.post("/bookings", { trainId, passengers, searchParams });
};

export const getUserBookings = () => {
    return api.get("/bookings");
};

export const getBookingById = (bookingId) => {
    return api.get(`/bookings/${bookingId}`);
};

export const cancelBooking = (bookingId) => {
    return api.delete(`/bookings/${bookingId}`);
};
