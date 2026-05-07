import { useMemo } from "react";
import { Calendar, MapPin, Ticket, User } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { ROUTES_PATHS } from "../../routes/routes_path";
import useEventsStore from "../../store/event";

import { Badge, Button, Card } from "../../components/ui";
import { LoaderComp } from "../../components/shared";
import { DetailItem, Feature } from "../../components/public/event-detail";

const EventDetailPage = () => {
    const { fetchEventById } = useEventsStore();
    const { event_id } = useParams();
    const navigate = useNavigate();


    const {
        data: event,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["event", event_id],
        queryFn: () => fetchEventById(event_id!),
        enabled: !!event_id, // prevents running if undefined
    });


    if (!event_id) {
        navigate(ROUTES_PATHS.PUBLIC.EVENTS_LIST);
    }


    const prices = event?.prices ?? [];

    const minPrice = useMemo(() => {
        if (!prices.length) return null;
        return Math.min(...prices.map((p) => p.amount));
    }, [prices]);

    const totalCapacity = useMemo(() => {
        return prices.reduce((sum, p) => sum + p.capacity, 0);
    }, [prices]);

    const isExpired = !event?.end_date
        ? false
        : new Date(event.end_date) < new Date();


    if (isLoading) return <LoaderComp />;

    if (isError || !event) {
        return (
            <div className="text-center text-red-500 mt-10">
                Failed to load event
            </div>
        );
    }

    return (

        <div className="min-h-screen  pt-20">


            {/* HERO - Mobile optimized */}
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <div className="rounded-xl overflow-hidden border border-white/10 mb-8">
                    <img
                        src={event.image as string}
                        alt={event.event_name}
                        className="w-full aspect-[16/9] sm:aspect-[2/1] lg:aspect-[21/9] object-cover object-center"
                    />
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-4 lg:space-y-6">

                        <Card className="p-5 sm:p-8">
                            <Badge className="mb-3" variant="primary">
                                {event.categ.toUpperCase()}
                            </Badge>

                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                                {event.event_name}
                            </h1>

                            {event.description && (
                                <p className="text-gray-300 text-sm sm:text-base">
                                    {event.description}
                                </p>
                            )}
                        </Card>

                        <Card className="p-5 sm:p-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                                Event Details
                            </h2>

                            <div className="space-y-4 sm:space-y-6">
                                <DetailItem
                                    icon={<Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />}
                                    label="Date & Time"
                                    value={`${event.start_date} - ${event.end_date}`}
                                    subValue={`${event.start_time} - ${event.end_time}`}
                                />
                                <DetailItem
                                    icon={<MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />}
                                    label="Addrress"
                                    value={`${event.address || "N/A"} ( ${event.city || "N/A"} )`}
                                    extra={
                                        event.venue_link && (
                                            <a href={event.venue_link} target="_blank"
                                                className="text-purple-500 text-sm hover:underline">
                                                View on map
                                            </a>
                                        )
                                    }
                                />
                                <DetailItem
                                    icon={<User className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />}
                                    label="Organizer"
                                    value={event.comp_name}
                                    extra={
                                        <Link to={`/organizer/${event.user?._id}`}
                                            className="text-purple-500 text-sm hover:underline">
                                            View profile
                                        </Link>
                                    }
                                />
                            </div>
                        </Card>
                    </div>

                    {/* RIGHT - not sticky on mobile */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-24">

                            <Card className="p-5 sm:p-6">
                                <div className="text-center mb-5 sm:mb-6">
                                    <div className="text-sm text-gray-400">Starting from</div>
                                    <div className="text-4xl sm:text-5xl font-bold text-white">
                                        Rs. {minPrice?.toLocaleString() ?? 0}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        Remaining Capacity: {totalCapacity}
                                    </div>
                                </div>

                                {/* PRICES */}
                                <div className="space-y-2 sm:space-y-3 mb-5 sm:mb-6">
                                    {prices.map((price, idx) => (
                                        <div key={idx}
                                            className="flex justify-between p-3 sm:p-4 rounded-xl border border-white/10 bg-white/5">
                                            <div>
                                                <div className="text-white font-semibold text-sm sm:text-base">
                                                    {price.type}
                                                </div>
                                                <div className="text-xs sm:text-sm text-gray-400">
                                                    Rs. {price.amount}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-gray-400">Available</div>
                                                <div className={price.capacity < 20 ? "text-red-400" : "text-green-400"}>
                                                    {price.capacity}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    fullWidth
                                    size="lg"
                                    disabled={isExpired}
                                    icon={<Ticket className="w-5 h-5" />}
                                    onClick={() => navigate(ROUTES_PATHS.TICKET.BOOKING(event._id!))}
                                >
                                    {isExpired ? "Event Ended" : "Book Now"}
                                </Button>

                                <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t space-y-2 sm:space-y-3 text-sm text-gray-400">
                                    <Feature text="Instant confirmation" />
                                    <Feature text="Mobile ticket available" />
                                    <Feature text="Free cancellation" />
                                </div>
                            </Card>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default EventDetailPage;