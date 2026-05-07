import { Grid } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardLink = ({ showDashboardLink }: {
    showDashboardLink: boolean
}) => (
    <Link
        to={showDashboardLink ? "/dashboard" : "/"}
        className="flex items-center gap-1.5 text-white border border-white/20 px-2.5 py-1.5 rounded-full hover:bg-white/10 transition"
    >
        <Grid className="w-4 h-4" />
        {showDashboardLink ? "Dashboard" : "Home"}
    </Link>
);

export default DashboardLink