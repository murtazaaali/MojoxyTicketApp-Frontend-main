import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon } from "lucide-react";
import { ROUTES_PATHS } from "../../../routes/routes_path";
import type { Ticket } from "../../../types"
import useTicketsStore from "../../../store/ticket";
import { Button } from "../../../components/ui";
import DataTable from "../../../components/shared/table/DataTable";
import { DownloadTicket } from "../../../components/shared";

const BookingList = () => {
    const navigate = useNavigate();

    const {
        tickets,
        fetchTickets,
        deleteTicket,
        isFetched,
    } = useTicketsStore();


    const handleDelete = (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this ticket?");
        if (!confirm) return;
        deleteTicket(id);
    }

    return (
        <DataTable<Ticket>
            title="Tickets List"
            description="Manage and view all registered tickets"
            buttonTitle="Create New Ticket"
            addPath={ROUTES_PATHS?.DASHBOARD?.TICKET?.FORM("")}
            data={tickets}
            isFetched={isFetched}
            fetchData={fetchTickets}
            columns={[
                {
                    title: "Event",
                    render: (ticket) => (
                        <div className="flex flex-col items-center">
                            <span className="font-medium text-gray-800 dark:text-white/90">
                                {ticket?.event?.event_name || "-"}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {ticket?.event?.code || "-"}
                            </span>
                        </div>
                    ),
                },
                {
                    title: "User",
                    render: (ticket) => (
                        <div className="flex flex-col items-center">
                            <span className="font-medium text-gray-800 dark:text-white/90">
                                {ticket?.user?.name || "-"}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {ticket?.user?.email || "-"}
                            </span>
                        </div>
                    ),
                },
                {
                    title: "Total Amount",
                    render: (ticket) => `Rs. ${ticket?.total_amount || "0.00"}`,
                },
                {
                    title: "Payment Status",
                    render: (ticket) => ticket?.payment_status?.toUpperCase() || "PAYMENT STATUS",
                },
                {
                    title: "Status",
                    render: (ticket) => ticket?.status?.toUpperCase() || "STATUS",
                },
                {
                    title: "Actions",
                    render: (ticket) => (
                        <div className="flex justify-center gap-2">
                            <DownloadTicket
                                ticket={ticket}
                            />
                            <Button size="sm" variant="ghost" onClick={() => navigate(ROUTES_PATHS?.DASHBOARD?.TICKET?.FORM(ticket?._id))}>
                                <PencilIcon className="h-4 w-4" />
                                Edit
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(String(ticket?._id))}
                            >
                                <TrashIcon className="h-4 w-4" />
                                Delete
                            </Button>
                        </div>
                    ),
                },
            ]}
        />
    );
};

export default BookingList;
