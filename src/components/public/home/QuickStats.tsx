const STATS = [
    { label: 'Active Events', value: '10K+' },
    { label: 'Happy Attendees', value: '1M+' },
    { label: 'Cities', value: '500+' },
];

const QuickStats = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* quick stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {STATS.map(({ label, value }) => (
                <div key={label} className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">{value}</div>
                    <div className="text-sm text-gray-400">{label}</div>
                </div>
            ))}
        </div>
    </div>
);

export default QuickStats;