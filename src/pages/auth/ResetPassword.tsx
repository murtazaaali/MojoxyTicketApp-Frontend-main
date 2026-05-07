import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, PasswordField } from "../../components/ui";
import { authService } from "../../service/auth";
import { toastSuccess } from "../../utilities/toast_message";
import { ROUTES_PATHS } from "../../routes/routes_path";



const ResetPassword = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState("");
    const { token } = useParams<{ token: string }>();

    const handleReset = async () => {

        const res = await authService.resetPassword(token!, password);

        if (res.success) {
            toastSuccess(res.message || "Password changed");
            navigate(ROUTES_PATHS.AUTH.SIGNIN)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
                    <p className="text-gray-400">Enter your new password</p>
                </div>
                <Card className="p-8">
                    <div className="space-y-3">
                        <PasswordField
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                        <Button onClick={handleReset}>
                            Reset Password
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ResetPassword
