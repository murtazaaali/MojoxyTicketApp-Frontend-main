import { useMemo } from "react";
import type { AttendeeEntry, Event } from "../types";

const useBookingTotals = (attendees: AttendeeEntry[], event: Event | null) => {
  const subtotal = useMemo(
    () => attendees.reduce((sum, a) => sum + a.priceAmount, 0),
    [attendees],
  );

  const platformFee = useMemo(() => {
    if (!event) return 0;
    return event.platform_fees_type === "percentage"
      ? (subtotal * event.platform_fees_value) / 100
      : event.platform_fees_value;
  }, [subtotal, event]);

  const grandTotal = subtotal + platformFee;

  return { subtotal, platformFee, grandTotal };
};

export default useBookingTotals;
