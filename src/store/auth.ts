import { create } from "zustand";
import { parseJwt } from "../service/jwt";

interface AuthState {
  user: {
    name: string;
    email: string;
  } | null;
  token: string | null;
  logoutTimerId: number | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  autoLogoutOnExpiry: (token: string) => void;
  checkAndSetupAutoLogout: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  logoutTimerId: null,

  login: async (email, password) => {
    const { authService } = await import("../service/auth");
    const result = await authService.signin(email, password);
    if (result) {
      set({ user: result.user, token: result.token });
      get().autoLogoutOnExpiry(result.token);
    }
  },

  logout: () => {
    import("../service/auth").then(({ authService }) => authService.logout());
    set({ user: null, token: null });

    // if (get().logoutTimerId) {
    //   clearTimeout(get().logoutTimerId);
    //   set({ logoutTimerId: null });
    // }
    window.location.href = "/auth/signin";
  },

  autoLogoutOnExpiry: (token: string) => {
    const payload = parseJwt(token);
    if (!payload || !payload.exp) return;

    const expiryMs = payload.exp * 1000;
    const nowMs = Date.now();
    const timeout = expiryMs - nowMs;

    if (timeout <= 0) {
      get().logout();
    } else {
      const timerId = window.setTimeout(() => {
        get().logout();
      }, timeout);
      set({ logoutTimerId: timerId });
    }
  },

  checkAndSetupAutoLogout: () => {
    const token = localStorage.getItem("token");
    if (token) {
      get().autoLogoutOnExpiry(token);
    }
  },
}));

export default useAuthStore;
