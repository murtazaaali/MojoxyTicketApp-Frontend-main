import { lazy } from "react"
const AdminDashboard = lazy(() => import("./admin"))
const UserDashboard = lazy(() => import("./user"))

// shared component
const StatCard = lazy(() => import("./StatCard"))
const SecondaryStatCard = lazy(() => import("./SecondaryStatCard"))

export {
    AdminDashboard,
    UserDashboard,
    // shared component
    StatCard,
    SecondaryStatCard,
}