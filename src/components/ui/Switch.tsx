interface SwitchProps {
    label?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

const Switch = ({ label, checked, onChange, disabled }: SwitchProps) => {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <span className="text-sm font-medium text-gray-300">
                    {label}
                </span>
            )}

            <button
                type="button"
                disabled={disabled}
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all
          ${checked ? "bg-purple-500" : "bg-white/10"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
            >
                <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-all
            ${checked ? "translate-x-5" : "translate-x-1"}
          `}
                />
            </button>
        </div>
    );
};

export default Switch;
