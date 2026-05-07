
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../service/auth';
import useProfileStore from '../store/profile';
import { LoaderComp } from '../components/shared';

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { profile, isFetched: isProfileFetched, fetchProfile } = useProfileStore();

    useEffect(() => {
        if (!isProfileFetched) {
            fetchProfile().catch((err) => console.error("Failed to fetch profile:", err));
        }
    }, [isProfileFetched, fetchProfile]);

    if (!authService.isAuthenticated()) {
        return <Navigate to="/auth/signin" replace />;
    }

    // Wait for profile to load
    if (!isProfileFetched) {
        return <LoaderComp />;
    }


    if (allowedRoles && !allowedRoles.includes(profile?.role || "")) {
        return <Navigate to="/denied" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute
