import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Calendar, MapPin, Plus, Tag, Trash2 } from "lucide-react";
import type { EventFormData } from "../types";
import { CITIESLIST, EVENT_CATEGORIES, EVENT_TYPES, MAP_REGEX_PATTERN } from "../utilities/const";
import { PageHeader } from "../components/shared";
import { Button, ReactFormInput, ReactFormTextArea, Select, ImageUpload } from "../components/ui";
import { FieldError, Section } from "../components/shared/form";


interface EventFormProps {
    defaultValues: EventFormData;
    onSubmit: (data: EventFormData) => void;
    title: string;
    description: string;
    submitText: string;
}


const IMAGE_FIELDS = [
    { name: "image" as const, label: "Event Image", uploadLabel: "Upload Event Image" },
    { name: "overview_image" as const, label: "Overview Image", uploadLabel: "Upload Overview Image" },
];

const toOptions = (list: { value: unknown; label: unknown }[]) =>
    list.map(({ value, label }) => ({ value: String(value), label: String(label) }));



const UserEventForm = ({ defaultValues, onSubmit, title, description, submitText }: EventFormProps) => {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<EventFormData>({ defaultValues });

    const { fields: priceFields, append, remove } = useFieldArray({ control, name: "prices" });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const venueLink = watch("venue_link");

    return (
        <div className="min-h-screen relative pt-20 overflow-hidden max-w-7xl mx-auto px-6 xl:px-12 text-white">
            <PageHeader title={title} description={description} />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* Basic Information */}
                <Section
                    title="Basic Information"
                    className="bg-linear-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20"
                >
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        <div>
                            <ReactFormInput label="Event Name" type="text" {...register("event_name", { required: "Event name is required" })} />
                            <FieldError message={errors.event_name?.message} />
                        </div>
                        <div>
                            <ReactFormInput label="Organizer Name" type="text" {...register("comp_name")} />
                            <FieldError message={errors.comp_name?.message} />
                        </div>
                    </div>
                </Section>

                {/* Date & Time */}
                <Section title="Date & Time">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        {(
                            [
                                { label: "Start Date", field: "start_date" as const, type: "date" },
                                { label: "End Date", field: "end_date" as const, type: "date" },
                                { label: "Start Time", field: "start_time" as const, type: "time" },
                                { label: "End Time", field: "end_time" as const, type: "time" },
                            ] as const
                        ).map(({ label, field, type }) => (
                            <div key={field}>
                                <ReactFormInput label={label} type={type} {...register(field, { required: `${label} is required` })} />
                                <FieldError message={errors[field]?.message} />
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Event Details */}
                <Section title="Event Details">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        <div>
                            <Controller
                                name="event_type"
                                control={control}
                                rules={{ required: "Event type is required" }}
                                render={({ field }) => (
                                    <Select
                                        label="Event Type"
                                        icon={<Calendar className="w-4 h-4" />}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={[{ value: "", label: "Select Event Type" }, ...toOptions(EVENT_TYPES)]}
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
                                        label="Category"
                                        icon={<Tag className="w-4 h-4" />}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={[{ value: "", label: "Select Category" }, ...toOptions(EVENT_CATEGORIES)]}
                                    />
                                )}
                            />
                            <FieldError message={errors.categ?.message} />
                        </div>

                        <div>
                            <ReactFormInput label="Address" type="text" {...register("address", { required: "Address is required" })} />
                            <FieldError message={errors.address?.message} />
                        </div>

                        <div>
                            <Controller
                                name="city"
                                control={control}
                                rules={{ required: "City is required" }}
                                render={({ field }) => (
                                    <Select
                                        label="City"
                                        icon={<MapPin className="w-4 h-4" />}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={[{ value: "", label: "Select City" }, ...toOptions(CITIESLIST ?? [])]}
                                    />
                                )}
                            />
                        </div>

                        <div>
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
                            <ReactFormTextArea label="Description" {...register("description")} />
                            <FieldError message={errors.description?.message} />
                        </div>
                    </div>
                </Section>

                {/* Images */}
                {IMAGE_FIELDS.map(({ name, label, uploadLabel }) => (
                    <Section key={name} title={label}>
                        <Controller
                            name={name}
                            control={control}
                            render={({ field }) => (
                                <ImageUpload
                                    label={uploadLabel}
                                    value={field.value}
                                    onChange={(file) => setValue(name, file, { shouldValidate: true, shouldDirty: true })}
                                    error={errors[name]?.message}
                                />
                            )}
                        />
                    </Section>
                ))}

                {/* Pricing */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white/90">Event Pricing</h3>
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => append({ type: "", amount: 1, capacity: 1 })}
                            className="flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Price Tier
                        </Button>
                    </div>

                    {priceFields.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                            <p className="mb-3">No price tiers added yet</p>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => append({ type: "Standard", amount: 1, capacity: 1 })}
                                className="flex items-center gap-2 mx-auto"
                            >
                                <Plus className="w-4 h-4" />
                                Add Your First Price Tier
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {priceFields.map((field, index) => (
                                <div key={field.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                    <div className="flex items-start justify-between mb-3">
                                        <h4 className="text-sm font-medium text-gray-300">Price Tier {index + 1}</h4>
                                        {priceFields.length > 1 && (
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

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {(
                                            [
                                                { label: "Ticket Type", key: "type" as const, placeholder: "e.g. Standard", rules: { required: "Type is required" } },
                                                { label: "Price (PKR)", key: "amount" as const, placeholder: "Amount", rules: { required: "Amount is required", min: 1 } },
                                                { label: "Capacity", key: "capacity" as const, placeholder: "Capacity", rules: { required: "Capacity is required", min: 1 } },
                                            ] as const
                                        ).map(({ label, key, placeholder, rules }) => (
                                            <div key={key}>
                                                <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
                                                <ReactFormInput
                                                    type={key === "type" ? "text" : "number"}
                                                    placeholder={placeholder}
                                                    {...register(`prices.${index}.${key}`, rules)}
                                                />
                                                <FieldError message={errors.prices?.[index]?.[key]?.message} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit */}
                <div className="flex justify-end pb-8">
                    <Button variant="secondary" size="lg" type="submit" className="min-w-50">
                        {submitText}
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default UserEventForm;