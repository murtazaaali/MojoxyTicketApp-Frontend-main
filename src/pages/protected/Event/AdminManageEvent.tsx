import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Event, EventFormData } from "../../../types";
import AdminEventForm from "../../../form/AdminEventForm";
import useEventsStore from "../../../store/event";
import useUsersStore from "../../../store/user";
import usePlatformPricingStore from "../../../store/platform_pricing";
import { LoaderComp } from "../../../components/shared";


const DEFAULT_VALUES: EventFormData = {
    user: "",
    event_name: "",
    comp_name: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    event_type: "",
    prices: [{ type: "Standard", amount: 1, capacity: 1 }],
    city: "",
    address: "",
    venue_link: "",
    categ: "",
    description: "",
    image: "" as unknown as File | "",
    overview_image: "" as unknown as File | "",
    approved: false,
    is_featured: false,
    status: "upcoming",
    platform_fees_type: "flat",
    platform_fees_value: 0,
};


const AdminManageEvent = () => {
    const [isUserSearching, setIsUserSearching] = useState(false);

    const { event_id } = useParams<{ event_id?: string }>();
    const { addEvent, updateEvent, fetchEventById } = useEventsStore();
    const { users, fetchUsers } = useUsersStore();
    const { platform_pricing: platformPricings, fetchPlatformPricing, isFetched } = usePlatformPricingStore();


    useQuery({
        queryKey: ["admin-manage-event-init"],
        queryFn: async () => {
            await fetchUsers();
            if (!isFetched) await fetchPlatformPricing();
            return null;
        },
        staleTime: Infinity,
    });

    const { data: fetchedEvent, isLoading: isEventLoading } = useQuery({
        queryKey: ["event", event_id],
        queryFn: () => fetchEventById(event_id!),
        enabled: !!event_id,
        staleTime: 30_000,
    });


    const isEditMode = !!event_id;

    const defaultValues: EventFormData = useMemo(() => {
        if (!fetchedEvent) return DEFAULT_VALUES;
        return {
            ...fetchedEvent,
            user: fetchedEvent.user?._id ?? "",
            prices: fetchedEvent.prices.map(({ type, amount, capacity }) => ({ type, amount, capacity })),
        };
    }, [fetchedEvent]);

    const userOptions = useMemo(
        () => users.map((u) => ({ value: String(u._id), label: u.name, sublabel: u.email, badge: u.role })),
        [users]
    );

    const platformFeeOptions = useMemo(
        () => platformPricings.map((p) => ({ value: String(p.commission_type), label: p.commission_type })),
        [platformPricings]
    );


    const handleUserSearch = useCallback(async (query: string) => {
        setIsUserSearching(true);
        await fetchUsers(query);
        setIsUserSearching(false);
    }, [fetchUsers]);

    const onSubmit = useCallback((data: EventFormData) => {
        const fullUser = users.find((u) => String(u._id) === String(data.user));
        const transformedData: Omit<Event, "_id"> = {
            ...data,
            user: fullUser
                ? { _id: String(fullUser._id), name: fullUser.name, email: fullUser.email, isActive: fullUser.isActive }
                : null,
        };

        if (event_id) updateEvent(event_id, transformedData);
        else addEvent(transformedData);
    }, [users, event_id, addEvent, updateEvent]);


    if (isEditMode && isEventLoading) {
        return (
            <div className="flex h-64 items-center justify-center text-white/50">
                <LoaderComp />
            </div>
        );
    }


    return (
        <AdminEventForm
            key={event_id ?? "new"}
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            title={`${isEditMode ? "Edit" : "Add"} Event`}
            description={isEditMode ? "Update event details to keep your event up-to-date." : "Fill the form to add a new event."}
            submitText={`${isEditMode ? "Update" : "Save"} Event`}
            userOptions={userOptions}
            platformFeeOptions={platformFeeOptions}
            isUserSearching={isUserSearching}
            onUserSearch={handleUserSearch}
        />
    );
};

export default AdminManageEvent;