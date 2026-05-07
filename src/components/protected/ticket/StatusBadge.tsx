import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

const StatusBadge = ({ status }: { status: string }) => {
    const config = {
        booked: {
            color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
            icon: <CheckCircle2 className="w-3 h-3" />,
            label: "Booked",
        },
        canceled: {
            color: "bg-red-500/20 text-red-400 border-red-500/30",
            icon: <XCircle className="w-3 h-3" />,
            label: "Canceled",
        },
        refunded: {
            color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
            icon: <AlertCircle className="w-3 h-3" />,
            label: "Refunded",
        },
    };

    const style = config[status as keyof typeof config] || config.booked;

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.color}`}
        >
            {style.icon}
            {style.label}
        </span>
    );
};

export default StatusBadge;