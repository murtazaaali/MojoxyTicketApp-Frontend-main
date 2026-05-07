import { Check } from "lucide-react";

const Feature = ({ text }: { text: string }) => (
    <div className="flex items-center gap-2">
        <Check className="w-4 h-4 text-green-500" />
        <span>{text}</span>
    </div>
);

export default Feature;