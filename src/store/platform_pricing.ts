import { create } from "zustand";
import type { PlatformPricing } from "../types";
import axios from "../service/axios_config";
import { toastError, toastSuccess } from "../utilities/toast_message";
import { END_POINT_API } from "../utilities/backend_config";

interface PlatformPricingState {
  platform_pricing: PlatformPricing[];
  isFetched: boolean;

  fetchPlatformPricing: () => Promise<void>;
  fetchPlatformPricingById: (id: string) => Promise<PlatformPricing | null>;
  addPlatformPricing: (platformPricing: PlatformPricing) => Promise<void>;
  updatePlatformPricing: (
    id: string,
    platformPricing: Partial<PlatformPricing>,
  ) => Promise<void>;
  deletePlatformPricing: (id: string) => Promise<void>;
}

const usePlatformPricingStore = create<PlatformPricingState>((set, get) => ({
  platform_pricing: [],
  isFetched: false,

  fetchPlatformPricing: async () => {
    const { isFetched } = get();
    if (isFetched) return;

    const token = localStorage.getItem("mjx_ticket_token");

    try {
      const response = await axios.get(
        `${END_POINT_API?.PLATFORM_PRICING?.BASE}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const fetchedPlatformPricing = response.data;
      if (fetchedPlatformPricing.success) {
        set({ platform_pricing: fetchedPlatformPricing.data, isFetched: true });
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch platform pricing");
    }
  },

  fetchPlatformPricingById: async (id: string) => {
    const token = localStorage.getItem("mjx_ticket_token");

    try {
      const response = await axios.get(
        `${END_POINT_API?.PLATFORM_PRICING?.BASE}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch platform pricing by id");
    }

    return null;
  },

  addPlatformPricing: async (platformPricing) => {
    const token = localStorage.getItem("mjx_ticket_token");

    try {
      const response = await axios.post(
        `${END_POINT_API?.PLATFORM_PRICING?.BASE}`,
        platformPricing,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const newPlatformPricing = response.data;
      if (newPlatformPricing.success) {
        toastSuccess(
          newPlatformPricing.message || "Platform pricing added successfully",
        );
        set((state) => ({
          platform_pricing: [
            ...state.platform_pricing,
            newPlatformPricing.data,
          ],
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to add platform pricing");
    }
  },

  updatePlatformPricing: async (id, platformPricing) => {
    const token = localStorage.getItem("mjx_ticket_token");

    try {
      const resp = await axios.put(
        `${END_POINT_API?.PLATFORM_PRICING?.BY_ID(id)}`,
        platformPricing,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (resp.data.success) {
        toastSuccess(
          resp.data.message || "Platform pricing updated successfully",
        );
        set((state) => ({
          platform_pricing: state.platform_pricing.map((u) =>
            String(u._id) === String(id) ? { ...u, ...platformPricing } : u,
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to update platform pricing");
    }
  },

  deletePlatformPricing: async (id) => {
    const token = localStorage.getItem("mjx_ticket_token");

    try {
      const resp = await axios.delete(
        `${END_POINT_API?.PLATFORM_PRICING?.BY_ID(id)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (resp.data.success) {
        toastSuccess(
          resp.data.message || "Platform pricing deleted successfully",
        );
        set((state) => ({
          platform_pricing: state.platform_pricing.filter(
            (u) => String(u._id) !== String(id),
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to delete platform pricing");
    }
  },
}));

export default usePlatformPricingStore;
