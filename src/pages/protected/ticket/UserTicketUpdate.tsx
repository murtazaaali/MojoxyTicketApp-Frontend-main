import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES_PATHS } from "../../../routes/routes_path";
import type { Ticket, TicketFormData } from "../../../types";
import useTicketsStore from "../../../store/ticket";
import TopHeader from "../../../components/shared/form/TopHeader";
import TicketForm from "../../../form/TicketForm";

const UserTicketUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const { updateTicket, fetchTicketById } = useTicketsStore();

    useEffect(() => {
        const loadTicket = async () => {
            if (!id) {
                navigate(ROUTES_PATHS.DASHBOARD.TICKET.SELF);
                return;
            }

            const fetchedTicket = await fetchTicketById(id);
            if (fetchedTicket) {
                setTicket(fetchedTicket);
            }
        };

        loadTicket();
    }, [id, fetchTicketById, navigate]);

    const handleSubmit = (data: TicketFormData, grandTotal: number) => {
        if (!id) return;
        updateTicket(id, { ...data, total_amount: grandTotal } as unknown as Ticket);
    };

    return (
        <div className="min-h-screen relative pt-20 overflow-hidden max-w-7xl mx-auto px-6 xl:px-12 text-white">
            <TopHeader
                title="Update Ticket"
                description="Update ticket details to keep your ticket up-to-date."
            />
            <TicketForm
                ticket={ticket}
                onSubmit={handleSubmit}
                isAdminTicket={false}
                isEditMode={true}
            />
        </div>
    );
};

export default UserTicketUpdate;