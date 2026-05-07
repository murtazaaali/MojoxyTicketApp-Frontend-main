import { Check } from "lucide-react";

interface RadioOption {
    value: string;
    label: string;
    description?: string;
}

interface RadioGroupProps {
    label?: string;
    options: RadioOption[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

const RadioGroup = ({
    label,
    options,
    value,
    onChange,
    className = "",
}: RadioGroupProps) => {
    return (
        <div className={`space-y-3 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-300">
                    {label}
                </label>
            )}

            <div className="flex gap-3 flex-wrap">
                {options.map((option) => {
                    const checked = value === option.value;

                    return (
                        <label
                            key={option.value}
                            className={`flex items-center gap-4 cursor-pointer rounded-xl border px-4 py-3 transition-all
                                ${checked
                                    ? "border-purple-500 bg-purple-500/10"
                                    : "border-white/10 bg-white/5 hover:bg-white/10"
                                }
                            `}
                        >
                            {/* Hidden radio */}
                            <input
                                type="radio"
                                value={option.value}
                                checked={checked}
                                onChange={() => onChange(option.value)}
                                className="hidden"
                            />

                            {/* Custom radio */}
                            <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center
                                    ${checked
                                        ? "border-purple-500"
                                        : "border-gray-400"
                                    }
                                `}
                            >
                                {checked && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                                )}
                            </div>

                            {/* Text */}
                            <div className="flex-1">
                                <p className="text-white text-sm">
                                    {option.label}
                                </p>
                                {option.description && (
                                    <p className="text-xs text-gray-400">
                                        {option.description}
                                    </p>
                                )}
                            </div>

                            {checked && (
                                <Check className="w-4 h-4 text-purple-400" />
                            )}
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default RadioGroup;
