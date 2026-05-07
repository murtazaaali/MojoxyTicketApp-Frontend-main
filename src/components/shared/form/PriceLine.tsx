const PriceLine = ({
    label,
    value,
    muted,
}: {
    label: string;
    value: string | number;
    muted?: boolean;
}) => (
    <div className="flex items-center justify-between">
        <span className={muted ? "text-gray-400" : "text-gray-400"}>{label}</span>
        <span className="text-white tabular-nums">{value}</span>
    </div>
);

export default PriceLine;