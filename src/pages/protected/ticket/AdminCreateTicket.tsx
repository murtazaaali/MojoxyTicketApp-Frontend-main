import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Ticket, TicketFormData } from "../../../types";
import useUsersStore from "../../../store/user";
import useEventsStore from "../../../store/event";
import useTicketsStore from "../../../store/ticket";
import TopHeader from "../../../components/shared/form/TopHeader";
import TicketForm from "../../../form/TicketForm";

const AdminCreateTicket = () => {
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const { addTicket, updateTicket, fetchTicketById } = useTicketsStore();
    const { users } = useUsersStore();
    const { events } = useEventsStore();
    const { ticket_id } = useParams<{ ticket_id?: string }>();

    useEffect(() => {
        const loadTicket = async () => {
            if (!ticket_id) {
                setTicket(null);
                return;
            }

            const fetchedTicket = await fetchTicketById(ticket_id);
            if (fetchedTicket) {
                setTicket(fetchedTicket);
            }
        };

        loadTicket();
    }, [ticket_id, fetchTicketById]);

    const handleSubmit = async (data: TicketFormData, grandTotal: number) => {
        const fullUser = users.find((e) => String(e._id) === String(data.user));

        const transformedData: Omit<Ticket, "_id"> = {
            ...data,
            user: fullUser
                ? {
                    _id: String(fullUser._id),
                    name: fullUser.name,
                    email: fullUser.email,
                    isActive: fullUser.isActive,
                }
                : null,
            event: events.find((e) => String(e._id) === String(data.event)) || null,
            total_amount: grandTotal,
        };

        if (ticket && ticket._id) {
            // Update existing ticket
            await updateTicket(ticket._id, { ...transformedData });
        } else {
            // Create new ticket
            await addTicket({ ...transformedData });
        }
    };

    return (
        <div className="text-white">
            <TopHeader
                title={(ticket ? "Edit" : "Add") + " Ticket"}
                description={
                    ticket
                        ? "Update ticket details to keep your ticket up-to-date."
                        : "Fill the form to add a new ticket."
                }
            />
            <TicketForm
                ticket={ticket}
                onSubmit={handleSubmit}
                isAdminTicket={true}
                isEditMode={!!ticket}
            />
        </div>
    );
};

export default AdminCreateTicket;