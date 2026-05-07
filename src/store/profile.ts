import { create } from "zustand";
import type { User } from "../types";
import axios from "../service/axios_config";

import { toastError } from "../utilities/toast_message";
import { END_POINT_API } from "../utilities/backend_config";

interface ProfileState {
  profile: User | null;
  isFetched: boolean;

  fetchProfile: () => Promise<void>;
  updateProfile: (id: string, data: Partial<User>) => Promise<void>;
  changePassword: (id: string, password: string) => Promise<void>;
  resetProfile: () => void;
}

const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  isFetched: false,

  fetchProfile: async () => {
    const { isFetched } = get();
    if (isFetched) return;

    try {
      const response = await axios.get(`${END_POINT_API?.AUTH?.PROFILE}`);

      set({ profile: response.data, isFetched: true });
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch profile");
    }
  },

  updateProfile: async (id, data) => {
    try {
      const resp = await axios.put(
        `${END_POINT_API?.AUTH?.PROFILE}/${id}`,
        data,
      );
      if (resp.status === 200) {
        set((state) => ({
          profile: { ...state.profile, ...data } as User,
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to update profile");
    }
  },

  changePassword: async (id, password) => {
    try {
      if (id) {
        const resp = await axios.put(
          `${END_POINT_API?.AUTH?.PROFILE}/${id}/password`,
          {
            password,
          },
        );

        return resp.data;
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to change password");
    }
  },

  resetProfile: () => set({ profile: null, isFetched: false }),
}));

export default useProfileStore;
