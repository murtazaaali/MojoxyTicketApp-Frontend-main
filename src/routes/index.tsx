import { SuspenseComp } from "../components/shared";
import * as Layout from "../layout";
import * as Pages from "../pages";
import ProtectedRoute from "./protected_route";
import { ROUTES_PATHS } from "./routes_path";

const appRoutes = [
    {
        element: <Layout.AppLayout />,
        children: [
            {
                element: <Layout.MainLayout />,
                children: [
                    // PUBLIC ROUTES
                    { path: ROUTES_PATHS.PUBLIC.HOME, element: <SuspenseComp><Pages.HomePage /></SuspenseComp> },
                    { path: ROUTES_PATHS.PUBLIC.EVENTS_LIST, element: <SuspenseComp><Pages.EventsListPage /></SuspenseComp> },
                    { path: "/event-detail/:event_id?", element: <SuspenseComp><Pages.EventsDetailPage /></SuspenseComp> },
                    { path: ROUTES_PATHS.PUBLIC.CATEGORIES, element: <SuspenseComp><Pages.CategoriesPage /></SuspenseComp> },
                    { path: "/organizer/:user_id?", element: <SuspenseComp><Pages.OrganizerProfile /></SuspenseComp> },
                ],
            },

            // PROTECTED ROUTES
            {
                element: <ProtectedRoute />,
                children: [
                    // admin + user routes
                    {
                        element: <ProtectedRoute allowedRoles={["admin", "user"]} />,
                        children: [
                            {
                                path: ROUTES_PATHS.DASHBOARD.BASE,
                                element: <Layout.DashboardLayout />,
                                children: [
                                    { path: ROUTES_PATHS.DASHBOARD.BASE, element: <SuspenseComp><Pages.DashboardPage /></SuspenseComp> },
                                    { path: ROUTES_PATHS.DASHBOARD.EVENTS.SELF, element: <SuspenseComp><Pages.SelftEventsList /></SuspenseComp> },
                                    { path: ROUTES_PATHS.DASHBOARD.TICKET.SELF, element: <SuspenseComp><Pages.SelfTicketBooking /></SuspenseComp> },
                                ],
                            },
                        ],
                    },

                    // admin only routes
                    {
                        element: <ProtectedRoute allowedRoles={["admin"]} />,
                        children: [
                            {
                                path: ROUTES_PATHS.DASHBOARD.BASE,
                                element: <Layout.DashboardLayout />,
                                children: [
                                    // USERS
                                    { path: ROUTES_PATHS.DASHBOARD.USERS.LIST, element: <SuspenseComp><Pages.UserList /></SuspenseComp> },
                                    { path: "/dashboard/user/:user_id?", element: <SuspenseComp><Pages.UserManagePage /></SuspenseComp> },

                                    // EVENTS
                                    { path: ROUTES_PATHS.DASHBOARD.EVENTS.LIST, element: <SuspenseComp><Pages.EventList /></SuspenseComp> },
                                    { path: ROUTES_PATHS.DASHBOARD.EVENTS.UNAPPROVED, element: <SuspenseComp><Pages.EventList isUnapproved={true} /></SuspenseComp> },
                                    { path: "/dashboard/event/:event_id?", element: <SuspenseComp><Pages.AdminManageEvent /></SuspenseComp> },
                                    { path: "/dashboard/event/insight/:event_id?", element: <SuspenseComp><Pages.EventInsightPage /></SuspenseComp> },

                                    // PLATFORM PRICING
                                    { path: ROUTES_PATHS.DASHBOARD.PLATFORM_PRICING.LIST, element: <SuspenseComp><Pages.PlafformPricingList /></SuspenseComp> },
                                    { path: "/dashboard/platform_pricing/:platform_id?", element: <SuspenseComp><Pages.PlatformPricingPage /></SuspenseComp> },

                                    // TICKET BOOKINGS
                                    { path: "/dashboard/ticket/:ticket_id?", element: <SuspenseComp><Pages.AdminCreateTicket /></SuspenseComp> },

                                    { path: ROUTES_PATHS.DASHBOARD.TICKET.LIST, element: <SuspenseComp><Pages.TicketList /></SuspenseComp> },
                                ],
                            },
                        ],
                    },

                    // admin + user (profile / create-event)
                    {
                        element: <ProtectedRoute allowedRoles={["admin", "user"]} />,
                        children: [
                            {
                                element: <Layout.MainLayout />,
                                children: [
                                    { path: ROUTES_PATHS.USER.PROFILE, element: <SuspenseComp><Pages.ProfilePage /></SuspenseComp> },
                                    { path: ROUTES_PATHS.USER.CREATE_EVENT, element: <SuspenseComp><Pages.UserCreateEvent /></SuspenseComp> },
                                    { path: "/dashboard/event/:id/update", element: <SuspenseComp><Pages.UserUpdateEvent /></SuspenseComp> },
                                    { path: "/ticket/booking/:event_id", element: <SuspenseComp><Pages.TicketBookingPage /></SuspenseComp> },
                                    { path: "/dashboard/ticket/:id/update", element: <SuspenseComp><Pages.UserTicketUpdate /></SuspenseComp> },

                                ],
                            },
                        ],
                    },
                    {
                        element: <ProtectedRoute allowedRoles={["admin", "user"]} />,
                        children: [
                            {
                                element: <Layout.EmptyLayout />,
                                children: [

                                    { path: "/ticket/:ticket_token/verify", element: <SuspenseComp><Pages.TicketVerifyPage /></SuspenseComp> },
                                ],
                            },
                        ],
                    },

                ],
            },
        ],
    },

    // AUTH ROUTES
    {
        path: ROUTES_PATHS.AUTH.BASE,
        element: <Layout.AuthLayout />,
        children: [
            { path: ROUTES_PATHS.AUTH.SIGNIN, element: <SuspenseComp><Pages.SignInPage /></SuspenseComp> },
            { path: ROUTES_PATHS.AUTH.SIGNUP, element: <SuspenseComp><Pages.SignUpPage /></SuspenseComp> },
            { path: ROUTES_PATHS.AUTH.FORGOT_PASSWORD, element: <SuspenseComp><Pages.ForgotPasswordPage /></SuspenseComp> },
            { path: "/auth/verify-otp/:email", element: <SuspenseComp><Pages.VerifyEmailOtp /></SuspenseComp> },
            { path: "/auth/reset-password/:token", element: <SuspenseComp><Pages.ResetPassword /></SuspenseComp> },
        ],
    },

    // SYSTEM ROUTES
    { path: ROUTES_PATHS.SYSTEM.DENIED, element: <SuspenseComp><Pages.PermissionDeniedPage /></SuspenseComp> },
    { path: ROUTES_PATHS.SYSTEM.NOT_FOUND, element: <SuspenseComp><Pages.NotFoundPage /></SuspenseComp> },
];

export default appRoutes;
