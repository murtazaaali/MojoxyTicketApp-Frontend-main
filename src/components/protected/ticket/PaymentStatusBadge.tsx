const PaymentStatusBadge = ({ status }: { status: string }) => {
    const config = {
        completed: {
            color: "bg-green-500/20 text-green-400 border-green-500/30",
            label: "Paid",
        },
        pending: {
            color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
            label: "Pending",
        },
        failed: {
            color: "bg-red-500/20 text-red-400 border-red-500/30",
            label: "Failed",
        },
    };

    const style = config[status as keyof typeof config] || config.pending;

    return (
        <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${style.color}`}
        >
            {style.label}
        </span>
    );
};

export default PaymentStatusBadge;