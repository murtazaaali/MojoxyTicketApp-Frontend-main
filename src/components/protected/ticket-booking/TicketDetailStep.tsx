
import { AlertCircle, ChevronRight } from 'lucide-react';
import type { AttendeeEntry, Event, EventPrice } from '../../../types';
import { AttendeeRow, PriceCard } from './index'
import { removeAttendee, updateAttendeeField } from '../../../utilities/ticket_helper';
import { Button } from '../../ui';

const TicketDetailStep = ({ event, setTicketCounts, attendees, setAttendees, nameError,
    setNameError, getCount, totalTickets, subtotal, setStep }: {
        event: Event;
        setTicketCounts: React.Dispatch<React.SetStateAction<Record<string, number>>>;
        attendees: AttendeeEntry[];
        setAttendees: React.Dispatch<React.SetStateAction<AttendeeEntry[]>>;
        nameError: boolean;
        setNameError: React.Dispatch<React.SetStateAction<boolean>>;
        getCount: (type: string) => number;
        totalTickets: number;
        subtotal: number;
        setStep: React.Dispatch<React.SetStateAction<1 | 2>>;
    }) => {

    const increment = (price: EventPrice) => {
        const current = getCount(price.type);
        if (current >= price.capacity) return;
        setTicketCounts((prev) => ({ ...prev, [price.type]: current + 1 }));
        setAttendees((prev) => [
            ...prev,
            {
                name: "",
                type: price.type,
                priceAmount: price.amount,
                cnic: "",
                email: "",
                phone: "",
            }
        ]);
    };

    const decrement = (price: EventPrice) => {
        const current = getCount(price.type);
        if (current <= 0) return;
        setTicketCounts((prev) => ({ ...prev, [price.type]: current - 1 }));
        // remove last attendee of this type
        setAttendees((prev) => {
            const idx = [...prev].reverse().findIndex((a) => a.type === price.type);
            if (idx === -1) return prev;
            const realIdx = prev.length - 1 - idx;
            return prev.filter((_, i) => i !== realIdx);
        });
    };

    const goToCheckout = () => {
        if (totalTickets === 0) return;
        const hasEmpty = attendees.some((a) =>
            !a.name.trim() ||
            !a.cnic?.trim() ||
            !a.email?.trim() ||
            !a.phone?.trim()
        );
        if (hasEmpty) {
            setNameError(true);
            return;
        }
        setNameError(false);
        setStep(2);
    };

    return (
        <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
            <div className="bg-white/3 rounded-2xl border border-white/10 p-5">
                <h3 className="text-white font-semibold text-base mb-1">
                    Select Ticket Type
                </h3>
                <p className="text-gray-500 text-xs mb-4">
                    Choose how many tickets of each type you need
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                    {event?.prices.map((price) => (
                        <PriceCard
                            key={price._id || price.type}
                            price={price}
                            count={getCount(price.type)}
                            onInc={() => increment(price)}
                            onDec={() => decrement(price)}
                        />
                    ))}
                </div>
            </div>
            {attendees.length > 0 && (
                <div className="bg-white/3 rounded-2xl border border-white/10 p-5">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white font-semibold text-base">
                            Attendee Details
                        </h3>
                        <span className="text-xs text-gray-500">
                            {attendees.length} ticket{attendees.length > 1 ? "s" : ""}
                        </span>
                    </div>
                    <p className="text-gray-500 text-xs mb-4">
                        Enter a name for each ticket holder
                    </p>

                    {nameError && (
                        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-3">
                            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                            <p className="text-red-400 text-xs">
                                Please fill in all attendee names before proceeding.
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col gap-2.5">
                        {attendees.map((a, i) => (
                            <AttendeeRow
                                key={i}
                                index={i}
                                attendee={a}
                                onChange={(field, val) =>
                                    updateAttendeeField(i, field, val, setAttendees)
                                }
                                onRemove={() => removeAttendee(i, attendees, setAttendees, setTicketCounts)}
                                isLast={attendees.length === 1}
                            />
                        ))}
                    </div>


                </div>
            )}
            {totalTickets > 0 && (
                <div className="flex items-center justify-between bg-white/4 border border-white/8 rounded-xl px-5 py-3">
                    <span className="text-gray-400 text-sm">
                        {totalTickets} ticket{totalTickets > 1 ? "s" : ""} selected
                    </span>
                    <span className="text-white font-bold">{subtotal}</span>
                </div>
            )}
            <Button
                type="button"
                onClick={goToCheckout}
                disabled={totalTickets === 0}
                icon={<ChevronRight className="w-5 h-5" />}
                variant="primary"
                className="w-full text-white disabled:bg-gray-700  disabled:cursor-not-allowed  "
            >
                Continue to Checkout
            </Button>
        </div>

    )
}

export default TicketDetailStep
