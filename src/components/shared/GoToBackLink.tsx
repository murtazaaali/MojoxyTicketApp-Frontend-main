import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";


const GoToBackLink = () => {
    const location = useLocation();

    const from = location.state?.from || "/";

    return (
        <Link className="flex items-center gap-2 text-sm text-gray-400
         hover:text-white mb-4" to={from}>
            <ArrowLeft className="w-4 h-4" />
            Back to Page
        </Link>
    )
}

export default GoToBackLink
