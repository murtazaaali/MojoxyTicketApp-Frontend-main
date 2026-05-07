import { useCallback } from "react";
import type { EventFormData, Event } from "../../../types";
import useEventsStore from "../../../store/event";
import UserEventForm from "../../../form/UserEventForm";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATHS } from "../../../routes/routes_path";

const DEFAULT_VALUES: EventFormData = {
    user: null,
    event_name: "",
    comp_name: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    event_type: "",
    prices: [{ type: "Standard", amount: 1, capacity: 1, }],
    address: "",
    city: "",
    venue_link: "",
    categ: "",
    description: "",
    image: "" as unknown as File | "",
    overview_image: "" as unknown as File | "",
    approved: false,
    status: "upcoming",
    platform_fees_type: "flat",
    platform_fees_value: 0,
    is_featured: false,
};

const UserCreateEvent = () => {
    const addEvent = useEventsStore((state) => state.addEvent);

    const navigate = useNavigate();

    const onSubmit = useCallback(
        async (data: EventFormData) => {
            await addEvent(data as Event);

            navigate(ROUTES_PATHS.DASHBOARD.EVENTS.SELF);
        },
        [addEvent, navigate]
    );

    return (
        <UserEventForm
            defaultValues={DEFAULT_VALUES}
            onSubmit={onSubmit}
            title="Create Event"
            description="Create and manage events with our powerful platform"
            submitText="Create Event"
        />
    );
};


export default UserCreateEvent