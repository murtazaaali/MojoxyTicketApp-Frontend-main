import { create } from "zustand";
import type { DashboardResponse } from "../types";
import axios from "../service/axios_config";
import { toastError } from "../utilities/toast_message";
import { END_POINT_API } from "../utilities/backend_config";

interface DashbaordState {
  fetchAdminDashboard: () => Promise<DashboardResponse | null>;
}

const useDashbaordStore = create<DashbaordState>(() => ({
  fetchAdminDashboard: async () => {
    const token = localStorage.getItem("mjx_ticket_token");

    try {
      const response = await axios.get(`${END_POINT_API?.DASHBOARD?.BASE}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.data.success) {
        toastError(response.data.message);
        return null;
      }
      const fetchedDashbaord = response.data;
      return fetchedDashbaord;
    } catch (err) {
      console.error(err);
      toastError("Failed to dashboard");
    }
  },
}));

export default useDashbaordStore;
