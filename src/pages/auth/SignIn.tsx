import { useState } from "react";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES_PATHS } from "../../routes/routes_path";
import { authService } from "../../service/auth";
import { Button, Card, Input, PasswordField } from "../../components/ui";
import { GoToBackLink } from "../../components/shared";



const SignIn = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        form?: string;
    }>({});

    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};
        if (!formData?.email) {
            newErrors.email = "Email address is required.";
        }

        if (!formData?.password) {
            newErrors.password = "Password is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!validateForm()) {
            return;
        }

        try {
            const response = await authService.signin(
                formData?.email,
                formData?.password
            );


            if (response?.token) {
                localStorage.setItem("mjx_ticket_token", response?.token);
                localStorage.setItem("mjx_ticket_user", JSON.stringify(response?.user));
                navigate("/");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>

            <div className="min-h-screen flex items-center justify-center">

                <div className="max-w-md w-full px-4">
                    <GoToBackLink />
                    <div className="text-center mb-8">

                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-gray-400">Sign in to your account to continue</p>
                    </div>

                    <Card className="p-8">
                        <div className="space-y-3">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <Input
                                    type="email"
                                    name="email"
                                    label="Email Address"
                                    placeholder="john@example.com"
                                    icon={<User className="w-4 h-4" />}
                                    value={formData.email}
                                    autoComplete="email"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                                )}

                                <PasswordField
                                    name="password"
                                    placeholder="••••••••"
                                    label="Password"
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setFormData({
                                            ...formData,
                                            [e.target.name]: e.target.value,
                                        })}
                                />
                                {errors.password && (
                                    <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                                )}
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5" />
                                        Remember me
                                    </label>
                                    <Link to={ROUTES_PATHS.AUTH.FORGOT_PASSWORD} className="text-purple-500 hover:text-purple-400">
                                        Forgot password?
                                    </Link>

                                </div>

                                <Button fullWidth size="lg" type="submit">
                                    Sign In
                                </Button>

                            </form>


                            <p className="text-center text-sm text-gray-400">
                                Don't have an account?{' '}
                                <button
                                    onClick={() => navigate('/auth/signup')}
                                    className="text-purple-500 hover:text-purple-400 font-medium"
                                >
                                    Sign up
                                </button>
                            </p>
                        </div>
                    </Card>
                </div>
            </div></>
    );
};

export default SignIn