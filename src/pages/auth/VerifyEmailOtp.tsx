import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES_PATHS } from "../../routes/routes_path";
import { authService } from "../../service/auth";
import { Button, Card, Input } from "../../components/ui";



const VerifyEmailOtp = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState("");
    const { email } = useParams<{ email: string }>();


    const handleVerify = async () => {
        const res = await authService.verifyOTP(email!, otp);

        if (!email) return

        if (res.success) {
            console.log(res);
            navigate(ROUTES_PATHS.AUTH.RESET(res.token));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Verify OTP</h1>
                    <p className="text-gray-400">Enter the OTP sent to your email</p>
                </div>
                <Card className="p-8">
                    <div className="space-y-3">
                        <Input
                            type="text"
                            name="otp"
                            label="OTP"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}

                        />
                        <Button fullWidth size="lg" onClick={handleVerify}>
                            Verify
                        </Button>
                    </div>
                </Card>
            </div>

        </div>
    )
}

export default VerifyEmailOtp
