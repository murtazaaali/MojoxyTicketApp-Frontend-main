interface InputProps {
    label?: string;
    type?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    error?: string;
    value?: string;
    autoComplete?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    name?: string;

}

const Input = ({
    label, type = 'text', placeholder, icon, error,
    value, autoComplete = "", onChange, className = '', name = ''
}: InputProps) => {

    const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
        if (type === 'number') {
            e.currentTarget.blur();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);

        // Auto-blur to close the date/time picker after selection
        if (type === 'date' || type === 'time' || type === 'datetime-local') {
            e.currentTarget.blur();
        }
    };

    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-300">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-gray-400 [&>svg]:text-gray-400 [&>svg]:stroke-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onWheel={handleWheel}
                    autoComplete={autoComplete}
                    className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 ${icon ? 'pl-12' : ''
                        } text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all ${className}`}
                />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
    );
};

export default Input;