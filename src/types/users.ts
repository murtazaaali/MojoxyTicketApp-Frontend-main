export interface User {
  _id?: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  isActive: boolean;
  password?: string;
}

export type UserFormData = Omit<User, "_id">;

export interface RefUser {
  _id?: string;
  name: string;
  email: string;
  isActive: boolean;
}

export interface UserEventStats {
  totalEvents: number;
  upcomingEvents: number;
  pastEvents: number;
  totalAttendees: number;
}
