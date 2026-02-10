import api from "./axios";

export const topUp = (amount) => {
    return api.post("/users/me/top-up", { amount });
};

export const getBalance = () => {
    return api.get("/users/me/balance");
};
