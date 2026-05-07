import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { authService } from "../../service/auth";
import { toastError, toastSuccess } from "../../utilities/toast_message";
import { GoToBackLink } from "../../components/shared";
import { Button, Card, Input } from "../../components/ui";
import { ROUTES_PATHS } from "../../routes/routes_path";



const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await authService.forgotPassword(email);

            if (res.success) {
                toastSuccess("OTP sent to email");
                // redirect to verify page
                navigate(ROUTES_PATHS.AUTH.VERIFY_OTP(email));
            }

        } catch {
            toastError("Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full px-4">
                <GoToBackLink />
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Forgot Password</h1>
                    <p className="text-gray-400">Please enter your email address to receive a link to reset your password.</p>
                </div>
                <Card className="p-8">
                    <div className="space-y-3">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                type="email"
                                name="email"
                                label="Email Address"
                                placeholder="john@example.com"
                                icon={<User className="w-4 h-4" />}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}

                            />
                            <Button fullWidth size="lg" type="submit">
                                {loading ? "Sending..." : "Send Reset Link"}
                            </Button>
                        </form>
                    </div>


                </Card>
            </div>

        </div>
    )
}

export default ForgotPassword
