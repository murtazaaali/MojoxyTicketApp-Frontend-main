import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

interface PassFieldProps {
    label?: string;
    placeholder?: string;
    error?: string;
    value?: string;
    autoComplete?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    name?: string;
}

const PasswordField = ({ label, placeholder, error, value, autoComplete = "", onChange, className = '', name = '' }: PassFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="space-y-2">
            {label && <label className="block text-sm font-medium text-gray-300">{label}</label>}
            <div className="relative">

                <input
                    name={name}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    autoComplete={autoComplete}
                    onChange={onChange}
                    className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all ${className}`}
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                        <EyeIcon className="w-4 h-4" />
                    ) : (
                        <EyeClosedIcon className="w-4 h-4" />
                    )}
                </div>
                {/* 
                </span> */}
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
    )
}

export default PasswordField
