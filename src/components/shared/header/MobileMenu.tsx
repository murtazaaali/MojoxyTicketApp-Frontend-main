import { Link } from "react-router-dom";
import { Grid, LogOut, User } from "lucide-react";
import { Button } from "../../ui";

interface MenuLinks {
    profileLink: string;
    createEventLink: string;
    signInLink: string;
}

interface MobileMenuProps {
    navItems: { label: string; path: string }[];
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isAuthenticated: boolean;
    handleLogout: () => void;
    showDashboardLink?: boolean;
    menu_links: MenuLinks;
}

const MobileMenu = ({
    navItems,
    setMobileMenuOpen,
    isAuthenticated,
    handleLogout,
    showDashboardLink = false,
    menu_links,
}: MobileMenuProps) => {
    const { profileLink, createEventLink, signInLink } = menu_links;

    return (
        <div className="md:hidden bg-black/95 border-t border-white/10">

            <div className="px-4 py-6 space-y-4">

                {/* Nav */}
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 text-gray-300 hover:bg-white/5 rounded-lg"
                    >
                        {item.label}
                    </Link>
                ))}

                {/* Create event */}
                <Link
                    to={createEventLink}
                    className="block text-center text-gray-300 hover:text-purple-500"
                >
                    Create Event
                </Link>

                {/* Auth */}
                {isAuthenticated ? (
                    <div className="space-y-2">

                        <Link
                            to={showDashboardLink ? "/dashboard" : "/"}
                            className="flex items-center gap-2 px-4 py-3 text-white hover:bg-white/10 rounded-lg"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Grid className="w-4 h-4" />
                            {showDashboardLink ? "Dashboard" : "Home"}
                        </Link>

                        <Link
                            to={profileLink}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-3 text-white hover:bg-white/10 rounded-lg"
                        >
                            <User className="w-4 h-4" />
                            Profile
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link
                        to={signInLink}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <Button fullWidth>
                            <User className="w-4 h-4" />
                            Sign In
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default MobileMenu;