import { useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import useEventsStore from "../../store/event";
import { useDebounce } from "../../hooks";
import Filters from "../../components/public/events-list/Filters";
import { EventCard } from "../../components/pages/events";
import { PageHeader } from "../../components/shared";


const EventsListPage = () => {
    const { events, fetchEvents } = useEventsStore();
    const [searchParams, setSearchParams] = useSearchParams();

    const category = searchParams.get("category") ?? "";
    const search = searchParams.get("search") ?? "";
    const date = searchParams.get("date") ?? "all";

    const debouncedSearch = useDebounce(search);

    // 🔹 Fetch events only when needed
    useEffect(() => {
        fetchEvents(debouncedSearch, category, date);
    }, [debouncedSearch, category, date, fetchEvents]);

    // 🔹 Update URL without removing other params
    const updateParams = useCallback((key: string, value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        setSearchParams(params);
    }, [searchParams, setSearchParams]);

    // 🔹 Handlers
    const handleSearchChange = (value: string) => {
        updateParams("search", value);
    };

    const handleCategoryChange = (value: string) => {
        updateParams("category", value);
    };

    const handleDateChange = (value: string) => {
        updateParams("date", value);
    };

    const handleClearFilters = () => {
        setSearchParams({});
    };



    return (
        <div className="min-h-screen pt-20 max-w-7xl mx-auto px-6 text-white">
            <PageHeader
                title="Discover Events"
                description="Find the perfect event for you"
            />

            <Filters
                search={search}
                category={category}
                date={date}
                onSearchChange={handleSearchChange}
                onCategoryChange={handleCategoryChange}
                onDateChange={handleDateChange}
                onClear={handleClearFilters}
            />

            <div className="mb-6 flex justify-between">
                <p className="text-gray-400">
                    Showing{" "}
                    <span className="text-white font-semibold">
                        {events.length}
                    </span>{" "}
                    events
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default EventsListPage;