import { useEffect, useState } from "react";
import { Tag, Percent } from "lucide-react";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import type { PlatformPricing, PlatformPricingFormData } from "../../../types";
import usePlatformPricingStore from "../../../store/platform_pricing";
import TopHeader from "../../../components/shared/form/TopHeader"
import { Button, ReactFormInput, Select } from "../../../components/ui";
import { COMMISSION_TYPES } from "../../../utilities/const";

const CreatePlatformPricing = () => {
    const [platform_price, setPlatformPrcing] = useState<PlatformPricing | null>(null);
    const { addPlatformPricing, updatePlatformPricing, fetchPlatformPricingById } = usePlatformPricingStore();

    const { platform_id } = useParams<{ platform_id?: string }>();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm<PlatformPricingFormData>({
        defaultValues: {
            commission_type: "flat",
            value: 0,
        },
    });

    useEffect(() => {
        const updateForm = async () => {
            if (!platform_id) {
                setPlatformPrcing(null);
                reset({ commission_type: "flat", value: 0 });
                return;
            }

            const fetched = await fetchPlatformPricingById(platform_id);
            if (!fetched) return;

            setPlatformPrcing(fetched);
            reset({
                commission_type: fetched.commission_type || "flat",
                value: fetched.value || 0,
            });
        };

        updateForm();
    }, [platform_id, fetchPlatformPricingById, reset]);


    const onSubmit = (data: PlatformPricingFormData) => {

        const transformedData: Omit<PlatformPricing, "_id"> = {
            ...data,

        };

        if (platform_price) {
            updatePlatformPricing(platform_price._id!, transformedData);
        } else {
            addPlatformPricing(transformedData);
        }
    };

    return (
        <div className="text-white">
            <TopHeader
                title={(platform_id ? "Edit" : "Add") + "Platform Pricing"}
                description={platform_id ? "Update platform pricing details to keep your platform pricing up-to-date."
                    : "Fill the form to add a new platform pricing."}
            />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold mb-4 text-white/90 flex items-center gap-2">
                        <Percent className="w-5 h-5" />
                        Platform Pricing Controls
                    </h3>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        <div>
                            <Controller
                                name="commission_type"
                                control={control}
                                rules={{ required: "Commission type is required" }}
                                render={({ field }) => (
                                    <Select
                                        label="Select Commission Type"
                                        icon={<Tag className="w-4 h-4" />}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={COMMISSION_TYPES || []}
                                    />
                                )}
                            />
                            {errors.commission_type && (
                                <p className="text-red-400 text-sm mt-1">{errors.commission_type.message}</p>
                            )}
                        </div>
                        <div>
                            <ReactFormInput
                                label="Enter Commission Value"
                                type="number"
                                {...register("value", { required: "Commission value is required" })}
                            />
                            {errors.value && (
                                <p className="text-red-400 text-sm mt-1">{errors.value.message}</p>
                            )}
                        </div>
                    </div>
                </div>
                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 pb-8">
                    <Button variant="secondary" size="lg" type="submit" className="min-w-50">
                        {platform_price ? "Update" : "Save"} Platform Pricing
                    </Button>
                </div>

            </form>
        </div>
    )
}

export default CreatePlatformPricing
