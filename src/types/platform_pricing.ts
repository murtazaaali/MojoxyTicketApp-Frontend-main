export interface PlatformPricing {
  _id?: string;
  commission_type: "percentage" | "flat" | "fixed";
  value: number;
}

export type PlatformPricingFormData = Omit<PlatformPricing, "_id">;
