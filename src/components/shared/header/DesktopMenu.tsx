import { Link } from "react-router-dom";
import {
    ChevronDownIcon,
    LogOut,
    Menu,
    User,
    X,
} from "lucide-react";
import type { User as UserType } from "../../../types";
import { Button } from "../../ui";
import DashboardLink from "./DashboardLink";

interface MenuLinks {
    profileLink: string;
    createEventLink: string;
    signInLink: string;
}

interface DesktopMenuProps {
    navItems: { label: string; path: string }[];
    dropdownOpen: boolean;
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    profile: UserType | null;
    isAuthenticated: boolean;
    getInitials: (name: string) => string;
    handleLogout: () => void;
    showIcon?: boolean;
    showDashboardLink?: boolean;
    menu_links: MenuLinks;
}

const DesktopMenu = ({
    navItems,
    dropdownOpen,
    setDropdownOpen,
    dropdownRef,
    mobileMenuOpen,
    setMobileMenuOpen,
    profile,
    isAuthenticated,
    getInitials,
    handleLogout,
    showIcon = true,
    showDashboardLink = false,
    menu_links,
}: DesktopMenuProps) => {
    const { profileLink, createEventLink, signInLink } = menu_links;

    const toggleDropdown = () => setDropdownOpen((p) => !p);



    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">

                {/* Logo */}
                {showIcon && (
                    <Link to="/" className="flex items-center gap-3">
                        <img
                            src="/images/logo-icon.png"
                            alt="Logo"
                            className="w-40 h-40"
                            loading="lazy"
                        />
                    </Link>
                )}

                {/* Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="text-sm text-gray-300 hover:text-purple-500 transition"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">

                    <Link
                        to={createEventLink}
                        className="text-sm text-gray-300 hover:text-purple-500 transition"
                    >
                        Create Event
                    </Link>

                    {/* Auth */}
                    {isAuthenticated ? (
                        <div className="flex items-center gap-3">

                            <DashboardLink showDashboardLink={showDashboardLink} />

                            {/* Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center gap-2 px-2 py-1 rounded-full border border-white/20 hover:bg-white/10"
                                >
                                    <div className="w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs">
                                        {profile?.name ? getInitials(profile.name) : "MJ"}
                                    </div>

                                    <span className="text-xs text-white hidden lg:block">
                                        {profile?.name || "User"}
                                    </span>

                                    <ChevronDownIcon
                                        className={`w-4 h-4 text-white transition ${dropdownOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-60 bg-black/90 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">

                                        <div className="px-4 py-3 border-b border-white/10">
                                            <p className="text-white text-sm font-semibold">
                                                {profile?.name || "User"}
                                            </p>
                                            <p className="text-gray-400 text-xs">
                                                {profile?.email || "user@example.com"}
                                            </p>
                                        </div>

                                        <Link
                                            to={profileLink}
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-2 px-4 py-3 text-sm text-white hover:bg-white/10"
                                        >
                                            <User className="w-4 h-4" />
                                            Profile
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-400 hover:bg-white/10"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <Link to={signInLink}>
                            <Button size="sm">
                                <User className="w-4 h-4" />
                                Sign In
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>

            </div>
        </div>
    );
};

export default DesktopMenu;