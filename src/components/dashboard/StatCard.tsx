interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    color: string;
}

const StatCard = ({ icon, label, value, color }: StatCardProps) => (
    <div className="bg-linear-to-b from-black to-zinc-900 text-white rounded-2xl 
    shadow-sm  overflow-hidden  hover:shadow-md 
    transition-shadow ">
        <div className={`bg-linear-to-br ${color} p-4`}>
            <div className="">{icon}</div>
        </div>
        <div className="p-5">
            <p className="text-sm font-medium text-gray-200 mb-1">{label}</p>
            <p className="text-3xl font-bold text-gray-400  mb-2">{value}</p>
        </div>
    </div>
);

export default StatCard