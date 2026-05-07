import { Link } from 'react-router-dom';
import { Button } from '../../ui';
import type { Event } from '../../../types';
import { EventCard } from '../../pages/events';

interface FeaturedEventsProps {
    featuredEvents: Event[];
}

const FeaturedEvents = ({ featuredEvents }: FeaturedEventsProps) => (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Featured Events</h2>
                    <p className="text-gray-400">Don't miss these popular events</p>
                </div>
                <Link to="/events-list">
                    <Button variant="secondary">Explore All</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredEvents.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>
        </div>
    </section>
);

export default FeaturedEvents;