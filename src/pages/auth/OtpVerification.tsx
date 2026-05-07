import { useEffect, useState } from "react";
import { authService } from "../../service/auth";
import { toastSuccess, toastError } from "../../utilities/toast_message";
import { OTPEXPIRETIME } from "../../utilities/const";
import { Button, Card, Input } from "../../components/ui";


interface OtpVerificationProps {
    email: string;
    onVerified: () => void;
    isResend?: boolean;
    onCancel: () => void;
}

const OtpVerification = ({
    email,
    onVerified,
    onCancel,
}:
    OtpVerificationProps) => {
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
    const [otpTime, setOtpTime] = useState<number | null>(null);
    const [countdown, setCountdown] = useState(OTPEXPIRETIME);
    const [isOtpExpired, setIsOtpExpired] = useState(false);



    const handleGenerateOTP = async () => {
        try {
            const res = await authService.generateOTP(email);
            if (res.error) return toastError(res.error)
            toastSuccess("OTP sent to your email.")
            setGeneratedOtp(res.otp);
            setOtpTime(Date.now());
            setCountdown(OTPEXPIRETIME);
            setIsOtpExpired(false);
        } catch {
            toastError("Failed to send OTP.")
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const res = await authService.verifyOTP(email, otp);
            if (res.success) {
                toastSuccess("Email verified successfully.")
                onVerified();
            } else {
                toastError(res.message || "OTP verification failed.")
            }
        } catch {
            toastError("OTP verification failed.")
        }
    };

    useEffect(() => {
        if (otpTime) {
            const interval = setInterval(() => {
                const elapsed = Math.floor((Date.now() - otpTime) / 1000);
                const remaining = Math.max(OTPEXPIRETIME - elapsed, 0);
                setCountdown(remaining);

                if (remaining === 0) {
                    clearInterval(interval);
                    setIsOtpExpired(true);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [otpTime]);

    return (
        <div className="max-w-md w-full px-4">

            <Card className="p-8 space-y-6">
                {/* OTP Input */}
                <div className="space-y-3">
                    <Input
                        type="text"
                        name="otp"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="text-center tracking-widest text-lg"
                    />

                    <Button
                        fullWidth
                        size="md"
                        onClick={handleVerifyOTP}
                        disabled={!otp || otp.length < 6}
                    >
                        Verify OTP
                    </Button>
                </div>

                {/* Send / Cancel */}
                {!generatedOtp && (
                    <div className="flex gap-3">
                        <Button
                            fullWidth
                            variant="primary"
                            onClick={handleGenerateOTP}
                        >
                            Send OTP
                        </Button>

                        <Button
                            fullWidth
                            variant="outline"
                            onClick={onCancel}
                            className="text-red-400"
                        >
                            Cancel
                        </Button>
                    </div>
                )}

                {/* Countdown */}
                {generatedOtp && !isOtpExpired && (
                    <p className="text-center text-sm text-gray-400">
                        OTP expires in{" "}
                        <span className="text-red-400 font-medium">{countdown}s</span>
                    </p>
                )}

                {/* Expired */}
                {isOtpExpired && (
                    <div className="text-center space-y-2">
                        <p className="text-sm text-red-400">
                            OTP expired
                        </p>
                        <Button
                            variant="ghost"
                            onClick={handleGenerateOTP}
                            className="text-purple-400"
                        >
                            Resend OTP
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    )
}

export default OtpVerification
