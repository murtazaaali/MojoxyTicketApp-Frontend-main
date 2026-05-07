export const ROUTES_PATHS = {
  PUBLIC: {
    HOME: "/",
    EVENTS_LIST: "/events-list",
    EVENT_DETAIL: (event_id: string) => `/event-detail/${event_id}`,
    CATEGORIES: "/categories",
    ORGANIZER_PROFILE: (id?: string) =>
      id ? `/organizer/${id}` : "/organizer",
  },

  AUTH: {
    BASE: "/auth",
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_OTP: (email?: string) => `/auth/verify-otp/${email}`,
    RESET: (token: string) => `/auth/reset-password/${token}`,
  },

  DASHBOARD: {
    BASE: "/dashboard",

    USERS: {
      LIST: "/dashboard/users/list",
      FORM: (id?: string) => (id ? `/dashboard/user/${id}` : "/dashboard/user"),
    },

    EVENTS: {
      LIST: "/dashboard/events/list",
      UNAPPROVED: "/dashboard/events-unapproved/list",
      FORM: (event_id?: string) =>
        event_id ? `/dashboard/event/${event_id}` : "/dashboard/event",
      SELF: "/dashboard/event/self",
      SELF_EVENT_UPDATE: (event_id: string) =>
        `/dashboard/event/${event_id}/update`,
      INSIGHT: (event_id: string) => `/dashboard/event/insight/${event_id}`,
    },

    PLATFORM_PRICING: {
      LIST: "/dashboard/platform_pricings/list",
      FORM: (id?: string) =>
        id
          ? `/dashboard/platform_pricing/${id}`
          : "/dashboard/platform_pricing",
    },

    TICKET: {
      SELF: "/dashboard/ticket/self",
      LIST: "/dashboard/tickets/list",
      FORM: (id?: string) =>
        id ? `/dashboard/ticket/${id}` : "/dashboard/ticket",
      SELF_TICKET_UPDATE: (id: string) => `/dashboard/ticket/${id}/update`,
    },
  },

  USER: {
    BASE: "/user",
    PROFILE: "/user/profile",
    CREATE_EVENT: "/user/create-event",
  },

  TICKET: {
    BOOKING: (id: string) => `/ticket/booking/${id}`,
    VERIFY: (ticket_token: string) => `/ticket/${ticket_token}/verify`,
  },

  SYSTEM: {
    DENIED: "/denied",
    NOT_FOUND: "*",
  },
} as const;

export const relativePath = (fullPath: string, parent: string) => {
  return fullPath.replace(parent, "").replace(/^\/+/, "");
};
