import { useEffect, useState } from "react";
import type { User } from "../../types";
import useProfileStore from "../../store/profile";
import { validatePassword } from "../../utilities/auth";
import OtpVerification from "../auth/OtpVerification";
import { toastError, toastSuccess } from "../../utilities/toast_message";
import { Button, Input } from "../../components/ui"
import { PageHeader } from "../../components/shared";



const ProfilePage = () => {
    const { profile, fetchProfile, isFetched: isProfileFetched, changePassword, updateProfile } =
        useProfileStore();
    const [otpVerified, setOtpVerified] = useState(false);
    const [emailChanged, setEmailChanged] = useState(false);
    const [otpRequested, setOtpRequested] = useState(false);
    const [userProfile, setUserProfile] = useState<User>({
        _id: "",
        name: "",
        email: "",
        phone: "",
        role: "user",
        isActive: false,
    });

    useEffect(() => {
        if (!isProfileFetched) {
            fetchProfile();
        }
    }, [isProfileFetched, fetchProfile]);

    useEffect(() => {
        if (profile) {
            setUserProfile({
                _id: profile._id || "",
                name: profile.name || "",
                email: profile.email || "",
                phone: profile.phone || "",
                role: profile.role || "user",
                isActive: profile.isActive || false,
            });
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserProfile((prev) => {
            if (name === "email") {
                setEmailChanged(value !== profile?.email);
                setOtpVerified(false);
            }
            return { ...prev, [name]: value };
        });
    };

    const handlePasswordChange = async () => {
        if (!userProfile._id) return toastError("User ID not found");

        const newPassword = prompt("Enter your new password:");
        if (!newPassword) return;

        const { valid, message } = validatePassword(newPassword);
        if (!valid) {
            toastError(message as string);
        }

        const confirm = window.confirm("Are you sure you want to change password?");
        if (!confirm) return;

        try {
            await changePassword(userProfile._id, newPassword);

            toastSuccess("Password updated successfully.");
        } catch {
            toastError("Failed to change password.");
        }
    };


    const handleSubmit = async () => {


        if (!userProfile._id) return toastError("User ID not found");

        if (emailChanged && !otpVerified) {

            setOtpRequested(true);
            return toastError("Please verify your new email with OTP first.");
        }

        try {
            await updateProfile(userProfile._id, {
                name: userProfile.name,
                email: userProfile.email,
                phone: userProfile.phone,
                role: userProfile.role,
                isActive: userProfile.isActive,
            });

            toastSuccess("Profile updated successfully.");
        } catch {
            toastError("Failed to update profile.");
        }
    };


    return (
        <div className="min-h-screen relative pt-20 overflow-hidden max-w-7xl mx-auto px-6 xl:px-12 text-white">
            <PageHeader title="User Profile" description="Manage your personal information and account settings" />
            <div className="max-w-xl mx-auto p-4">
                {emailChanged && otpRequested && !otpVerified ? (
                    <div className="grid gap-6">
                        <OtpVerification
                            email={userProfile.email}
                            onVerified={() => {
                                setOtpVerified(true);
                                toastSuccess("OTP verified. You can now save changes.");
                            }}
                            onCancel={() => {
                                setOtpRequested(false);
                                setOtpVerified(false);
                                setUserProfile((prev) => ({
                                    ...prev,
                                    email: profile?.email || "",
                                }));
                                toastError("Email verification cancelled.");
                            }}
                        />
                    </div>
                ) : <div className="grid gap-6">
                    <Input
                        name="name"
                        label="Name"
                        type="text"
                        value={userProfile.name}
                        onChange={handleChange}
                    />
                    <Input
                        name="email"
                        label="Email"
                        type="email"
                        value={userProfile.email}
                        onChange={handleChange}
                    />
                    <Input
                        name="phone"
                        label="Phone"
                        type="text"
                        value={userProfile.phone}
                        onChange={handleChange}
                    />

                    <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
                        <Button variant="ghost" size="md" onClick={handlePasswordChange}>
                            Change Password
                        </Button>
                        <Button variant="primary" size="md" onClick={handleSubmit}>
                            Save Changes
                        </Button>
                    </div>
                </div>}

            </div>

        </div>
    )
}

export default ProfilePage
