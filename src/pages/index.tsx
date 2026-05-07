import { lazy } from "react";


// public
const HomePage = lazy(() => import("./public/Home"));
const EventsListPage = lazy(() => import("./public/EventsList"));
const EventsDetailPage = lazy(() => import("./public/EventDetail"));
const CategoriesPage = lazy(() => import("./public/Categories"));
const OrganizerProfile = lazy(() => import("./public/organizer/OrganizerProfile"));
const PermissionDeniedPage = lazy(() => import("./public/PermissionDenied"));
const NotFoundPage = lazy(() => import("./public/NotFound"));
// auth
const SignInPage = lazy(() => import("./auth/SignIn"));
const SignUpPage = lazy(() => import("./auth/SignUp"));
const ForgotPasswordPage = lazy(() => import("./auth/ForgotPassword"));
const VerifyEmailOtp = lazy(() => import("./auth/VerifyEmailOtp"));
const ResetPassword = lazy(() => import("./auth/ResetPassword"));
// dashboard
const DashboardPage = lazy(() => import("./dashboard/DashboardPage"));
// protected
const ProfilePage = lazy(() => import("./protected/Profile"));
const UserManagePage = lazy(() => import("./protected/user/UserManagePage"));
const UserList = lazy(() => import("./protected/user/UserList"));
const UserCreateEvent = lazy(() => import("./protected/Event/UserCreateEvent"));
const UserUpdateEvent = lazy(() => import("./protected/Event/UserUpdateEvent"));
const AdminManageEvent = lazy(() => import("./protected/Event/AdminManageEvent"));
const EventList = lazy(() => import("./protected/Event/EventList"));
const EventInsightPage = lazy(() => import("./protected/Event/EventInsight"));
const SelftEventsList = lazy(() => import("./protected/Event/SelfEvents"));
const PlafformPricingList = lazy(() => import("./protected/platform_pricing/PlatformPricingList"));
const PlatformPricingPage = lazy(() => import("./protected/platform_pricing/PlatformPricingPage"));
const TicketBookingPage = lazy(() => import("./protected/ticket/TicketBookingPage"));
const AdminCreateTicket = lazy(() => import("./protected/ticket/AdminCreateTicket"));
const SelfTicketBooking = lazy(() => import("./protected/ticket/SelfTicketBooking"));
const UserTicketUpdate = lazy(() => import("./protected/ticket/UserTicketUpdate"));
const TicketList = lazy(() => import("./protected/ticket/TicketList"));
const TicketVerifyPage = lazy(() => import("./protected/ticket/TicketVerifyPage"));

export {
    // public
    HomePage,
    EventsListPage,
    EventsDetailPage,
    PermissionDeniedPage,
    OrganizerProfile,
    NotFoundPage,
    CategoriesPage,
    // auth
    SignInPage,
    SignUpPage,
    ForgotPasswordPage,
    VerifyEmailOtp,
    ResetPassword,
    // dashboard
    DashboardPage,
    // protected
    ProfilePage,
    UserManagePage,
    UserList,
    UserCreateEvent,
    UserUpdateEvent,
    AdminManageEvent,
    EventList,
    EventInsightPage,
    SelftEventsList,
    PlafformPricingList,
    PlatformPricingPage,
    TicketBookingPage,
    AdminCreateTicket,
    SelfTicketBooking,
    UserTicketUpdate,
    TicketVerifyPage,
    TicketList,
}