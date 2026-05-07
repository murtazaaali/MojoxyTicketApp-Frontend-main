import { CheckCircle2 } from "lucide-react";

interface StepIndicatorProps {
    step: 1 | 2;
}

const STEPS = [
    { n: 1, label: "Details" },
    { n: 2, label: "Payment" },
] as const;

const StepIndicator = ({ step }: StepIndicatorProps) => (
    <div className="flex items-center justify-center mb-8">
        {STEPS.map(({ n }, i) => (
            <div key={n} className="flex items-center">
                <div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-500 ${step >= n
                            ? "bg-purple-500 border-purple-500 text-white shadow-lg shadow-purple-500/30"
                            : "bg-white/5 border-white/20 text-gray-500"
                        }`}
                >
                    {step > n ? <CheckCircle2 className="w-5 h-5" /> : n}
                </div>

                {i < STEPS.length - 1 && (
                    <div
                        className={`w-24 h-0.5 transition-all duration-500 ${step >= 2 ? "bg-purple-500" : "bg-white/10"
                            }`}
                    />
                )}
            </div>
        ))}
    </div>
);

export default StepIndicator;