import type { Event } from "../types";

const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatTime = (time: string): string => {
  if (!time) return "N/A";
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${ampm}`;
};

const calculateGrandTotal = (
  feeType: string,
  feeValue: number,
  baseAmount: number,
) => {
  let platformFee = 0;

  const amount = Number(baseAmount) || 0;
  const value = Number(feeValue) || 0;

  if (feeType === "flat") {
    platformFee = value;
  } else if (feeType === "percentage") {
    platformFee = (amount * value) / 100;
  }

  platformFee = Number(platformFee.toFixed(2));
  const grandTotal = Number((amount + platformFee).toFixed(2));

  return {
    baseAmount: amount,
    platformFee,
    grandTotal,
  };
};

const FilterUpcomingEvents = (events: Event[]) => {
  const now = new Date();

  return events.filter((e) => {
    if (!e.approved) return false;
    if (!e.end_date || !e.end_time) return false;

    const eventEnd = new Date(`${e.end_date}T${e.end_time}`);
    if (isNaN(eventEnd.getTime())) return false;

    return eventEnd >= now;
  });
};

export { formatDate, formatTime, calculateGrandTotal, FilterUpcomingEvents };
