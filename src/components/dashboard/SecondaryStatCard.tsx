import React from "react";

interface SecondaryStatCardProps {
    icon: React.ElementType;
    label: string;
    value: string | number;
    color?: string;
}

const SecondaryStatCard = ({
    icon: Icon,
    label,
    value,
    color = "text-gray-400 bg-zinc-900 border-zinc-700",
}: SecondaryStatCardProps) => {
    return (
        <div
            className={`
        ${color}
        bg-linear-to-b from-black to-zinc-900
        border
        text-white
        rounded-2xl
        p-5
        shadow-sm
        overflow-hidden
        hover:shadow-md
        transition-shadow
      `}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-200">{label}</p>
                    <p className="text-3xl font-bold text-gray-400 mt-1">{value}</p>
                </div>

                {/* Icon */}
                <Icon className="w-10 h-10 opacity-80" />
            </div>
        </div>
    );
};

export default SecondaryStatCard;
