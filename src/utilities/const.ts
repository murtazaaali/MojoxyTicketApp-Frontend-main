import {
  Music,
  Cpu,
  Utensils,
  Trophy,
  Palette,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Plane,
  Gamepad2,
  Shirt,
  Dumbbell,
  ChefHat,
  Wrench,
} from "lucide-react";

import { City, Country } from "country-state-city";

export const MAP_REGEX_PATTERN =
  /^https?:\/\/(www\.)?(google\.com\/maps|goo\.gl\/maps|maps\.app\.goo\.gl)\/.*/i;

export const OTPEXPIRETIME = 20;

export const COUNTRIES = Country.getAllCountries();
export const CITIES = City.getCitiesOfCountry("PK");

export const COUNTRIESLIST = COUNTRIES.map((country) => country.name);
export const CITIESLIST = CITIES?.map((city) => {
  return {
    label: city.name,
    value: city.name,
  };
});

export const EVENT_CATEGORIES = [
  {
    label: "Music",
    value: "music",
    icon: Music,
  },
  {
    label: "Technology",
    value: "technology",
    icon: Cpu,
  },
  {
    label: "Food",
    value: "food",
    icon: Utensils,
  },
  {
    label: "Sports",
    value: "sports",
    icon: Trophy,
  },
  {
    label: "Art",
    value: "art",
    icon: Palette,
  },
  {
    label: "Business",
    value: "business",
    icon: Briefcase,
  },
  {
    label: "Education",
    value: "education",
    icon: GraduationCap,
  },
  {
    label: "Health & Wellness",
    value: "health",
    icon: HeartPulse,
  },
  {
    label: "Travel",
    value: "travel",
    icon: Plane,
  },
  {
    label: "Gaming",
    value: "gaming",
    icon: Gamepad2,
  },
  {
    label: "Fashion",
    value: "fashion",
    icon: Shirt,
  },
  {
    label: "Fitness",
    value: "fitness",
    icon: Dumbbell,
  },
  {
    label: "Cooking",
    value: "cooking",
    icon: ChefHat,
  },
  {
    label: "DIY",
    value: "diy",
    icon: Wrench,
  },
  {
    label: "Competitions",
    value: "competitions",
    icon: Trophy,
  },
];

export const EVENT_TYPES = [
  {
    label: "Offline",
    value: "offline",
  },
  {
    label: "Online",
    value: "online",
  },
  {
    label: "Both",
    value: "both",
  },
  {
    label: "Virtual",
    value: "virtual",
  },
];

export const EVENT_STATUS = [
  {
    label: "Upcoming",
    value: "upcoming",
  },
  {
    label: "Ongoing",
    value: "ongoing",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
  {
    label: "Postponed",
    value: "postponed",
  },
  {
    label: "Rescheduled",
    value: "rescheduled",
  },
  {
    label: "Scheduled",
    value: "scheduled",
  },
];

export const ROLE_OPTIONS = [
  { value: "", label: "Select Role" },
  { value: "admin", label: "Admin", description: "Full system access" },
  { value: "user", label: "User", description: "Limited access" },
];

export const COMMISSION_TYPES = [
  { value: "percentage", label: "Percentage" },
  { value: "flat", label: "Flat" },
  { value: "fixed", label: "Fixed" },
];

export const PAYMENT_METHODS = [
  { value: "card", label: "Credit / Debit Card", icon: "💳" },
  { value: "paypal", label: "PayPal", icon: "🅿️" },
  { value: "easypaisa", label: "Easypaisa", icon: "📱" },
  { value: "jazzcash", label: "JazzCash", icon: "📲" },
];

export const PAYMENT_STATUS = [
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "failed", label: "Failed" },
];

export const TICKET_STATUS = [
  { value: "booked", label: "Booked" },
  { value: "canceled", label: "Canceled" },
  { value: "refunded", label: "Refunded" },
];

export const TICKET_HOLD_STATUS = [
  { value: "active", label: "Active" },
  { value: "used", label: "Used" },
];
