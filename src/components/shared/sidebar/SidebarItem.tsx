import React, { useMemo, type JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import type { Role } from "../../../types/nav_items";

interface SubMenuItem {
    name: string;
    path: string;
    allowed: string[];
}

interface NavItem {
    icon: JSX.Element;
    name: string;
    path?: string;
    allowed: string[];
    submenu?: SubMenuItem[];
}

interface SidebarItemProps {
    item: NavItem;
    collapsed: boolean;
    expandedMenus: string[];
    toggleSubmenu: (name: string) => void;
    profile?: { role?: string | null };
}

const SidebarItem = React.memo(({
    item,
    collapsed,
    expandedMenus,
    toggleSubmenu,
    profile,
}: SidebarItemProps) => {
    const location = useLocation();

    const role = useMemo(
        () => profile?.role as Role,
        [profile?.role]
    );


    if (!item.allowed.includes(role)) return null;

    const isActive = (path?: string) => location.pathname === path;
    const hasActiveSubmenu = item.submenu?.some((s) => isActive(s.path));
    const isExpanded = expandedMenus.includes(item.name);

    const active = isActive(item.path);
    const submenuActive = hasActiveSubmenu;
    const hasSubmenu = !!item.submenu;


    const filteredSubmenu = item.submenu?.filter((sub) =>
        sub.allowed.includes(role)
    );


    const displaySubmenu = hasSubmenu && filteredSubmenu && filteredSubmenu?.length > 0;

    return (
        <div>
            <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${active || submenuActive
                    ? "bg-white/15 text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                    } ${displaySubmenu && !collapsed ? "cursor-pointer" : ""}`}
                onClick={() => displaySubmenu && toggleSubmenu(item.name)}
                title={collapsed ? item.name : ""}
            >
                {(active || submenuActive) && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                )}

                <div
                    className={`${active || submenuActive ? "scale-110" : "group-hover:scale-110"
                        } transition-transform duration-200 shrink-0`}
                >
                    {item.icon}
                </div>

                {!collapsed && (
                    <>
                        {!displaySubmenu ? (
                            <Link to={item.path!} className="flex-1 font-medium text-sm">
                                {item.name}
                            </Link>
                        ) : (
                            <span className="flex-1 font-medium text-sm">{item.name}</span>
                        )}

                        {displaySubmenu && (
                            <svg
                                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        )}
                    </>
                )}
            </div>

            {/* Submenu */}
            {displaySubmenu && !collapsed && isExpanded && (
                <div className="mt-1 ml-4 pl-4 border-l-2 border-white/10 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {filteredSubmenu && filteredSubmenu.map((sub) => {
                        const subActive = isActive(sub.path);
                        return (
                            <Link
                                key={sub.path}
                                to={sub.path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${subActive
                                    ? "bg-white/10 text-white font-medium"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <div
                                    className={`w-1.5 h-1.5 rounded-full ${subActive ? "bg-white" : "bg-gray-500"
                                        }`}
                                />
                                {sub.name}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
});

export default SidebarItem;
