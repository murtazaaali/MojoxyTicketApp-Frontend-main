import { useParams } from "react-router-dom";
import { TopHeader } from "../../../components/shared/form";
import { DollarSign, Ticket, TrendingUp, ShieldCheck } from "lucide-react";
import useEventsStore from "../../../store/event";
import type { EventInsight } from "../../../types";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/shared/LoadingComp";

const EventInsight = () => {
    const { event_id } = useParams<{ event_id: string }>();
    const { fetchEventInsight } = useEventsStore();

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["event-insight", event_id],
        queryFn: () => fetchEventInsight(event_id!),
        enabled: !!event_id,
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading)
        return <div className="p-10 text-white text-center"><Loader /></div>;

    if (isError || !data)
        return <div className="p-10 text-white text-center">No data found</div>;

    const { event, stats } = data as EventInsight;

    const statCards = [
        {
            label: "Gross Revenue",
            value: `Rs.${stats.grossRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: "text-green-400",
        },
        {
            label: "Platform Revenue",
            value: `Rs.${stats.platformRevenue.toLocaleString()}`,
            icon: ShieldCheck,
            color: "text-blue-400",
        },
        {
            label: "Tickets Sold",
            value: stats.totalTicketsSold,
            icon: Ticket,
            color: "text-purple-400",
        },
        {
            label: "Organizer Net",
            value: `Rs.${stats.organizerRevenue.toLocaleString()}`,
            icon: TrendingUp,
            color: "text-yellow-400",
        },
    ];

    return (
        <div className="p-6 text-white min-h-screen">
            <TopHeader
                title={event.event_name}
                description={`Insights and financial breakdown for ${event.comp_name}`}
            />

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-zinc-400 text-sm font-medium">{card.label}</p>
                                <h3 className={`text-2xl font-bold mt-1 ${card.color}`}>{card.value}</h3>
                            </div>
                            <div className={`p-3 rounded-xl bg-zinc-800 ${card.color}`}>
                                <card.icon size={24} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                {/* Event Details Card */}
                <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <h4 className="text-lg font-semibold mb-4 border-b border-zinc-800 pb-2">Event Info</h4>
                    <div className="space-y-4">
                        <div>
                            <p className="text-zinc-500 text-xs uppercase tracking-wider">Location</p>
                            <p className="text-sm">{event.address || "N/A"} ( {event.city || "N/A"} ) </p>
                        </div>

                        <div>
                            <p className="text-zinc-500 text-xs uppercase tracking-wider">Date & Time</p>
                            <p className="text-sm">{event.start_date} @ {event.start_time}</p>
                        </div>
                        <div>
                            <p className="text-zinc-500 text-xs uppercase tracking-wider">Status</p>
                            <span className="px-2 py-1 bg-green-900/30 text-green-500 text-xs rounded-full">
                                {event.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Ticket Tier Performance */}
                <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <h4 className="text-lg font-semibold mb-4 border-b border-zinc-800 pb-2">
                        Ticket Tier Performance
                    </h4>

                    <div className="space-y-4">
                        {stats.tiers.map((tier, idx) => {
                            const remaining = tier.capacity - tier.sold;
                            const fillRate = (tier.sold / tier.capacity) * 100;

                            return (
                                <div
                                    key={idx}
                                    className="p-4 rounded-xl bg-zinc-800/40 border border-zinc-700"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h5 className="font-semibold">{tier.type}</h5>
                                        <span className="text-sm text-zinc-400">
                                            Rs.{tier.price}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm text-zinc-400">
                                        <span>Sold: {tier.sold}</span>
                                        <span>Capacity: {tier.capacity}</span>
                                        <span>Remaining: {remaining}</span>
                                    </div>

                                    {/* progress bar */}
                                    <div className="w-full bg-zinc-700 h-2 rounded mt-3">
                                        <div
                                            className="h-2 bg-green-500 rounded"
                                            style={{ width: `${fillRate}%` }}
                                        />
                                    </div>

                                    <div className="mt-2 text-xs text-zinc-500">
                                        Revenue: Rs.{tier.revenue.toLocaleString()}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventInsight;