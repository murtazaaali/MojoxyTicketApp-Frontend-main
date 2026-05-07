import React from "react";
import { useNavigate } from "react-router";
import {
    Calendar,
    Clock,
    DollarSign,
    Eye,
    MapPin,
    Users,
    CheckCircle,
    Clock3
} from "lucide-react";
import type { Event } from "../../../types";
import { formatDate, formatTime } from "../../../utilities/functions";
import { Button } from "../../ui";
import { ROUTES_PATHS } from "../../../routes/routes_path";


interface EventCardProps {
    event: Event;
}

const SelfEventCard = React.memo(({ event }: EventCardProps) => {
    const navigate = useNavigate();

    const handleViewDetails = (id: string) => {

        navigate(ROUTES_PATHS.PUBLIC.EVENT_DETAIL(id));
    };

    const minPrice = event.prices?.length
        ? Math.min(...event.prices.map(p => p.amount))
        : null;

    const totalCapacity = event.prices?.reduce(
        (sum, price) => sum + price.capacity,
        0
    ) ?? 0;



    return (
        <div className="bg-white/10 backdrop-blur text-slate-200 rounded-2xl overflow-hidden hover:scale-[1.01] transition">
            {/* IMAGE */}
            <div className="h-40 w-full overflow-hidden">
                <img
                    src={
                        event?.image instanceof File
                            ? URL.createObjectURL(event.image)
                            : event?.image
                    }
                    alt={event.event_name}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="p-5">
                {/* HEADER */}
                <div className="flex justify-between items-start flex-wrap mb-4">
                    <div>
                        <h2 className="text-lg font-semibold">
                            {event.event_name}
                        </h2>
                        <p className="text-xs text-slate-400">{event.code}</p>
                    </div>

                    <span
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
              ${event.approved
                                ? "bg-green-500/15 text-green-400"
                                : "bg-yellow-500/15 text-yellow-400"}
            `}
                    >
                        {event.approved ? <CheckCircle size={14} /> : <Clock3 size={14} />}
                        {event.approved ? "Approved" : "Pending"}
                    </span>
                </div>

                {/* DETAILS */}
                <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {formatDate(event.start_date)} – {formatDate(event.end_date)}
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock size={16} />
                        {formatTime(event.start_time)} – {formatTime(event.end_time)}
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        {event.address || "N/A"} ( {event.city || "N/A"} )
                    </div>

                    <div className="flex items-center gap-2">
                        <Users size={16} />
                        {totalCapacity} seats
                    </div>

                    <div className="flex items-center gap-2">
                        <DollarSign size={16} />
                        Starting from  {minPrice?.toLocaleString()}
                    </div>
                </div>

                {/* FOOTER */}
                <div className="mt-5 pt-4 border-t border-white/10 flex gap-2">
                    {!event.approved && (
                        <Button
                            onClick={() => navigate(ROUTES_PATHS?.DASHBOARD?.EVENTS?.SELF_EVENT_UPDATE(event?._id as string))}
                            className="flex-1 flex items-center justify-center gap-2"
                            variant="secondary"
                            size="sm"
                        >
                            <Eye className="w-4 h-4" />
                            Update Event
                        </Button>
                    )}
                    <Button
                        onClick={() => handleViewDetails(event?._id as string)}
                        className="flex-1 flex items-center justify-center gap-2"
                        variant="secondary"
                        size="sm"
                    >
                        <Eye className="w-4 h-4" />
                        View Details
                    </Button>
                </div>

            </div>
        </div>
    );
});

export default SelfEventCard;
