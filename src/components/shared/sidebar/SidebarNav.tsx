
import React from "react";
import { navItems } from "../../../utilities/sidebar_Items";
import SidebarItem from "./SidebarItem";
import SuspenseComp from "../SuspenseComp";


interface SidebarNavProps {
    collapsed: boolean;
    expandedMenus: string[];
    toggleSubmenu: (name: string) => void;
    profile?: { role?: string | null };
}

const SidebarNav = React.memo(({
    collapsed,
    expandedMenus,
    toggleSubmenu,
    profile,
}: SidebarNavProps) => {
    return (
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <SuspenseComp>
                {navItems.map((item) => (

                    <SidebarItem

                        key={item.name}
                        item={item}
                        collapsed={collapsed}
                        expandedMenus={expandedMenus}
                        toggleSubmenu={toggleSubmenu}
                        profile={profile}
                    />

                ))}
            </SuspenseComp>
        </nav>
    );
});

export default SidebarNav;
