import { useMemo, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Calendar, Check, CreditCard, Percent, TicketIcon, User, Plus, Trash2 } from "lucide-react";
import type { Ticket, TicketFormData } from "../types";
import useUsersStore from "../store/user";
import useEventsStore from "../store/event";
import usePlatformPricingStore from "../store/platform_pricing";
import { FilterUpcomingEvents } from "../utilities/functions";
import { PAYMENT_METHODS, PAYMENT_STATUS, TICKET_STATUS } from "../utilities/const";
import { Button, ReactFormInput, SearchSelect, Select } from "../components/ui";
import { Section, FieldError, PriceLine } from "../components/shared/form";


interface TicketFormProps {
    ticket?: Ticket | null;
    onSubmit: (data: TicketFormData, grandTotal: number) => void | Promise<void>;
    isAdminTicket?: boolean;
    isEditMode?: boolean;
}


const EMPTY_TICKET = {
    name: "",
    type: "",
    priceAmount: 0,

    cnic: "",
    email: "",
    phone: "",

    status: "active" as const,
};

const DEFAULT_FORM_VALUES: TicketFormData = {
    event: "",
    user: "",
    platform_fee_type: "",
    platform_fee_value: 0,
    tickets: [EMPTY_TICKET],
    payment_status: "pending",
    payment_method: "",
    status: "booked",
    total_amount: 0,
};






// ─── Main Component ───────────────────────────────────────────────────────────

const TicketForm = ({
    ticket,
    onSubmit,
    isAdminTicket = false,
    isEditMode = false,
}: TicketFormProps) => {
    const [isEventSearching, setIsEventSearching] = useState(false);
    const [isUserSearching, setIsUserSearching] = useState(false);

    const { users, fetchUsers } = useUsersStore();
    const { events, fetchEvents } = useEventsStore();
    const { platform_pricing, fetchPlatformPricing, isFetched: isPlatformPricingFetched } = usePlatformPricingStore();

    const { register, handleSubmit, formState: { errors }, reset, control, setValue, watch } =
        useForm<TicketFormData>({ defaultValues: DEFAULT_FORM_VALUES });

    const { fields: ticketFields, append, remove, replace } = useFieldArray({ control, name: "tickets" });

    // ─── Effects ─────────────────────────────────────────────────────────────

    useEffect(() => {
        fetchEvents();
        if (isAdminTicket) {
            fetchUsers();
            if (!isPlatformPricingFetched) fetchPlatformPricing();
        }
    }, [isAdminTicket, fetchUsers, fetchEvents, fetchPlatformPricing, isPlatformPricingFetched]);

    useEffect(() => {
        if (!ticket) {
            reset(DEFAULT_FORM_VALUES);
            replace([EMPTY_TICKET]);
            return;
        }

        reset({
            user: ticket.user?._id ?? null,
            event: ticket.event?._id ?? null,
            platform_fee_type: ticket.platform_fee_type ?? "",
            platform_fee_value: ticket.platform_fee_value ?? 0,
            payment_status: ticket.payment_status ?? "pending",
            payment_method: ticket.payment_method ?? "",
            status: ticket.status ?? "booked",
            total_amount: ticket.total_amount ?? 0,
        });

        replace(
            ticket.tickets.map((t) => ({
                name: t.name ?? "",
                type: t.type ?? "",
                priceAmount: t.priceAmount ?? 0,

                cnic: t.cnic ?? "",
                email: t.email ?? "",
                phone: t.phone ?? "",

                status: t.status ?? "active",
            }))
        );
    }, [ticket, reset, replace]);

    // Auto-fill platform fee value when fee type changes
    useEffect(() => {
        const platformFeeType = watch("platform_fee_type");
        if (!platformFeeType || !platform_pricing.length) return;

        const match = platform_pricing.find((p) => p.commission_type === platformFeeType);
        if (match) setValue("platform_fee_value", match.value);
    }, [watch("platform_fee_type"), platform_pricing, setValue]);

    // ─── Derived State ────────────────────────────────────────────────────────

    const ticketsData = watch("tickets");
    const platformFeeValue = watch("platform_fee_value");
    const platformFeeType = watch("platform_fee_type");
    const selectedEventId = watch("event");

    const selectedEvent = useMemo(
        () => events.find((e) => String(e._id) === String(selectedEventId)) ?? null,
        [selectedEventId, events]
    );

    const upcomingEvents = useMemo(() => FilterUpcomingEvents(events), [events]);

    const subtotal = ticketsData.reduce((sum, t) => sum + (t.priceAmount || 0), 0);
    const calculatedPlatformFee =
        platformFeeType === "percentage" ? (subtotal * platformFeeValue) / 100 : platformFeeValue;
    const grandTotal = subtotal + calculatedPlatformFee;

    // ─── Handlers ─────────────────────────────────────────────────────────────

    const handleEventSearch = async (query: string) => {
        setIsEventSearching(true);
        await fetchEvents(query);
        setIsEventSearching(false);
    };

    const handleUserSearch = async (query: string) => {
        setIsUserSearching(true);
        await fetchUsers(query);
        setIsUserSearching(false);
    };

    const handleFormSubmit = (data: TicketFormData) => onSubmit(data, grandTotal);

    const handleTicketTypeChange = (index: number, type: string) => {
        const price = selectedEvent?.prices.find((p) => p.type === type);
        if (price) setValue(`tickets.${index}.priceAmount`, price.amount, { shouldValidate: true });
    };

    // ─── Render ───────────────────────────────────────────────────────────────

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">

            {/* Booking Details */}
            <Section
                title="Booking Details"
                icon={<User className="w-5 h-5" />}
                className="bg-linear-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20"
            >
                <div className={`grid grid-cols-1 gap-x-6 gap-y-5 ${isAdminTicket ? "lg:grid-cols-2" : ""}`}>
                    {isAdminTicket && (
                        <div>
                            <Controller
                                name="user"
                                control={control}
                                rules={{ required: "User is required" }}
                                render={({ field }) => (
                                    <SearchSelect
                                        label="Select User"
                                        icon={<User className="w-4 h-4" />}
                                        placeholder="Search users..."
                                        options={users.map((u) => ({
                                            value: String(u._id),
                                            label: u.name,
                                            sublabel: u.email,
                                            badge: u.role,
                                        }))}
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                        onSearch={handleUserSearch}
                                        isLoading={isUserSearching}
                                        emptyMessage="No users found"
                                    />
                                )}
                            />
                            <FieldError message={errors.user?.message} />
                        </div>
                    )}

                    <div>
                        <Controller
                            name="event"
                            control={control}
                            rules={{ required: "Event is required" }}
                            render={({ field }) => (
                                <SearchSelect
                                    label="Select Event"
                                    icon={<Calendar className="w-4 h-4" />}
                                    placeholder="Search events..."
                                    options={upcomingEvents.map((e) => ({
                                        value: String(e._id),
                                        label: e.event_name,
                                        sublabel: e.start_date,
                                        badge: e.code,
                                    }))}
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                    onSearch={handleEventSearch}
                                    isLoading={isEventSearching}
                                    emptyMessage="No upcoming events found"
                                />
                            )}
                        />
                        <FieldError message={errors.event?.message} />
                    </div>
                </div>
            </Section>

            {/* Ticket Details */}
            <Section title="Ticket Details">
                <div className="flex items-center justify-between mb-4 -mt-2">
                    <span />
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => append(EMPTY_TICKET)}
                        className="flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Ticket
                    </Button>
                </div>

                {/* Available ticket type badges */}
                {selectedEvent && (
                    <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-blue-300 text-xs font-medium mb-2">Available Ticket Types:</p>
                        <div className="flex flex-wrap gap-2">
                            {selectedEvent.prices.map((price) => (
                                <span
                                    key={price._id ?? price.type}
                                    className="bg-blue-500/20 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-500/30"
                                >
                                    {price.type} — PKR {price.amount.toLocaleString()}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Ticket rows */}
                <div className="space-y-4">
                    {ticketFields.map((field, index) => (
                        <div key={field.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="flex items-start justify-between mb-3">
                                <h4 className="text-sm font-medium text-gray-300">Ticket {index + 1}</h4>
                                {ticketFields.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => remove(index)}
                                        className="text-red-400 hover:text-red-300 flex items-center gap-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Remove
                                    </Button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-3">
                                {/* Attendee Name */}
                                {/* Attendee Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                        Attendee Name
                                    </label>
                                    <ReactFormInput
                                        type="text"
                                        placeholder="John Doe"
                                        {...register(`tickets.${index}.name`, {
                                            required: "Attendee name is required",
                                        })}
                                    />
                                    <FieldError message={errors.tickets?.[index]?.name?.message} />
                                </div>

                                {/* CNIC */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                        CNIC
                                    </label>
                                    <ReactFormInput
                                        type="text"
                                        placeholder="12345-1234567-1"
                                        {...register(`tickets.${index}.cnic`, {
                                            required: "CNIC is required",
                                            pattern: {
                                                value: /^\d{5}-\d{7}-\d{1}$/,
                                                message: "Invalid CNIC format",
                                            },
                                        })}
                                    />
                                    <FieldError message={errors.tickets?.[index]?.cnic?.message} />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                        Email
                                    </label>
                                    <ReactFormInput
                                        type="email"
                                        placeholder="example@mail.com"
                                        {...register(`tickets.${index}.email`, {
                                            required: "Email is required",
                                        })}
                                    />
                                    <FieldError message={errors.tickets?.[index]?.email?.message} />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                        Phone
                                    </label>
                                    <ReactFormInput
                                        type="text"
                                        placeholder="03xxxxxxxxx"
                                        {...register(`tickets.${index}.phone`, {
                                            required: "Phone is required",
                                        })}
                                    />
                                    <FieldError message={errors.tickets?.[index]?.phone?.message} />
                                </div>

                                {/* Ticket Type */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">Ticket Type</label>
                                    <div className="relative">
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 w-5 h-5 text-gray-400 pointer-events-none">▼</div>
                                        <select
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none cursor-pointer"
                                            {...register(`tickets.${index}.type`, {
                                                required: "Ticket type is required",
                                                onChange: (e) => handleTicketTypeChange(index, e.target.value),
                                            })}
                                        >
                                            <option value="" className="bg-zinc-900">Select ticket type</option>
                                            {selectedEvent?.prices.map((price) => (
                                                <option key={price.type} value={price.type} className="bg-zinc-900">
                                                    {price.type} (PKR {price.amount.toLocaleString()})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <FieldError message={errors.tickets?.[index]?.type?.message} />
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Price (PKR)</label>
                                    <ReactFormInput
                                        type="number"
                                        placeholder="0"
                                        {...register(`tickets.${index}.priceAmount`, {
                                            required: "Price is required",
                                            valueAsNumber: true,
                                            min: { value: 0, message: "Price must be 0 or more" },
                                        })}
                                        className="w-full"
                                    />
                                    <FieldError message={errors.tickets?.[index]?.priceAmount?.message} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty state */}
                {ticketFields.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                        <p className="mb-3">No tickets added yet</p>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => append(EMPTY_TICKET)}
                            className="flex items-center gap-2 mx-auto"
                        >
                            <Plus className="w-4 h-4" />
                            Add Your First Ticket
                        </Button>
                    </div>
                )}

                {/* Price Summary */}
                {ticketFields.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                        <PriceLine label={`Subtotal (${ticketFields.length} ticket${ticketFields.length > 1 ? "s" : ""})`} value={subtotal} />
                        <PriceLine label="Platform Fee" value={calculatedPlatformFee} />
                        <div className="flex items-center justify-between pt-3 border-t border-white/8 mt-3">
                            <span className="text-white font-bold">Total Amount</span>
                            <span className="text-emerald-400 font-bold text-lg tabular-nums">PKR {grandTotal.toLocaleString()}</span>
                        </div>
                    </div>
                )}
            </Section>

            {/* Platform Fee — admin only */}
            {isAdminTicket && (
                <Section title="Platform Fee">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        <div>
                            <Controller
                                name="platform_fee_type"
                                control={control}
                                rules={{ required: "Platform fee type is required" }}
                                render={({ field }) => (
                                    <Select
                                        label="Select Platform Fee Type"
                                        icon={<Percent className="w-4 h-4" />}
                                        options={[
                                            { value: "", label: "Select Platform Fee Type" },
                                            ...platform_pricing.map((p) => ({
                                                value: p.commission_type,
                                                label: `${p.commission_type} (${p.value}${p.commission_type === "percentage" ? "%" : " PKR"})`,
                                            })),
                                        ]}
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            <FieldError message={errors.platform_fee_type?.message} />
                        </div>
                        <div>
                            <ReactFormInput
                                label="Platform Fee Value"
                                type="number"
                                value={String(platformFeeValue)}
                                readOnly
                                className="bg-white/3"
                            />
                            <p className="text-xs text-gray-500 mt-1">Calculated: PKR {calculatedPlatformFee.toLocaleString()}</p>
                        </div>
                    </div>
                </Section>
            )}

            {/* Payment Details — admin only */}
            {isAdminTicket && (
                <Section title="Payment Details">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-3">
                        <div>
                            <Controller
                                name="payment_method"
                                control={control}
                                rules={{ required: "Payment method is required" }}
                                render={({ field }) => (
                                    <Select
                                        label="Select Payment Method"
                                        icon={<CreditCard className="w-4 h-4" />}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={[
                                            { value: "", label: "Select Payment Method" },
                                            ...PAYMENT_METHODS.map((pm) => ({ value: String(pm.value), label: String(pm.label) })),
                                        ]}
                                    />
                                )}
                            />
                            <FieldError message={errors.payment_method?.message} />
                        </div>

                        <div>
                            <Controller
                                name="payment_status"
                                control={control}
                                rules={{ required: "Payment status is required" }}
                                render={({ field }) => (
                                    <Select
                                        label="Select Payment Status"
                                        icon={<Check className="w-4 h-4" />}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={PAYMENT_STATUS}
                                    />
                                )}
                            />
                            <FieldError message={errors.payment_status?.message} />
                        </div>

                        <div>
                            <Controller
                                name="status"
                                control={control}
                                rules={{ required: "Ticket status is required" }}
                                render={({ field }) => (
                                    <Select
                                        label="Select Ticket Status"
                                        icon={<TicketIcon className="w-4 h-4" />}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={TICKET_STATUS}
                                    />
                                )}
                            />
                            <FieldError message={errors.status?.message} />
                        </div>
                    </div>
                </Section>
            )}

            {/* Submit */}
            <div className="flex justify-end pb-8">
                <Button variant="secondary" size="lg" type="submit" className="min-w-50">
                    {isEditMode ? "Update" : "Save"} Ticket
                </Button>
            </div>
        </form>
    );
};



export default TicketForm;