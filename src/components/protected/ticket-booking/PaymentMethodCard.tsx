import { CheckCircle2 } from "lucide-react";
import { PAYMENT_METHODS } from "../../../utilities/const";

interface PaymentMethodCardProps {
    selected: string;
    onSelect: (method: string) => void;
}

const PaymentMethodCard = ({ selected, onSelect }: PaymentMethodCardProps) => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PAYMENT_METHODS.map((m) => {
            const isSelected = selected === m.value;
            return (
                <button
                    key={m.value}
                    type="button"
                    onClick={() => onSelect(m.value)}
                    className={`relative rounded-xl border p-3 text-left transition-all duration-200 ${isSelected
                            ? "border-emerald-500/50 bg-emerald-500/8 shadow-md shadow-emerald-500/10"
                            : "border-white/10 bg-white/3 hover:border-white/20"
                        }`}
                >
                    {isSelected && (
                        <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-emerald-400" />
                    )}
                    <span className="text-xl block mb-1">{m.icon}</span>
                    <span className="text-white text-xs font-semibold">{m.label}</span>
                </button>
            );
        })}
    </div>
);

export default PaymentMethodCard;