import { Calendar, Clock, MapPin } from "lucide-react";
import { formatDate } from "../../../utilities/functions";
import type { Event } from "../../../types";
import { Card } from "../../ui";
import { Link } from "react-router-dom";


interface EventCardProps {
    event: Event;
    viewMode: 'grid' | 'list';
    onClick: () => void;
}

const OrgEventCard = ({ event, viewMode }: EventCardProps) => {
    const isPast = new Date(event.end_date) < new Date();

    if (viewMode === 'list') {
        return (
            <Link to={`/events-list/${event._id}`} >
                <Card
                    // onClick={onClick}
                    className="flex flex-col sm:flex-row gap-4 p-4 cursor-pointer group hover:border-purple-500/50 transition-all"
                >
                    <img
                        src={
                            event?.image instanceof File
                                ? URL.createObjectURL(event.image)
                                : event?.image
                        }
                        alt={event.event_name}
                        className="w-full sm:w-48 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors mb-1">
                                    {event.event_name}
                                </h3>
                                <p className="text-sm text-gray-400">{event.comp_name}</p>
                            </div>
                            <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-xs font-medium">
                                {event.categ.toUpperCase()}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(event.start_date)} - {formatDate(event.end_date)}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {event.start_time}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {event.address || "N/A"} ( {event.city || "N/A"} )
                            </span>

                        </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
                        <span className="text-2xl font-bold text-white">
                            {event.prices && event.prices.length > 0 ? (
                                <div className="flex flex-col">
                                    {event.prices.map((price, index) => (
                                        <span key={index}>
                                            {price.type}: Rs. {price.amount.toLocaleString()}
                                            {price.capacity} attending
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <span>N/A</span>
                            )}
                        </span>
                        {isPast && (
                            <span className="text-xs text-gray-500">Ended</span>
                        )}
                    </div>
                </Card></Link>
        );
    }

    return (
        <Link to={`/events-list/${event._id}`} >
            <Card
                // onClick={onClick}
                className="group cursor-pointer overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1"
            >
                <div className="relative overflow-hidden">
                    <img
                        src={
                            event?.image instanceof File
                                ? URL.createObjectURL(event.image)
                                : event?.image
                        }
                        alt={event.event_name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {isPast && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-medium">
                                Event Ended
                            </span>
                        </div>
                    )}
                    <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-medium">
                        {event?.categ.toUpperCase()}
                    </div>
                </div>
                <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-1">
                        {event.event_name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">{event.comp_name}</p>

                    <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4 text-purple-400" />
                            {formatDate(event.start_date)} - {formatDate(event.end_date)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4 text-purple-400" />
                            {event.start_time} - {event.end_time}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <MapPin className="w-4 h-4 text-purple-400" />
                            <span className="line-clamp-1">  {event.address} ({event.city})</span>
                        </div>

                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-2xl font-bold text-white">
                            {event.prices && event.prices.length > 0 ? (
                                <div className="flex flex-col">
                                    {event.prices.map((price, index) => (
                                        <span key={index}>
                                            {price.type}: Rs. {price.amount.toLocaleString()}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <span>N/A</span>
                            )}
                        </span>
                        <span className="text-sm text-purple-400 group-hover:translate-x-1 transition-transform">
                            View Details →
                        </span>
                    </div>
                </div>
            </Card>
        </Link>

    );
};

export default OrgEventCard;


