import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useTicketsStore from "../../../store/ticket";
import type { TicketVerifyResult } from "../../../types";
import { TicketVerifyEmptyState, VerifySuccess } from "../../../components/protected/ticket-verify";
import Loader from "../../../components/shared/LoadingComp";

const TicketVerifyPage = () => {
    const { verifyTicket } = useTicketsStore();
    const { ticket_token } = useParams<{ ticket_token: string }>();
    const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [result, setResult] = useState<TicketVerifyResult | null>(null);

    const verifiedOnceRef = useRef(false);

    useEffect(() => {
        if (!ticket_token || verifiedOnceRef.current) return;

        const handleVerify = async () => {
            verifiedOnceRef.current = true;
            setVerificationStatus('loading');

            try {
                const response = await verifyTicket(ticket_token);
                setResult(response);

                if (response.success) {
                    setVerificationStatus('success');
                } else {
                    setVerificationStatus('error');
                }
            } catch (error) {
                console.log(error)
                setVerificationStatus('error');
                setResult({
                    success: false,
                    message: "Failed to verify ticket. Please try again."
                } as TicketVerifyResult);
            }
        };

        handleVerify();
    }, [ticket_token, verifyTicket]);

    if (!ticket_token) return null;

    return (
        <div className="min-h-screen relative pt-20 overflow-hidden max-w-7xl mx-auto px-6 xl:px-12">
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="w-full max-w-md">
                    {verificationStatus === 'loading' && <Loader />}
                    {verificationStatus === 'success' && result?.data && <VerifySuccess result={result} />}
                    {verificationStatus === 'error' && <TicketVerifyEmptyState result={result} />}
                </div>
            </div>
        </div>
    );
};

export default TicketVerifyPage;
