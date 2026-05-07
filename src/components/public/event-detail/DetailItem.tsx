const DetailItem = ({ icon, label, value, subValue, extra }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    subValue?: string;
    extra?: React.ReactNode;
}) => (
    <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center shrink-0">
            {icon}
        </div>

        <div>
            <div className="text-sm text-gray-400 mb-1">{label}</div>
            <div className="text-white font-semibold">{value}</div>
            {subValue && <div className="text-white font-semibold">{subValue}</div>}
            {extra}
        </div>
    </div>
);

export default DetailItem;