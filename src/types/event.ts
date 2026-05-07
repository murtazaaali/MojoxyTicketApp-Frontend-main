import type { LucideIcon } from "lucide-react";
import type { RefUser } from "./users";

export interface EventCategory {
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface EventPrice {
  _id?: string;
  type: string; // e.g., "Standard", "VIP", "Student"
  amount: number;
  capacity: number;
}

export interface Event {
  code?: string;
  _id?: string;
  user?: RefUser | null;
  event_name: string;
  comp_name: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  address: string;
  city: string;
  venue_link?: string;
  event_type: string;
  categ: string;
  description?: string;
  prices: EventPrice[];
  image: File | string;
  overview_image: File | string;
  status: string;
  approved: boolean;
  is_featured: boolean;
  platform_fees_type: string;
  platform_fees_value: number;
}

export type EventFormData = Omit<Event, "_id" | "user"> & {
  user?: string | null;
};

export interface EventInsightTier {
  type: string;
  price: number;
  capacity: number;
  sold: number;
  revenue: number;
}

export interface EventInsightStats {
  grossRevenue: number;
  platformRevenue: number;
  organizerRevenue: number;
  totalTicketsSold: number;
  bookingCount: number;
  tiers: EventInsightTier[];
}

export interface EventInsight {
  event: Event;
  stats: EventInsightStats;
}

export interface EventInsightResponse {
  success: boolean;
  data: EventInsight;
}
