import { GridIcon, Users2Icon, Calendar, Percent, Ticket } from "lucide-react";
import { ROUTES_PATHS } from "../routes/routes_path";


export const navItems = [
    {
        icon: <GridIcon className="w-6 h-6" />,
        name: "Dashboard",
        path: ROUTES_PATHS?.DASHBOARD?.BASE,
        allowed: ["admin", "user", "artist"],
    },
    {
        icon: <Users2Icon className="w-6 h-6" />,
        name: "Users",
        allowed: ["admin"],
        submenu: [
            {
                name: "Users List",
                path: ROUTES_PATHS?.DASHBOARD?.USERS?.LIST,
                allowed: ["admin"],
            },
            {
                name: "Add User",
                path: ROUTES_PATHS?.DASHBOARD?.USERS?.FORM(),
                allowed: ["admin"],
            },
        ],
    },

    {
        icon: <Calendar className="w-6 h-6" />,
        name: "Events",
        allowed: ["admin", "user"],
        submenu: [
            {
                name: "Events List",
                path: ROUTES_PATHS?.DASHBOARD?.EVENTS?.LIST,
                allowed: ["admin"],
            },
            {
                name: "Unapproved Events",
                path: ROUTES_PATHS?.DASHBOARD?.EVENTS?.UNAPPROVED,
                allowed: ["admin"],
            },
            {
                name: "Add Event",
                path: ROUTES_PATHS?.DASHBOARD?.EVENTS?.FORM(),
                allowed: ["admin"],
            },
            {
                name: "My Events",
                path: ROUTES_PATHS?.DASHBOARD?.EVENTS?.SELF,
                allowed: ["admin", "user"],
            },
        ],
    },
    {
        icon: <Percent className="w-6 h-6" />,
        name: "Platform Pricing",
        allowed: ["admin"],
        submenu: [
            {
                name: "Platform Pricing List",
                path: ROUTES_PATHS?.DASHBOARD?.PLATFORM_PRICING?.LIST,
                allowed: ["admin"],
            },
            {
                name: "Add Platform Pricing",
                path: ROUTES_PATHS?.DASHBOARD?.PLATFORM_PRICING?.FORM(),
                allowed: ["admin"],
            },

        ],
    },
    {
        icon: <Ticket className="w-6 h-6" />,
        name: "Tickets",
        allowed: ["admin", "user"],
        submenu: [
            {
                name: "Tickets List",
                path: ROUTES_PATHS?.DASHBOARD?.TICKET?.LIST,
                allowed: ["admin"],
            },
            {
                name: "Create Ticket",
                path: ROUTES_PATHS?.DASHBOARD?.TICKET?.FORM(),
                allowed: ["admin"],
            },
            {
                name: "My Ticket Bookings",
                path: ROUTES_PATHS?.DASHBOARD?.TICKET?.SELF,
                allowed: ["admin", "user"],
            },
        ],
    },

];
