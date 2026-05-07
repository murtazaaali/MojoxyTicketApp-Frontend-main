import type { Event } from "./event";
import type { RefUser } from "./users";

export interface TicketDetail {
  name: string; // Name of attendee
  type: string; // Ticket type e.g., Standard, VIP
  priceAmount: number; // Price paid for this ticket

  cnic?: string;
  email?: string;
  phone?: string;

  code?: string; // Unique verification code
  qr_code?: string;
  token?: string;
  status: "active" | "used";
}

export interface Ticket {
  _id?: string;
  event?: Event | null;
  user?: RefUser | null;
  total_amount: number;
  platform_fee_type: string;
  platform_fee_value: number;
  tickets: TicketDetail[];
  payment_status: "pending" | "completed" | "failed";
  payment_method: string;
  status: "booked" | "canceled" | "refunded";
  createdAt?: string;
}

export type TicketFormData = Omit<Ticket, "_id" | "event" | "user"> & {
  event?: string | null;
  user?: string | null;
};

// ticket booking page

export interface AttendeeEntry {
  name: string;
  type: string;
  priceAmount: number;

  cnic?: string;
  email?: string;
  phone?: string;
}

export interface TicketVerifyResult {
  success: boolean;
  message: string;
  data: {
    code: string;
    name: string;
    type: string;
    event: string;
  };
}
