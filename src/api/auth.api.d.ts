import { AxiosPromise } from "axios";

interface RegisterPayload {
    email: string;
    password: string;
    national_id: string;
    full_name: string;
    phoneNumber: string;
    gender: string;
    cardId: string;
}

export function registerUser(payload: RegisterPayload): AxiosPromise;
export function requestOtpLogin(national_id: string): AxiosPromise;
export function verifyOtp(national_id: string, otp: string): AxiosPromise;
export function updateUserProfile(data: any): AxiosPromise;
