import { ShoppingCart, CreditCard, Calendar, DollarSign, Ticket } from "lucide-react";
import type { UserDashboard as UserDashboardType } from "../../../types";
import { StatCard, SecondaryStatCard } from "..";
import { PageHeader } from "../../shared";

interface Props {
    userName: string;
    data: UserDashboardType | null;
}

const UserDashboard = ({ userName, data }: Props) => {
    return (
        <div className="min-h-screen text-white">
            <PageHeader
                title={`Welcome ${userName} !`}
                description="to  User Dashboard"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">

                <SecondaryStatCard icon={ShoppingCart} label="Total Purchases"
                    value={data?.totalPurchases || 0}
                    color="bg-purple-900 border-blue-500 text-blue-400" />

                <SecondaryStatCard icon={Calendar} label="Total Events"
                    value={data?.totalEvents || 0}
                    color="bg-green-900 border-teal-500 text-green-400" />


                <SecondaryStatCard icon={Ticket} label="Tickets Sold"
                    value={data?.ticketSolds || 0}
                    color="bg-blue-900 border-indigo-500 text-indigo-400" />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">


                {/* Total Spent */}
                <StatCard
                    icon={<DollarSign className="w-6 h-6" />}
                    label="Total Spent"
                    value={`RS. ${data?.totalSpent || 0}`}
                    color="from-red-600 to-orange-600"
                />

                {/* Total Earning */}
                <StatCard
                    icon={<CreditCard className="w-6 h-6" />}
                    label="Total Earning"
                    value={`RS. ${data?.totalEarning || 0}`}
                    color="from-pink-600 to-purple-600"
                />


            </div>
        </div>
    );
};

export default UserDashboard;
