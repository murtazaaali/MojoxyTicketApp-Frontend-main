import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ROUTES_PATHS } from "../../../routes/routes_path";
import type { Event, EventFormData } from "../../../types";

import useEventsStore from "../../../store/event";
import UserEventForm from "../../../form/UserEventForm";
import Loader from "../../../components/shared/LoadingComp";


const UserUpdateEvent = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();

    const { updateEvent, fetchEventById } = useEventsStore();

    const [defaultValues, setDefaultValues] =
        useState<EventFormData | null>(null);


    useEffect(() => {
        const loadEvent = async () => {

            if (!id) {
                navigate(ROUTES_PATHS.DASHBOARD.EVENTS.SELF);
                return;
            }

            const fetchedEvent = await fetchEventById(id);

            if (!fetchedEvent || fetchedEvent.approved) {
                navigate(ROUTES_PATHS.DASHBOARD.EVENTS.SELF);
                return;
            }

            // Convert API → Form Data
            const formData: EventFormData = {
                user: fetchedEvent.user?._id || null,

                event_name: fetchedEvent.event_name,
                comp_name: fetchedEvent.comp_name,

                start_date: fetchedEvent.start_date,
                end_date: fetchedEvent.end_date,
                start_time: fetchedEvent.start_time,
                end_time: fetchedEvent.end_time,

                event_type: fetchedEvent.event_type,

                city: fetchedEvent.city,
                address: fetchedEvent.address,
                venue_link: fetchedEvent.venue_link,

                categ: fetchedEvent.categ,
                description: fetchedEvent.description,

                image: fetchedEvent.image,
                overview_image: fetchedEvent.overview_image,

                prices: fetchedEvent.prices.map((p) => ({
                    type: p.type,
                    amount: p.amount,
                    capacity: p.capacity,
                })),

                approved: fetchedEvent.approved,
                status: fetchedEvent.status,
                is_featured: fetchedEvent.is_featured,

                platform_fees_type: fetchedEvent.platform_fees_type,
                platform_fees_value: fetchedEvent.platform_fees_value,
            };

            setDefaultValues(formData);
        };

        loadEvent();

    }, [id, fetchEventById, navigate]);


    const onSubmit = (data: EventFormData) => {
        if (!id) return;

        updateEvent(id, data as unknown as Event);
    };


    // Loading state
    if (!defaultValues) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <Loader />
            </div>
        );
    }


    return (
        <UserEventForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            title="Update Your Event"
            description="Update your event details and information."
            submitText="Update Event"
        />
    );
};

export default UserUpdateEvent;
