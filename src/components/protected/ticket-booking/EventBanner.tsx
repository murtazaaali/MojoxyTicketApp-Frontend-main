import { Calendar, Clock, FileText, MapPin, Eye } from "lucide-react";
import { useState } from "react";
import type { Event } from "../../../types";
import { formatDate, formatTime } from "../../../utilities/functions";
import SeatingModal from "./SeatingModal";

interface EventBannerProps {
    event: Event;
}

const getImageSrc = (image: Event["image"]) =>
    image instanceof File ? URL.createObjectURL(image) : image;

const EventBanner = ({ event }: EventBannerProps) => {
    const [showSeating, setShowSeating] = useState(false);

    const dateRange =
        event?.start_date === event?.end_date
            ? formatDate(event?.start_date)
            : `${formatDate(event?.start_date)} – ${formatDate(event?.end_date)}`;

    return (
        <>
            <div className="rounded-2xl overflow-hidden border border-white/10 mb-6">
                {/* Hero Image */}
                <div className="relative h-44">
                    <img
                        src={getImageSrc(event?.image)}
                        alt={event?.event_name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-wider">
                                {event?.categ.toUpperCase()}
                            </span>
                            <span className="bg-white/10 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-white/10 capitalize">
                                {event?.event_type}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-white">{event?.event_name}</h2>
                        <p className="text-gray-400 text-sm mt-0.5">{event?.comp_name}</p>
                    </div>
                </div>

                {/* Description */}
                {event?.description && (
                    <MetaRow>
                        <FileText className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        <p className="text-gray-400 text-sm">{event.description}</p>
                    </MetaRow>
                )}

                {/* Date / Time / City */}
                <MetaRow className="flex-wrap gap-x-6 gap-y-2">
                    <MetaItem icon={<Calendar className="w-4 h-4 text-blue-400" />} label={dateRange} />
                    <MetaItem
                        icon={<Clock className="w-4 h-4 text-amber-400" />}
                        label={`${formatTime(event?.start_time)} – ${formatTime(event?.end_time)}`}
                    />
                    <MetaItem icon={<MapPin className="w-4 h-4 text-rose-400" />} label={`${event?.address ?? "N/A"} ( ${event?.city ?? "N/A"} )`} />
                </MetaRow>

                {/* Seating Layout */}
                {event?.overview_image && (
                    <MetaRow>
                        <button
                            onClick={() => setShowSeating(true)}
                            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors group"
                        >
                            <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            View Seating Layout
                        </button>
                    </MetaRow>
                )}
            </div>

            {showSeating && event?.overview_image && (
                <SeatingModal setShowSeatingModal={setShowSeating} event={event} />
            )}
        </>
    );
};

// ── Small layout helpers ────────────────────────────────────────────────────

const MetaRow = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={`bg-white/3 px-5 py-3 flex items-start gap-2 border-t border-white/8 ${className}`}
    >
        {children}
    </div>
);

const MetaItem = ({
    icon,
    label,
}: {
    icon: React.ReactNode;
    label?: string;
}) => (
    <div className="flex items-center gap-2 text-gray-400 text-sm">
        {icon}
        <span>{label}</span>
    </div>
);

export default EventBanner;