import type { AttendeeEntry } from "../types";

export const updateAttendeeField = (
  index: number,
  field: keyof AttendeeEntry,
  value: string,
  setAttendees: React.Dispatch<React.SetStateAction<AttendeeEntry[]>>,
) => {
  setAttendees((prev) =>
    prev.map((a, i) => (i === index ? { ...a, [field]: value } : a)),
  );
};

export const removeAttendee = (
  index: number,
  attendees: AttendeeEntry[],
  setAttendees: React.Dispatch<React.SetStateAction<AttendeeEntry[]>>,
  setTicketCounts: React.Dispatch<React.SetStateAction<Record<string, number>>>,
) => {
  if (attendees.length <= 1) return;
  const removed = attendees[index];
  setAttendees((prev) => prev.filter((_, i) => i !== index));
  setTicketCounts((prev) => ({
    ...prev,
    [removed.type]: (prev[removed.type] || 1) - 1,
  }));
};
