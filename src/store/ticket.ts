import { create } from "zustand";
import type { Ticket, TicketVerifyResult } from "../types";
import axios from "../service/axios_config";
import { toastError, toastSuccess } from "../utilities/toast_message";
import { END_POINT_API } from "../utilities/backend_config";

interface TicketsState {
  tickets: Ticket[];
  isFetched: boolean;

  fetchTickets: () => Promise<void>;
  fetchTicketById: (id: string) => Promise<Ticket | null>;
  fetchSelfTickets: () => Promise<Ticket[] | undefined>;
  addTicket: (ticket: Ticket) => Promise<void>;
  updateTicket: (id: string, ticket: Partial<Ticket>) => Promise<void>;
  deleteTicket: (id: string) => Promise<void>;
  verifyTicket: (ticket_token: string) => Promise<TicketVerifyResult>;
}

const useTicketsStore = create<TicketsState>((set, get) => ({
  tickets: [],
  isFetched: false,

  fetchTickets: async () => {
    const { isFetched } = get();
    if (isFetched) return;

    try {
      const response = await axios.get(`${END_POINT_API?.TICKETS?.BASE}`);
      const fetchedTickets = response.data;
      if (fetchedTickets.success) {
        set({ tickets: fetchedTickets.data, isFetched: true });
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch tickets");
    }
  },

  fetchSelfTickets: async () => {
    const token = localStorage.getItem("mjx_ticket_token");

    try {
      const response = await axios.get(`${END_POINT_API?.TICKETS?.SELF}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response?.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch self tickets");
    }
  },

  fetchTicketById: async (id: string) => {
    try {
      const response = await axios.get(`${END_POINT_API?.TICKETS?.BY_ID(id)}`);
      return response.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch ticket");
    }
  },

  addTicket: async (ticket) => {
    const token = localStorage.getItem("mjx_ticket_token");

    try {
      const response = await axios.post(
        `${END_POINT_API?.TICKETS?.BASE}`,
        ticket,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const newTicket = response.data;
      if (newTicket.success) {
        toastSuccess(newTicket.message || "Ticket added successfully");
        set((state) => ({
          tickets: [...state.tickets, newTicket.data],
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to add ticket");
    }
  },

  updateTicket: async (id, ticket) => {
    const token = localStorage.getItem("mjx_ticket_token");

    try {
      const resp = await axios.put(
        `${END_POINT_API?.TICKETS?.BY_ID(id)}`,
        ticket,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (resp.data.success) {
        // Success toast
        toastSuccess(resp.data.message || "Ticket updated successfully");

        // Update local state
        set((state) => ({
          tickets: state.tickets.map((t) =>
            String(t._id) === String(id) ? resp.data.data : t,
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to update ticket");
    }
  },

  deleteTicket: async (id) => {
    const token = localStorage.getItem("mjx_ticket_token");

    try {
      const resp = await axios.delete(`${END_POINT_API?.TICKETS?.BY_ID(id)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (resp.data.success) {
        toastSuccess(resp.data.message || "Ticket deleted successfully");
        set((state) => ({
          tickets: state.tickets.filter((t) => String(t._id) !== String(id)),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to delete ticket");
    }
  },

  verifyTicket: async (ticket_token) => {
    const token = localStorage.getItem("mjx_ticket_token");

    try {
      const resp = await axios.get(
        `${END_POINT_API?.TICKETS?.VERIFY(ticket_token)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!resp.data.success) {
        toastError(resp.data.message);
      }

      return resp.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to find ticket");
    }
  },
}));

export default useTicketsStore;
