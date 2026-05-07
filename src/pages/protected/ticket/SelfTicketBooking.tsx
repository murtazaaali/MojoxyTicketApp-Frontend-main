import { useEffect, useState } from "react";
import { CheckCircle2, CreditCard, TicketIcon } from "lucide-react";
import type { Ticket } from "../../../types";
import useTicketsStore from "../../../store/ticket";
import TopHeader from "../../../components/shared/table/TopHeader";
import Loader from "../../../components/shared/LoadingComp";
import { EmptyState, SelfTicketCard } from "../../../components/protected/ticket";

const SelfTicketBooking = () => {
    const { fetchSelfTickets } = useTicketsStore();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        const loadTickets = async () => {
            try {
                setIsLoading(true);
                const data = await fetchSelfTickets();
                setTickets(data ?? []);
            } catch (error) {
                console.error("Failed to load tickets:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadTickets();
    }, [fetchSelfTickets]);

    return (
        <div className="text-white">
            <TopHeader
                title="My Bookings"
                description="Manage and view all your bookings"
                buttonTitle="Create New Booking"
                showButton={false}
            />
            {
                (!isLoading && tickets.length > 0) && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white/3 border border-white/10 rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                    <TicketIcon className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Total Bookings</p>
                                    <p className="text-white text-2xl font-bold">{tickets.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/3 border border-white/10 rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Active Tickets</p>
                                    <p className="text-white text-2xl font-bold">
                                        {tickets.filter((t) => t.status === "booked").length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/3 border border-white/10 rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Total Spent</p>
                                    <p className="text-white text-2xl font-bold">
                                        {
                                            tickets.reduce((sum, t) => sum + t.total_amount, 0)
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            <div className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        <Loader />
                    ) : tickets.length === 0 ? (
                        <EmptyState />
                    ) : (
                        tickets.map((ticket) => (
                            <SelfTicketCard key={ticket._id} ticket={ticket} />
                        ))
                    )}
                </div>
            </div>


        </div>
    )
}

export default SelfTicketBooking
