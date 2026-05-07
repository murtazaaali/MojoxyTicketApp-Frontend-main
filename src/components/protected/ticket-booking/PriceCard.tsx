
import { Minus, Plus } from 'lucide-react';
import type { EventPrice } from '../../../types/event';

const PriceCard = ({
    price,
    count,
    onInc,
    onDec,
}: {
    price: EventPrice;
    count: number;
    onInc: () => void;
    onDec: () => void;
}) => {
    const isVip = price.type.toLowerCase() === "vip";
    return (
        <div
            className={`relative rounded-xl border p-4 transition-all duration-300 ${count > 0
                ? isVip
                    ? "border-amber-500/40 bg-amber-500/6 shadow-md shadow-amber-500/10"
                    : "border-emerald-500/40 bg-emerald-500/6 shadow-md shadow-emerald-500/10"
                : "border-white/10 bg-white/3 hover:border-white/20"
                }`}
        >
            {isVip && (
                <span className="absolute -top-2.5 left-4 bg-amber-500 text-gray-950 text-xs font-bold px-2.5 py-0.5 rounded-full shadow-md">
                    ★ Premium
                </span>
            )}
            <div className="flex items-start justify-between">
                <div>
                    <h4 className="text-white font-semibold text-base">{price.type}</h4>
                    <p className="text-gray-500 text-xs mt-0.5">
                        {price.capacity} seats available
                    </p>
                </div>
                <span
                    className={`text-lg font-bold ${isVip ? "text-amber-400" : "text-emerald-400"
                        }`}
                >
                    {price.amount}
                </span>
            </div>
            <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-gray-500">per ticket</span>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onDec}
                        disabled={count === 0}
                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    >
                        <Minus className="w-3.5 h-3.5 text-white" />
                    </button>
                    <span className="text-white font-bold w-5 text-center tabular-nums">
                        {count}
                    </span>
                    <button
                        type="button"
                        onClick={onInc}
                        className="w-8 h-8 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 flex items-center justify-center transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PriceCard
