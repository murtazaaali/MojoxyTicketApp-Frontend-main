import { Calendar, DollarSign, Users, Ticket, CreditCard, Clock } from "lucide-react";
import { StatCard, SecondaryStatCard } from "..";
import type { AdminDashboard } from "../../../types";
import { PageHeader } from "../../shared";
import EventBarChart from "./EventBarChart";
import RevenueLineChart from "./RevenueLineChart";

interface Props {
    userName: string;
    data: AdminDashboard | null;
}

const AdminDashboard = ({ userName, data }: Props) => {
    return (
        <div className="min-h-screen text-white">
            <PageHeader
                title={`Welcome ${userName} !`}
                description="to the Admin Dashboard"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
                <SecondaryStatCard icon={Users} label="Total Users"
                    value={data?.totalUsers || 0}
                    color="bg-zinc-900 border-blue-500 text-blue-400" />
                <SecondaryStatCard icon={Calendar} label="Total Events"
                    value={data?.totalEvents || 0}
                    color="bg-zinc-900 border-blue-500 text-blue-400" />
                <SecondaryStatCard icon={Clock} label="Pending Events Approval"
                    value={`${data?.pendingApprovals || 0}`} color="bg-zinc-900 border-blue-500 text-blue-400" />

                <SecondaryStatCard icon={Ticket} label="Total Sold Tickets" value={data?.soldTickets || 0}
                    color="bg-zinc-900 border-blue-500 text-blue-400"
                />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <StatCard
                    icon={<DollarSign className="w-6 h-6" />}
                    label="Total Revenue"
                    value={`RS. ${data?.totalRevenue || 0}`}
                    color="from-blue-600 to-green-600"
                />
                <StatCard
                    icon={<CreditCard className="w-6 h-6" />}
                    label="Platform Profit"
                    value={`RS. ${data?.platformProfit || 0}`}
                    color="from-pink-600 to-blue-600"
                />
            </div>

            <div className="">
                <RevenueLineChart revenueData={data?.revenueData || []} />
            </div>

            <div className="">
                <EventBarChart eventTicketSalesData={data?.eventTicketSalesData || []} />
            </div>
        </div>
    );
};

export default AdminDashboard;
