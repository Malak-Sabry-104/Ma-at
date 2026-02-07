import api from "./Axios.js";

export const registerUser = (payload) => {
  return api.post("/auth/register", {
    email: payload.email,
    password: payload.password,
    national_id: payload.national_id,
    full_name: payload.full_name,
    phoneNumber: payload.phoneNumber,
    gender: payload.gender,
    cardId: payload.cardId,
  });
};

export const requestOtpLogin = (national_id) => {
  return api.post("/auth/login", { national_id });
};

export const verifyOtp = (national_id, otp) => {
  return api.post("/auth/verify", { national_id, otp });
};
