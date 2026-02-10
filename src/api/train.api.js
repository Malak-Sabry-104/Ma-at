import api from "./Axios.js";

export const searchTrains = (searchParams) => {
    return api.post("/trips/search", searchParams);
};

export const getAllStations = () => {
    return api.get("/stations");
};

export const searchStations = (query) => {
    return api.get(`/trips/stations/search?query=${encodeURIComponent(query)}`);
};
