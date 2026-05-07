import { create } from "zustand";
import type { Event, EventInsight } from "../types";
import axios from "../service/axios_config";
import { toastError, toastSuccess } from "../utilities/toast_message";
import { END_POINT_API } from "../utilities/backend_config";

interface EventsState {
  events: Event[];
  fetchEvents: (
    searchText?: string,
    categ?: string,
    date?: string,
    is_featured?: boolean,
    is_unapproved?: boolean,
    user_id?: string,
  ) => Promise<void>;
  fetchSelfEvents: () => Promise<Event[] | undefined>;
  fetchEventById: (id: string) => Promise<Event | null>;
  fetchEventInsight: (id: string) => Promise<EventInsight | null>;
  addEvent: (event: Event) => Promise<void>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

const useEventsStore = create<EventsState>((set) => ({
  events: [],

  fetchEvents: async (
    searchText = "",
    categ = "",
    date = "",
    is_featured = false,
    is_unapproved = false,
    user_id = "",
  ) => {
    try {
      const { data } = await axios.get(
        `${END_POINT_API.EVENTS.BASE}?search=${searchText}&categ=${categ}&date=${date}&is_featured=${is_featured}&is_unapproved=${is_unapproved}&user_id=${user_id}`,
      );

      if (data?.success) {
        set({ events: data.data });
      }
    } catch (err) {
      console.error("fetchEvents error:", err);
      toastError("Failed to fetch events");
    }
  },

  fetchSelfEvents: async () => {
    try {
      const response = await axios.get(`${END_POINT_API?.EVENTS?.SELF}`);

      return response?.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch self events");
    }
  },

  fetchEventById: async (id: string) => {
    try {
      const response = await axios.get(`${END_POINT_API?.EVENTS?.BY_ID(id)}`);

      return response.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch event");
    }
  },

  addEvent: async (event: Event) => {
    const token = localStorage.getItem("mjx_ticket_token");

    try {
      const formData = new FormData();

      for (const key of Object.keys(event) as (keyof Event)[]) {
        const k = key;
        const value = event[k];

        // Handle prices
        if (k === "prices") {
          formData.append(k, JSON.stringify(value));
        }

        // Handle user
        else if (k === "user") {
          if (
            value &&
            typeof value === "object" &&
            "_id" in value &&
            value._id
          ) {
            formData.append("user", value._id);
          } else if (typeof value === "string") {
            formData.append("user", value);
          } else {
            formData.append("user", "null");
          }
        }

        // Handle file + normal fields
        else {
          if (value instanceof File) {
            formData.append(k, value);
          } else if (value !== undefined && value !== null) {
            formData.append(k, String(value));
          }
        }
      }

      const response = await axios.post(
        `${END_POINT_API?.EVENTS?.BASE}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const newEvent = response.data;

      if (newEvent.success) {
        toastSuccess(newEvent.message || "Event added successfully");

        set((state) => ({
          events: [...state.events, newEvent.data],
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to add event");
    }
  },

  updateEvent: async (id, event) => {
    const token = localStorage.getItem("mjx_ticket_token");

    try {
      const formData = new FormData();

      for (const key of Object.keys(event) as (keyof Event)[]) {
        const k = key;
        const value = event[k];

        if (k === "prices") {
          formData.append(k, JSON.stringify(value));
        } else if (k === "user") {
          if (
            value &&
            typeof value === "object" &&
            "_id" in value &&
            value._id
          ) {
            formData.append("user", value._id);
          } else if (typeof value === "string") {
            formData.append("user", value);
          } else {
            formData.append("user", "null");
          }
        } else {
          if (value instanceof File) {
            formData.append(k, value);
          } else if (value !== undefined && value !== null) {
            formData.append(k, String(value));
          }
        }
      }

      const resp = await axios.put(
        `${END_POINT_API?.EVENTS?.BY_ID(id)}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (resp.data.success) {
        toastSuccess(resp.data.message || "Event updated successfully");

        set((state) => ({
          events: state.events.map((e) =>
            String(e._id) === String(id) ? resp.data.data : e,
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to update event");
    }
  },

  // Inside useEventsStore
  fetchEventInsight: async (id: string) => {
    try {
      const response = await axios.get(
        `${END_POINT_API.EVENTS.BASE}/insight/${id}`,
      );
      return response.data.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  deleteEvent: async (id) => {
    try {
      const resp = await axios.delete(`${END_POINT_API?.EVENTS?.BASE}/${id}`);

      if (resp.data.success) {
        toastSuccess(resp.data.message || "Event deleted successfully");
        set((state) => ({
          events: state.events.filter((u) => String(u._id) !== String(id)),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to delete event");
    }
  },
}));

export default useEventsStore;
