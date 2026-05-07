export type MonthlyRevenue = {
  month: string; // e.g., "1-2026" for Jan 2026
  revenue: number; // total revenue for that month
  tickets: number; // tickets sold that month
};

export type EventTicketSales = {
  eventName: string;
  ticketsSold: number;
};

export type AdminDashboard = {
  totalUsers: number;
  totalEvents: number;
  totalRevenue: number;
  soldTickets: number;
  platformProfit: number;
  pendingApprovals: number;
  revenueData: MonthlyRevenue[];
  eventTicketSalesData: EventTicketSales[];
};

export type UserDashboard = {
  totalPurchases: number;
  totalSpent: number;
  totalEvents: number;
  totalEarning: number;
  ticketSolds: number;
};

export type DashboardResponse =
  | { success: true; role: "admin"; data: AdminDashboard }
  | { success: false; message: string };
