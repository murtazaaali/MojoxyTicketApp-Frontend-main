import { useState, useCallback } from "react";
import { ChevronLeft, CreditCard, Loader2, Tag, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { AttendeeEntry, Event, Ticket } from "../../../types";
import useTicketsStore from "../../../store/ticket";
import useEventsStore from "../../../store/event";
import { ROUTES_PATHS } from "../../../routes/routes_path";
import { formatDate } from "../../../utilities/functions";
import { useBookingTotals } from "../../../hooks";
import {
    EventBanner,
    StepIndicator,
    TicketDetailStep,
    PaymentMethodCard,
} from "../../../components/protected/ticket-booking";
import { PageHeader } from "../../../components/shared";
import { Button } from "../../../components/ui";
import { PriceLine } from "../../../components/shared/form";

// ── Helpers ─────────────────────────────────────────────────────────────────

const getImageSrc = (image?: File | string | null) => {
    if (!image) return "";

    return image instanceof File ? URL.createObjectURL(image) : image;
};

// ── Page ─────────────────────────────────────────────────────────────────────

const TicketBookingPage = () => {
    const { event_id } = useParams<{ event_id: string }>();
    const navigate = useNavigate();

    const [step, setStep] = useState<1 | 2>(1);
    const [ticketCounts, setTicketCounts] = useState<Record<string, number>>({});
    const [attendees, setAttendees] = useState<AttendeeEntry[]>([]);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [nameError, setNameError] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const { addTicket } = useTicketsStore();
    const { fetchEventById } = useEventsStore();

    // ── Data fetching via TanStack Query ──────────────────────────────────────

    const { data: event, isLoading } = useQuery({
        queryKey: ["event", event_id],
        queryFn: async () => {
            if (!event_id) throw new Error("No event ID");
            const data = await fetchEventById(event_id);
            if (!data) {
                navigate(ROUTES_PATHS.PUBLIC.EVENTS_LIST);
                return null;
            }
            return data;
        },
        enabled: !!event_id,
        staleTime: 5 * 60 * 1000, // 5 min — event data rarely changes mid-booking
    });

    // ── Derived values ────────────────────────────────────────────────────────

    const getCount = useCallback(
        (type: string) => ticketCounts[type] ?? 0,
        [ticketCounts]
    );

    const totalTickets = Object.values(ticketCounts).reduce((a, b) => a + b, 0);
    const { subtotal, platformFee, grandTotal } = useBookingTotals(attendees, event ?? null);

    // ── Payment handler ───────────────────────────────────────────────────────

    const handlePay = async () => {
        if (!event?._id) return;
        setIsProcessing(true);
        try {
            const ticketData: Ticket = {
                event,
                user: null,
                tickets: attendees.map(({ name, type, priceAmount, cnic, email, phone }) => ({
                    name,
                    type,
                    priceAmount,
                    cnic,
                    email,
                    phone,
                    status: "active",
                })),
                total_amount: grandTotal,
                platform_fee_type: event.platform_fees_type,
                platform_fee_value: platformFee,
                payment_method: paymentMethod,
                payment_status: "pending",
                status: "booked",
            };
            await addTicket(ticketData);
            navigate(ROUTES_PATHS.DASHBOARD.TICKET.SELF);
        } catch (err) {
            console.error("Payment failed:", err);
        } finally {
            setIsProcessing(false);
        }
    };

    // ── Loading / not found ───────────────────────────────────────────────────

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                Loading event…
            </div>
        );
    }

    if (!event) return null;

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div className="min-h-screen relative pt-20 overflow-hidden max-w-7xl mx-auto px-6 xl:px-12 text-white">
            {/* Page Header */}
            <div className="max-w-7xl mx-auto flex justify-between flex-wrap items-center">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
                        <Tag className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-gray-300 text-xs font-medium tracking-wide uppercase">
                            {event.code}
                        </span>
                    </div>
                    <PageHeader
                        title="Book Your Tickets"
                        description="Select tickets and fill in attendee details"
                    />
                </div>
                <StepIndicator step={step} />
            </div>

            <EventBanner event={event} />

            {step === 1 && (
                <TicketDetailStep
                    event={event}
                    setTicketCounts={setTicketCounts}
                    attendees={attendees}
                    setAttendees={setAttendees}
                    nameError={nameError}
                    setNameError={setNameError}
                    subtotal={subtotal}
                    setStep={setStep}
                    getCount={getCount}
                    totalTickets={totalTickets}
                />
            )}

            {step === 2 && (
                <CheckoutStep
                    event={event}
                    attendees={attendees}
                    subtotal={subtotal}
                    platformFee={platformFee}
                    grandTotal={grandTotal}
                    paymentMethod={paymentMethod}
                    isProcessing={isProcessing}
                    onPaymentSelect={setPaymentMethod}
                    onBack={() => setStep(1)}
                    onPay={handlePay}
                />
            )}
        </div>
    );
};

// ── Checkout Step (extracted to keep the page component lean) ─────────────

interface CheckoutStepProps {
    event: Event;
    attendees: AttendeeEntry[];
    subtotal: number;
    platformFee: number;
    grandTotal: number;
    paymentMethod: string;
    isProcessing: boolean;
    onPaymentSelect: (m: string) => void;
    onBack: () => void;
    onPay: () => void;
}

const CheckoutStep = ({
    event,
    attendees,
    subtotal,
    platformFee,
    grandTotal,
    paymentMethod,
    isProcessing,
    onPaymentSelect,
    onBack,
    onPay,
}: CheckoutStepProps) => (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
        {/* Order Summary */}
        <section className="bg-white/3 rounded-2xl border border-white/10 p-5">
            <h3 className="text-white font-semibold text-base mb-4">Order Summary</h3>

            <ul className="space-y-2.5">
                {attendees.map((a, i) => (
                    <li
                        key={i}
                        className="flex items-center justify-between py-2 border-b border-white/6 last:border-0"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-white/8 flex items-center justify-center">
                                <User className="w-3.5 h-3.5 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-white text-sm font-medium">{a.name}</p>
                                <p className="text-gray-500 text-xs">{a.type} Ticket</p>
                            </div>
                        </div>
                        <span className="text-white text-sm font-semibold tabular-nums">
                            PKR {a.priceAmount.toLocaleString()}
                        </span>
                    </li>
                ))}
            </ul>

            {/* Price Breakdown */}
            <div className="mt-5 pt-4 border-t border-white/10 space-y-2 text-sm">
                <PriceLine label="Subtotal" value={`PKR ${subtotal.toLocaleString()}`} />
                <PriceLine
                    label={`Platform Fee (${event?.platform_fees_value}${event?.platform_fees_type === "percentage" ? "%" : " PKR"
                        })`}
                    value={`PKR ${platformFee.toLocaleString()}`}
                    muted
                />
                <div className="flex items-center justify-between pt-3 border-t border-white/8 mt-3">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-emerald-400 font-bold text-lg tabular-nums">
                        PKR {grandTotal.toLocaleString()}
                    </span>
                </div>
            </div>
        </section>

        {/* Payment Method */}
        <section className="bg-white/3 rounded-2xl border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-4 h-4 text-blue-400" />
                <h3 className="text-white font-semibold text-base">Payment Method</h3>
            </div>
            <PaymentMethodCard selected={paymentMethod} onSelect={onPaymentSelect} />
        </section>

        {/* Event Recap */}
        <div className="bg-white/3 rounded-2xl border border-white/10 p-4 flex items-center gap-4">
            <img
                src={getImageSrc(event?.image)}
                alt={event?.event_name}
                className="w-16 h-16 rounded-lg object-cover shrink-0"
            />
            <div className="min-w-0">
                <p className="text-white text-sm font-semibold truncate">{event?.event_name}</p>
                <p className="text-gray-500 text-xs">
                    {formatDate(event?.start_date ?? "")} – {formatDate(event?.end_date ?? "")} ·{" "}
                    {event.address ?? ""} {"-"} {event?.city ?? ""}
                </p>
            </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pb-8">
            <Button
                type="button"
                onClick={onBack}
                variant="secondary"
                className="flex-1"
                icon={<ChevronLeft className="w-4 h-4" />}
            >
                Back
            </Button>
            <Button
                type="button"
                onClick={onPay}
                disabled={isProcessing}
                variant="primary"
                icon={
                    isProcessing ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <CreditCard className="w-5 h-5" />
                    )
                }
                className="flex-1"
            >
                {isProcessing ? "Processing…" : `Pay PKR ${grandTotal.toLocaleString()}`}
            </Button>
        </div>
    </div>
);



export default TicketBookingPage;