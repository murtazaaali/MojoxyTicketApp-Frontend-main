import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import type { RefUser } from '../../../types';
import useUsersStore from '../../../store/user';
import useEventsStore from '../../../store/event';
import { OrgEventSection, OrgHeroSection, OrgNotFound, OrgStatCard } from '../../../components/public/organization';

type FilterStatus = 'all' | 'upcoming' | 'past';

const OrganizerProfile = () => {
    const { user_id } = useParams<{ user_id?: string }>();
    const [user, setUser] = useState<RefUser | null>(null);
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

    const { fetchUserById } = useUsersStore();
    const { fetchEvents, events } = useEventsStore();

    useEffect(() => {
        if (!user_id) return;
        fetchUserById(user_id).then(fetched => fetched && setUser(fetched));
    }, [user_id, fetchUserById]);

    useEffect(() => {
        if (!user_id) return;
        fetchEvents('', '', filterStatus === 'all' ? '' : filterStatus, false, false, user_id);
    }, [user_id, filterStatus, fetchEvents]);

    const stats = useMemo(() => {
        const now = new Date();
        return {
            totalEvents: events.length,
            upcomingEvents: events.filter(e => new Date(e.end_date) >= now).length,
            pastEvents: events.filter(e => new Date(e.end_date) < now).length,
            totalAttendees: events.reduce(
                (acc, e) => acc + e.prices.reduce((sum, p) => sum + (p.capacity || 0), 0), 0
            ),
        };
    }, [events]);

    if (!user_id) return <OrgNotFound />;

    return (
        <div className="min-h-screen relative pt-20 overflow-hidden max-w-7xl mx-auto px-6 xl:px-12 text-white">
            <OrgHeroSection user={user as RefUser} />
            <OrgStatCard stats={stats} />
            <OrgEventSection
                user={user as RefUser}
                events={events}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
            />
        </div>
    );
};

export default OrganizerProfile;