export const BACKEND_URL = ` https://mojoxy-ticket-backend-81qh.vercel.app/`

const BASE_API_URL = "/api";

export const END_POINT_API = {
  DASHBOARD: {
    BASE: `${BASE_API_URL}/dashboard`,
  },

  AUTH: {
    BASE: `${BASE_API_URL}/auth`,
    PROFILE: `${BASE_API_URL}/auth/profile`,
    SIGNIN: `${BASE_API_URL}/auth/signin`,
    SIGNUP: `${BASE_API_URL}/auth/signup`,
    FORGOT_PASSWORD_OTP: `${BASE_API_URL}/auth/otp/forgot-password`,
    GENERATE_OTP: `${BASE_API_URL}/auth/otp/generate-otp`,
    VERIFY_OTP: `${BASE_API_URL}/auth/otp/verify-otp`,
    RESET_PASSWORD: `${BASE_API_URL}/auth/reset-password`,
  },

  EVENTS: {
    BASE: `${BASE_API_URL}/event`,
    SELF: `${BASE_API_URL}/event/self`,
    BY_ID: (id: string) => `${BASE_API_URL}/event/${id}`,
    USER_EVENTS: (userId: string) => `${BASE_API_URL}/event/user/${userId}`,
  },

  PLATFORM_PRICING: {
    BASE: `${BASE_API_URL}/platform-pricing`,
    BY_ID: (id: string) => `${BASE_API_URL}/platform-pricing/${id}`,
  },

  USERS: {
    BASE: `${BASE_API_URL}/user`,
    BY_ID: (id: string) => `${BASE_API_URL}/user/${id}`,
  },

  TICKETS: {
    BASE: `${BASE_API_URL}/ticket`,
    BY_ID: (id: string) => `${BASE_API_URL}/ticket/${id}`,
    SELF: `${BASE_API_URL}/ticket/self`,
    VERIFY: (ticket_token: string) =>
      `${BASE_API_URL}/ticket/verify/${ticket_token}`,
  },
};
