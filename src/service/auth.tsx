import { AxiosError } from "axios";
import axios from "../service/axios_config";
import type { User } from "../types";
import { toastError } from "../utilities/toast_message";
import { END_POINT_API } from "../utilities/backend_config";



export const authService = {
    async signin(email: string, password: string) {
        try {

            const response = await axios.post(`${END_POINT_API?.AUTH?.SIGNIN}`, {
                email,
                password,
            });
            const data = response?.data;



            if (!data.success) {
                toastError(data.message || "Something went wrong.");
            }

            const user: {
                name: string;
                email: string;
            } = {
                // id: data._id,
                name: data.name,
                email: data.email,
            };

            return { user, token: data.token };
        } catch (error: unknown) {
            const err = error as AxiosError<{ message: string }>;
            const msg = err.response?.data?.message || "Anything went wrong.";
            toastError(msg);
        }
    },

    async signup(name: string, email: string, password: string, role: string, phone: string) {
        const response = await axios.post(`${END_POINT_API?.AUTH?.SIGNUP}`, {
            name,
            email,
            password,
            role,
            phone
        });

        const data = response?.data;

        return {
            success: data.success,
            token: data.token,
            user: data.user
        };
    },

    async generateOTP(email: string) {
        const res = await axios.post(`${END_POINT_API?.AUTH?.GENERATE_OTP}`, {
            email,
        });

        return res?.data;
    },

    async verifyOTP(email: string, otp: string) {
        const res = await axios.post(`${END_POINT_API?.AUTH?.VERIFY_OTP}`, {
            email,
            otp,
        });

        return res?.data;
    },

    logout(): void {
        // TODO: Implement actual logout logic
        localStorage.removeItem("mjx_ticket_token");
        localStorage.removeItem("mjx_ticket_user");
    },

    getCurrentUser(): User | null {
        const user = localStorage.getItem("mjx_ticket_user");

        return user ? JSON.parse(user) : null;
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem("mjx_ticket_token");
    },


    async forgotPassword(email: string) {
        const res = await axios.post(
            `${END_POINT_API?.AUTH?.FORGOT_PASSWORD_OTP}`,
            { email }
        );

        return res.data;
    },

    async resetPassword(token: string, password: string) {
        const res = await axios.post(
            `${END_POINT_API?.AUTH?.RESET_PASSWORD}`,
            { token, password }
        );

        return res.data;
    },

};
