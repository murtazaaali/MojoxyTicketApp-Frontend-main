import { ChevronRight } from "lucide-react";

interface SelectProps {
    label?: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    icon?: React.ReactNode;
    className?: string;
}

const Select = ({ label, options, value, onChange, icon, className = '' }: SelectProps) => {
    return (
        <div className="space-y-2">
            {label && <label className="block text-sm font-medium text-gray-300">{label}</label>}
            <div className="relative">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                        {icon}
                    </div>
                )}
                <select
                    value={value}
                    onChange={onChange}
                    className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 ${icon ? 'pl-12' : ''} text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none cursor-pointer ${className}`}
                >
                    {options.map((option, idx) => (
                        <option key={idx} value={option.value} className="bg-zinc-900">
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
        </div>
    );
};


export default Select;