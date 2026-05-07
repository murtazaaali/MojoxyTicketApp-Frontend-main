import { useState } from 'react';
import { Calendar, Grid, List } from 'lucide-react';
import type { Event, RefUser } from '../../../types';
import { EventCard } from '../../pages/events';

type FilterStatus = 'all' | 'upcoming' | 'past';
type ViewMode = 'grid' | 'list';

interface OrgEventSectionProps {
    user: RefUser;
    events: Event[];
    filterStatus: FilterStatus;
    setFilterStatus: React.Dispatch<React.SetStateAction<FilterStatus>>;
}

const FILTER_OPTIONS: { label: string; value: FilterStatus }[] = [
    { label: 'All', value: 'all' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Past', value: 'past' },
];

const EMPTY_MESSAGES: Record<FilterStatus, string> = {
    all: 'This organizer has not created any events yet',
    upcoming: 'No upcoming events at the moment',
    past: 'No past events to show',
};

const OrgEventSection = ({ user, events, filterStatus, setFilterStatus }: OrgEventSectionProps) => {
    const [viewMode, setViewMode] = useState<ViewMode>('grid');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Events</h2>
                    <p className="text-gray-400">Browse all events organized by {user?.name}</p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Filter Buttons */}
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-1">
                        {FILTER_OPTIONS.map(({ label, value }) => (
                            <button
                                key={value}
                                onClick={() => setFilterStatus(value)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filterStatus === value ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
                        {([['grid', Grid], ['list', List]] as const).map(([mode, Icon]) => (
                            <button
                                key={mode}
                                onClick={() => setViewMode(mode)}
                                className={`p-2 rounded-md transition-all ${viewMode === mode ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            {events.length === 0 ? (
                <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-4">
                        <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
                    <p className="text-gray-400">{EMPTY_MESSAGES[filterStatus]}</p>
                </div>
            ) : (
                <div className={viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'flex flex-col gap-4'
                }>
                    {events.map(event => <EventCard key={event._id} event={event} />)}
                </div>
            )}
        </div>
    );
};

export default OrgEventSection;