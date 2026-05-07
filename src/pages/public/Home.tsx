import { useEffect, useMemo } from "react";
import useEventsStore from "../../store/event";
import { EVENT_CATEGORIES } from "../../utilities/const";
import { toastError } from "../../utilities/toast_message";

import {
    Slider,
    SearchBar,
    QuickStats,
    Categories,
    FeaturedEvents,
    CTASection,
} from "../../components/public/home";

const FEATURED_EVENTS_LIMIT = 6;

const HomePage = () => {
    const { fetchEvents, events } = useEventsStore();

    useEffect(() => {
        const loadFeaturedEvents = async () => {
            try {
                await fetchEvents("", "", "upcoming", true);
            } catch (error) {
                console.error("Failed to fetch featured events:", error);
                toastError("Failed to fetch events");
            }
        };

        loadFeaturedEvents();
    }, [fetchEvents]);

    const featuredEvents = useMemo(
        () => events.slice(0, FEATURED_EVENTS_LIMIT),
        [events]
    );

    return (
        <main className="min-h-screen">
            <section className="relative overflow-hidden pt-20">
                <Slider heroSlides={featuredEvents} />

                <div className="relative z-10">
                    <SearchBar />
                    <QuickStats />
                </div>
            </section>

            <Categories categories={EVENT_CATEGORIES} />

            <FeaturedEvents featuredEvents={featuredEvents} />

            <CTASection />
        </main>
    );
};

export default HomePage;