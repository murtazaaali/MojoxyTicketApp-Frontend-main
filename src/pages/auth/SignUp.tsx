import { useState } from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { SignupErrors } from "../../types";
import { authService } from "../../service/auth";
import { EMAIL_REGEX, validatePassword } from "../../utilities/auth";
import OtpVerification from "./OtpVerification";
import { Button, Card, Input, PasswordField } from "../../components/ui";
import { GoToBackLink } from "../../components/shared";

const SignUp = () => {
    const [errors, setErrors] = useState<SignupErrors>({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
        phone: "",
    });

    const [showOtpBox, setShowOtpBox] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const validateForm = () => {
        const newErrors: SignupErrors = {};

        if (!formData.name.trim()) newErrors.name = "Full Name is required.";

        if (!formData.email) {
            newErrors.email = "Email address is required.";
        } else if (!EMAIL_REGEX.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        const { valid, message } = validatePassword(formData.password);
        if (!valid) newErrors.password = message;
        else if (!formData.phone.trim()) newErrors.phone = "Phone no is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleOtpVerified = async () => {
        try {
            const res = await authService.signup(
                formData.name,
                formData.email,
                formData.password,
                formData.role,
                formData.phone
            );

            if (res?.success && res.token) {


                localStorage.setItem("mjx_ticket_token", res.token);
                localStorage.setItem("mjx_ticket_user", JSON.stringify(res.user));


                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setShowOtpBox(true);
    };



    return (
        <div className="min-h-screen flex items-center justify-center py-12">
            <div className="max-w-md w-full px-4">
                <GoToBackLink />
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">{showOtpBox
                        ? 'Verify Account'
                        : 'Create Account'}</h1>
                    <p className="text-gray-400">Join thousands of event enthusiasts</p>
                </div>

                <Card className="p-8">
                    <div className="space-y-3">

                        {showOtpBox ? (
                            <OtpVerification
                                email={formData.email}
                                onVerified={handleOtpVerified}
                                isResend={true}
                                onCancel={() => setShowOtpBox(false)}
                            />
                        ) : <form className="space-y-6" onSubmit={handleSubmit}>
                            <Input
                                name="name"
                                label="Name"
                                placeholder="John"
                                value={formData.name}
                                onChange={handleChange} />
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                            )}

                            <Input
                                name="email"
                                type="email"
                                label="Email Address"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                icon={<User className="w-4 h-4" />}
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                            )}

                            <Input
                                name="phone"
                                type="phone"
                                label="Phone No"
                                placeholder="XXX XXX XXXX"
                                value={formData.phone}
                                onChange={handleChange}
                                icon={<User className="w-4 h-4" />}
                            />
                            {errors.phone && (
                                <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                            )}

                            <PasswordField
                                name="password"
                                label="Password"
                                value={formData.password}
                                onChange={handleChange}

                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                            )}


                            <Button fullWidth size="lg" type="submit">
                                Create Account
                            </Button>

                        </form>}


                        <p className="text-center text-sm text-gray-400">
                            Already have an account?{' '}
                            <button
                                onClick={() => navigate('/auth/signin')}
                                className="text-purple-500 hover:text-purple-400 font-medium"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SignUp