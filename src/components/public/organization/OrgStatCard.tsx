import type { UserEventStats } from '../../../types';
import { Card } from '../../ui';
import { Calendar, CheckCircle, TrendingUp, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatItem {
    label: string;
    value: string | number;
    icon: LucideIcon;
    color: 'purple' | 'blue' | 'green' | 'orange';
}

const COLOR_MAP: Record<StatItem['color'], { card: string; icon: string; iconBg: string }> = {
    purple: { card: 'from-purple-500/10 to-purple-500/5 border-purple-500/20', icon: 'text-purple-400', iconBg: 'bg-purple-500/20' },
    blue: { card: 'from-blue-500/10 to-blue-500/5 border-blue-500/20', icon: 'text-blue-400', iconBg: 'bg-blue-500/20' },
    green: { card: 'from-green-500/10 to-green-500/5 border-green-500/20', icon: 'text-green-400', iconBg: 'bg-green-500/20' },
    orange: { card: 'from-orange-500/10 to-orange-500/5 border-orange-500/20', icon: 'text-orange-400', iconBg: 'bg-orange-500/20' },
};

const OrgStatCard = ({ stats }: { stats: UserEventStats }) => {
    const items: StatItem[] = [
        { label: 'Total Events', value: stats.totalEvents, icon: Calendar, color: 'purple' },
        { label: 'Upcoming', value: stats.upcomingEvents, icon: TrendingUp, color: 'blue' },
        { label: 'Completed', value: stats.pastEvents, icon: CheckCircle, color: 'green' },
        { label: 'Total Capacity', value: stats.totalAttendees.toLocaleString(), icon: Users, color: 'orange' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {items.map(({ label, value, icon: Icon, color }) => {
                    const styles = COLOR_MAP[color];
                    return (
                        <Card key={label} className={`p-6 bg-linear-to-br ${styles.card}`}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`p-2 rounded-lg ${styles.iconBg}`}>
                                    <Icon className={`w-5 h-5 ${styles.icon}`} />
                                </div>
                                <span className="text-gray-400 text-sm">{label}</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{value}</p>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default OrgStatCard;