import { useEffect, useState } from "react";
import type { Event as EventType } from "../../../types/event";
import useEventsStore from "../../../store/event";
import { SelfEventCard } from "../../../components/pages/events";
import TopHeader from "../../../components/shared/table/TopHeader";


const SelfEvents = () => {
    const { fetchSelfEvents } = useEventsStore();
    const [events, setEvents] = useState<EventType[]>([]);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await fetchSelfEvents();
                setEvents(data ?? []);
            } catch (error) {
                console.error("Failed to load events:", error);
            }
        };

        loadEvents();
    }, [fetchSelfEvents]);

    return (
        <div className="text-white">
            <TopHeader
                title="My Events"
                description="Manage and view all your events"
                buttonTitle="Create New Event"
                buttonLink="/user/create-event"
                showButton={false}
            />

            <div className="overflow-hidden ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* table goes here */}
                    {events.map((event, idx) => {


                        return (

                            <SelfEventCard
                                key={idx}
                                event={event}

                            />


                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SelfEvents;
