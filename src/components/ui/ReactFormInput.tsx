import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
    error?: string;
}

const ReactFormInput = forwardRef<HTMLInputElement, InputProps>(
    ({ label, icon, error, className = "", ...props }, ref) => {
        return (
            <div className="space-y-2">
                {label && (
                    <label className="block text-sm font-medium text-gray-300">
                        {label}
                    </label>
                )}

                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            {icon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        {...props}
                        className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 
                        ${icon ? "pl-12" : ""} text-white placeholder-gray-500 
                        focus:outline-none focus:border-purple-500 focus:ring-2 
                        focus:ring-purple-500/20 transition-all ${className}`}
                    />
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}
            </div>
        );
    }
);

export default ReactFormInput;
