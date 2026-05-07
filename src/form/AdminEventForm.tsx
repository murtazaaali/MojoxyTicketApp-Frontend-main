import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Calendar, CheckCircle, MapPin, Tag, User, Plus, Trash2, Percent } from "lucide-react";
import type { EventFormData } from "../types";
import { CITIESLIST, EVENT_CATEGORIES, EVENT_STATUS, EVENT_TYPES, MAP_REGEX_PATTERN } from "../utilities/const";
import { Button, ReactFormInput, ReactFormTextArea, Select, ImageUpload, SearchSelect } from "../components/ui";
import { FieldError, Section, SwitchField } from "../components/shared/form";
import TopHeader from "../components/shared/form/TopHeader";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UserOption {
    value: string;
    label: string;
    sublabel: string;
    badge: string;
}

export interface PlatformFeeOption {
    value: string;
    label: string;
}

interface AdminEventFormProps {
    defaultValues: EventFormData;
    onSubmit: (data: EventFormData) => void;
    title: string;
    description: string;
    submitText: string;
    userOptions: UserOption[];
    platformFeeOptions: PlatformFeeOption[];
    isUserSearching?: boolean;
    onUserSearch: (query: string) => Promise<void>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const toSelectOptions = (list: { value: string | number; label: string }[], placeholder: string) => [
    { value: "", label: placeholder },
    ...list.map((item) => ({ value: String(item.value), label: String(item.label) })),
];

const EMPTY_PRICE_TIER = { type: "", amount: 0, capacity: 1 };

const DATE_TIME_FIELDS = [
    { label: "Enter Start Date", field: "start_date", type: "date" },
    { label: "Enter End Date", field: "end_date", type: "date" },
    { label: "Enter Start Time", field: "start_time", type: "time" },
    { label: "Enter End Time", field: "end_time", type: "time" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

const AdminEventForm = ({
    defaultValues,
    onSubmit,
    title,
    description,
    submitText,
    userOptions,
    platformFeeOptions,
    isUserSearching = false,
    onUserSearch,
}: AdminEventFormProps) => {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<EventFormData>({ defaultValues });

    const { fields: priceFields, append, remove } = useFieldArray({ control, name: "prices" });

    const venueLink = watch("venue_link");

    return (
        <div className="text-white">
            <TopHeader title={title} description={description} />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* ── Admin Controls ── */}
                <Section
                    title="Admin Controls"
                    className="bg-linear-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20"
                >
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
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
                                        options={userOptions}
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                        onSearch={onUserSearch}
                                        isLoading={isUserSearching}
                                        emptyMessage="No users found"
                                    />
                                )}
                            />
                            <FieldError message={errors.user?.message} />
                        </div>

                        <SwitchField
                            name="approved"
                            control={control}
                            label="Event Approval"
                            activeText="Event is approved and visible to users"
                            inactiveText="Event requires approval"
                        />
                        <SwitchField
                            name="is_featured"
                            control={control}
                            label="Featured Event"
                            activeText="Event is featured and visible to users"
                            inactiveText="Event is not featured"
                        />
                    </div>
                </Section>

                {/* ── Basic Information ── */}
                <Section title="Basic Information">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        <div>
                            <ReactFormInput
                                label="Enter Event Name"
                                type="text"
                                {...register("event_name", { required: "Event name is required" })}
                            />
                            <FieldError message={errors.event_name?.message} />
                        </div>
                        <div>
                            <ReactFormInput label="Enter Organizer Name" type="text" {...register("comp_name")} />
                            <FieldError message={errors.comp_name?.message} />
                        </div>
                    </div>
                </Section>

                {/* ── Date & Time ── */}
                <Section title="Date & Time">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        {DATE_TIME_FIELDS.map(({ label, field, type }) => (
                            <div key={field}>
                                <ReactFormInput
                                    label={label}
                                    type={type}
                                    {...register(field, { required: `${label.replace("Enter ", "")} is required` })}
                                />
                                <FieldError message={errors[field]?.message} />
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ── Event Details ── */}
                <Section title="Event Details">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        <div>
                            <Controller
                                name="event_type"
                                control={control}
                                rules={{ required: "Event type is required" }}
                                render={({ field }) => (
                                    <Select
                                        label="Select Event Type"
                                        icon={<Calendar className="w-4 h-4" />}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={toSelectOptions(EVENT_TYPES, "Select Event Type")}
                                    />
                                )}
                            />
                            <FieldError message={errors.event_type?.message} />
                        </div>

                        <div>
                            <Controller
                                name="categ"
                                control={control}
                                rules={{ required: "Category is required" }}
                                render={({ field }) => (
                                    <Select
                                        label="Select Category"
                                        icon={<Tag className="w-4 h-4" />}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={toSelectOptions(EVENT_CATEGORIES, "Select Category")}
                                    />
                                )}
                            />
                            <FieldError message={errors.categ?.message} />
                        </div>

                        <div>
                            <Controller
                                name="status"
                                control={control}
                                rules={{ required: "Status is required" }}
                                render={({ field }) => (
                                    <Select
                                        label="Select Status"
                                        icon={<CheckCircle className="w-4 h-4" />}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={toSelectOptions(EVENT_STATUS, "Select Event Status")}
                                    />
                                )}
                            />
                            <FieldError message={errors.status?.message} />
                        </div>

                        <div>
                            <ReactFormInput label="Address" type="text" {...register("address", { required: "Address is required" })} />
                            <FieldError message={errors.address?.message} />
                        </div>

                        <div>
                            <Controller
                                name="city"
                                control={control}
                                rules={{ required: "Category is required" }}
                                render={({ field }) => (
                                    <Select
                                        label="Select City"
                                        icon={<MapPin className="w-4 h-4" />}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={toSelectOptions(CITIESLIST ?? [], "Select City")}
                                    />
                                )}
                            />
                            <FieldError message={errors.city?.message} />
                        </div>

                        <div className="lg:col-span-2">
                            <ReactFormInput
                                label="Google Maps Venue Link"
                                type="url"
                                placeholder="https://www.google.com/maps/..."
                                {...register("venue_link", {
                                    pattern: {
                                        value: MAP_REGEX_PATTERN,
                                        message: "Enter a valid Google Maps URL",
                                    },
                                })}
                            />
                            <FieldError message={errors.venue_link?.message} />
                            {venueLink && (
                                <a
                                    href={venueLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 underline mt-2 block text-sm transition-colors"
                                >
                                    Open Venue in Google Maps →
                                </a>
                            )}
                        </div>

                        <div className="lg:col-span-2">
                            <ReactFormTextArea label="Enter Description" {...register("description")} />
                            <FieldError message={errors.description?.message} />
                        </div>
                    </div>
                </Section>

                {/* ── Platform Fees ── */}
                <Section title="Platform Fees">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        <div>
                            <Controller
                                name="platform_fees_type"
                                control={control}
                                rules={{ required: "Platform fee type is required" }}
                                render={({ field }) => (
                                    <Select
                                        label="Select Platform Fee Type"
                                        icon={<Percent className="w-4 h-4" />}
                                        options={platformFeeOptions}
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            <FieldError message={errors.platform_fees_type?.message} />
                        </div>
                        <div>
                            <ReactFormInput
                                label="Platform Fee Value"
                                type="number"
                                {...register("platform_fees_value", { required: "Platform fee value is required" })}
                            />
                            <FieldError message={errors.platform_fees_value?.message} />
                        </div>
                    </div>
                </Section>

                {/* ── Images ── */}
                {(["image", "overview_image"] as const).map((name) => (
                    <Section key={name} title={name === "image" ? "Event Image" : "Overview Image"}>
                        <Controller
                            name={name}
                            control={control}
                            render={({ field }) => (
                                <ImageUpload
                                    value={field.value}
                                    onChange={(file) => setValue(name, file, { shouldValidate: true, shouldDirty: true })}
                                    error={errors[name]?.message}
                                    label={name === "image" ? "Upload Event Image" : "Upload Overview Image"}
                                />
                            )}
                        />
                    </Section>
                ))}

                {/* ── Event Pricing ── */}
                <Section title="Event Pricing">
                    <div className="mb-4 -mt-2 flex items-center justify-between">
                        <span />
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => append(EMPTY_PRICE_TIER)}
                            className="flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Add Price Tier
                        </Button>
                    </div>

                    {priceFields.length === 0 ? (
                        <div className="py-8 text-center text-gray-400">
                            <p className="mb-3">No price tiers added yet</p>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => append({ type: "Standard", amount: 0, capacity: 1 })}
                                className="mx-auto flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Add Your First Price Tier
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {priceFields.map((field, index) => (
                                <div key={field.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
                                    <div className="mb-3 flex items-start justify-between">
                                        <h4 className="text-sm font-medium text-gray-300">Price Tier {index + 1}</h4>
                                        {priceFields.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => remove(index)}
                                                className="flex items-center gap-1 text-red-400 hover:text-red-300"
                                            >
                                                <Trash2 className="w-4 h-4" /> Remove
                                            </Button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-gray-300">Ticket Type</label>
                                            <ReactFormInput
                                                type="text"
                                                placeholder="e.g., Standard, VIP, Student"
                                                {...register(`prices.${index}.type`, { required: "Ticket type is required" })}
                                            />
                                            <FieldError message={errors.prices?.[index]?.type?.message} />
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-gray-300">Price (PKR)</label>
                                            <ReactFormInput
                                                type="number"
                                                placeholder="0"
                                                {...register(`prices.${index}.amount`, {
                                                    required: "Price is required",
                                                    valueAsNumber: true,
                                                    min: { value: 0, message: "Price must be 0 or more" },
                                                })}
                                            />
                                            <FieldError message={errors.prices?.[index]?.amount?.message} />
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-gray-300">Capacity</label>
                                            <ReactFormInput
                                                type="number"
                                                placeholder="0"
                                                {...register(`prices.${index}.capacity`, {
                                                    required: "Capacity is required",
                                                    valueAsNumber: true,
                                                    min: { value: 1, message: "Capacity must be at least 1" },
                                                })}
                                            />
                                            <FieldError message={errors.prices?.[index]?.capacity?.message} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Section>

                {/* ── Submit ── */}
                <div className="flex justify-end pb-8">
                    <Button variant="secondary" size="lg" type="submit" className="min-w-50">
                        {submitText}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AdminEventForm;