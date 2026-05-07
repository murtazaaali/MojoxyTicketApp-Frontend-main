import { ChevronLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface SidebarHeaderProps {
    collapsed: boolean;
    onToggle: () => void;
    profile?: { role?: string | null };
}

const SidebarHeader = React.memo(({
    collapsed,
    onToggle,
    profile,
}: SidebarHeaderProps) => {

    const roleLabel = profile?.role ? profile.role.toUpperCase() : "GUEST";

    return (

        <div className="p-4 flex items-center justify-between  h-20">
            {!collapsed && (
                <Link to={'/dashboard'} className="flex items-center gap-2">
                    <div className="">
                        <img
                            src="/images/icon.png"
                            alt="Logo"
                            className="w-9 h-9 object-contain"
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <h2 className="font-bold text-sm leading-tight">
                            {roleLabel} PANEL
                        </h2>
                        <p className="text-xs text-gray-400">v2.0.1</p>
                    </div>
                </Link>
            )}

            <button
                onClick={onToggle}
                className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >

                <ChevronLeft className={`w-6 h-6 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />

            </button>
        </div>
    );
});

export default SidebarHeader;
