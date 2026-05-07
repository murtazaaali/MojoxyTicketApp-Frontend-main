import { TicketIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES_PATHS } from "../../../routes/routes_path";

const EmptyState = () => {
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <TicketIcon className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">No Bookings Yet</h3>
            <p className="text-gray-500 text-sm text-center max-w-md mb-6">
                You haven't made any event bookings yet. Browse our events and book your
                tickets to get started!
            </p>
            <Link to={ROUTES_PATHS?.PUBLIC?.EVENTS_LIST} className="bg-purple-900 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
                Browse Events
            </Link>
        </div>
    );
};

export default EmptyState;