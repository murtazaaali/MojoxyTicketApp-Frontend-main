import { useEffect } from "react";
import useEventsStore from "../../store/event";
import { EVENT_CATEGORIES } from "../../utilities/const";
import { FilterUpcomingEvents } from "../../utilities/functions";
import { toastError } from "../../utilities/toast_message";

import { Slider, SearchBar, QuickStats, Categories, FeaturedEvents, CTASection } from "../../components/public/home";

const HomePage = () => {
    const { fetchEvents, events } = useEventsStore();

    useEffect(() => {
        fetchEvents("", "", "", true).catch((err) => {
            toastError("Failed to fetch events");
            console.error("Failed to fetch events:", err);
        });
    }, [fetchEvents]);

    const featuredEvents = FilterUpcomingEvents(events).slice(0, 6);

    return (
        <div className="min-h-screen">
            <section className="relative pt-20 overflow-hidden">
                <Slider heroSlides={featuredEvents} />
                <SearchBar />
                <QuickStats />
            </section>
            <Categories categories={EVENT_CATEGORIES} />
            <FeaturedEvents featuredEvents={featuredEvents} />
            <CTASection />
        </div>
    );
};

export default HomePage;