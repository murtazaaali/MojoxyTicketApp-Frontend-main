import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../service/auth";
import useProfileStore from "../../store/profile";
import * as Comp from "./header/index";
import { ROUTES_PATHS } from "../../routes/routes_path";

interface HeaderProps {
    showIcon?: boolean;
    showDashboardLink?: boolean;
}

const Header = ({
    showIcon = true,
    showDashboardLink = true,
}: HeaderProps) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const dropdownRef = useRef<HTMLDivElement>(null);

    const [ui, setUi] = useState({
        dropdownOpen: false,
        mobileMenuOpen: false,
        scrolled: false,
    });

    const { profile, resetProfile, fetchProfile, isFetched } =
        useProfileStore();

    const isAuthenticated = authService.isAuthenticated();
    const isDashboard = pathname.startsWith("/dashboard");

    const navItems = [
        { label: "Explore", path: "/" },
        { label: "Categories", path: "/categories" },
        { label: "Events", path: "/events-list" },
    ];

    const menuLinks = {
        profileLink: ROUTES_PATHS?.USER?.PROFILE,
        createEventLink: ROUTES_PATHS?.USER?.CREATE_EVENT,
        signInLink: ROUTES_PATHS?.AUTH?.SIGNIN,
    };

    // -------------------------
    // Profile fetch (optimized)
    // -------------------------
    useEffect(() => {
        if (!isAuthenticated || isFetched) return;

        const run = (): void => {
            fetchProfile();
        };

        let id: number | undefined;

        const hasIdleCallback =
            typeof window !== "undefined" && "requestIdleCallback" in window;

        if (hasIdleCallback) {
            id = (window as Window & typeof globalThis & {
                requestIdleCallback: (cb: IdleRequestCallback) => number;
            }).requestIdleCallback(run);
        } else {
            id = window.setTimeout(run, 200);
        }

        return () => {
            if (hasIdleCallback && id !== undefined) {
                (window as Window & typeof globalThis & {
                    cancelIdleCallback: (handle: number) => void;
                }).cancelIdleCallback(id);
            } else if (id !== undefined) {
                clearTimeout(id);
            }
        };
    }, [isAuthenticated, isFetched, fetchProfile]);

    // -------------------------
    // Scroll handler
    // -------------------------
    useEffect(() => {
        const onScroll = () => {
            setUi((p) => ({ ...p, scrolled: window.scrollY > 20 }));
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // -------------------------
    // Click outside dropdown
    // -------------------------
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (
                ui.dropdownOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setUi((p) => ({ ...p, dropdownOpen: false }));
            }
        };

        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, [ui.dropdownOpen]);

    // -------------------------
    // Logout
    // -------------------------
    const handleLogout = () => {
        authService.logout();
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        resetProfile();
        navigate(menuLinks.signInLink);
    };

    // -------------------------
    // Utils
    // -------------------------
    const getInitials = (name = "") =>
        name
            .trim()
            .split(" ")
            .filter(Boolean)
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

    return (
        <header
            className={`${isDashboard ? "sticky" : "fixed"
                } top-0 left-0 right-0 z-40 transition-all duration-300 ${ui.scrolled
                    ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg"
                    : "bg-transparent"
                }`}
        >
            <Comp.DesktopMenu
                navItems={navItems}
                mobileMenuOpen={ui.mobileMenuOpen}
                setMobileMenuOpen={(v) =>
                    setUi((p) => ({
                        ...p,
                        mobileMenuOpen: typeof v === "function" ? v(p.mobileMenuOpen) : v,
                    }))
                }
                dropdownOpen={ui.dropdownOpen}
                setDropdownOpen={(v) =>
                    setUi((p) => ({
                        ...p,
                        dropdownOpen: typeof v === "function" ? v(p.dropdownOpen) : v,
                    }))
                }
                dropdownRef={dropdownRef}
                isAuthenticated={isAuthenticated}
                profile={profile}
                getInitials={getInitials}
                handleLogout={handleLogout}
                showIcon={showIcon}
                showDashboardLink={showDashboardLink}
                menu_links={menuLinks}
            />

            {ui.mobileMenuOpen && (
                <Comp.MobileMenu
                    navItems={navItems}
                    setMobileMenuOpen={(v) =>
                        setUi((p) => ({
                            ...p,
                            mobileMenuOpen: typeof v === "function" ? v(p.mobileMenuOpen) : v,
                        }))
                    }
                    isAuthenticated={isAuthenticated}
                    handleLogout={handleLogout}
                    showDashboardLink={showDashboardLink}
                    menu_links={menuLinks}
                />
            )}
        </header>
    );
};

export default Header;