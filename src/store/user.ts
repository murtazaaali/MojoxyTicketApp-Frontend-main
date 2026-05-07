import { create } from "zustand";
import type { User } from "../types";
import axios from "../service/axios_config";
import { toastError, toastSuccess } from "../utilities/toast_message";
import { END_POINT_API } from "../utilities/backend_config";

interface UsersState {
  users: User[];

  fetchUsers: (searchQuery?: string) => Promise<void>;
  fetchUserById: (id: string) => Promise<User | null>;
  addUser: (user: User) => Promise<void>;
  updateUser: (id: string, user: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

const useUsersStore = create<UsersState>((set) => ({
  users: [],

  fetchUsers: async (searchQuery = "") => {
    try {
      const response = await axios.get(
        `${END_POINT_API?.USERS?.BASE}?search=${searchQuery}`,
      );
      const fetchedUsers = response.data;
      if (fetchedUsers.success) {
        set({ users: fetchedUsers.data });
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch user");
    }
  },

  fetchUserById: async (id: string) => {
    try {
      const response = await axios.get(`${END_POINT_API?.USERS?.BY_ID(id)}`);
      return response.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch user");
    }
  },

  addUser: async (user) => {
    const token = localStorage.getItem("mjx_ticket_token");

    try {
      const response = await axios.post(`${END_POINT_API?.USERS?.BASE}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const newUser = response.data;
      if (newUser.success) {
        toastSuccess(newUser.message || "User added successfully");
        set((state) => ({
          users: [...state.users, newUser.data],
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to add user");
    }
  },

  updateUser: async (id, user) => {
    const token = localStorage.getItem("mjx_ticket_token");

    try {
      const resp = await axios.put(`${END_POINT_API?.USERS?.BY_ID(id)}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (resp.data.success) {
        toastSuccess(resp.data.message || "User updated successfully");
        set((state) => ({
          users: state.users.map((u) =>
            String(u._id) === String(id) ? { ...u, ...user } : u,
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to update user");
    }
  },

  deleteUser: async (id) => {
    const token = localStorage.getItem("mjx_ticket_token");

    try {
      const resp = await axios.delete(`${END_POINT_API?.USERS?.BY_ID(id)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (resp.data.success) {
        toastSuccess(resp.data.message || "User deleted successfully");
        set((state) => ({
          users: state.users.filter((u) => String(u._id) !== String(id)),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to delete user");
    }
  },
}));

export default useUsersStore;
