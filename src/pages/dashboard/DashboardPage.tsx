import { useState, useEffect } from "react";
import useProfileStore from "../../store/profile";
import type { AdminDashboard as AdminDashboardType, UserDashboard as UserDashboardType } from "../../types";
import useDashbaordStore from "../../store/dashboard";
import { AdminDashboard, UserDashboard } from "../../components/dashboard";



const DashboardPage = () => {
    const [dashbaordData, setDashbaordData] = useState<AdminDashboardType | UserDashboardType | null>(null);
    const { profile, fetchProfile, isFetched: isProfileFetched } = useProfileStore();
    const { fetchAdminDashboard } = useDashbaordStore();

    useEffect(() => {
        if (!isProfileFetched) {
            fetchProfile();
        }


    }, [fetchProfile, isProfileFetched]);

    useEffect(() => {
        const loadDashboard = async () => {
            if (!isProfileFetched) {
                await fetchProfile();
            }


            const resp = await fetchAdminDashboard();

            if (!resp?.success) return

            setDashbaordData(resp.data ?? null);

        };

        loadDashboard();
    }, [fetchProfile, isProfileFetched, fetchAdminDashboard, profile?.role]);


    return (
        <div className="min-h-screen relative text-white">
            {
                profile?.role === "admin" ? (
                    <AdminDashboard userName={profile.name}
                        data={dashbaordData as AdminDashboardType ?? null} />
                ) : (
                    <UserDashboard userName={profile?.name ?? ''}
                        data={dashbaordData as UserDashboardType ?? null} />
                )
            }
        </div>
    )
}

export default DashboardPage
