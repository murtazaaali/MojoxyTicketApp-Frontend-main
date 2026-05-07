import { Controller, type Control } from "react-hook-form";
import Switch from "../../ui/Switch";

interface SwitchFieldProps {
    name: "approved" | "is_featured";
    label: string;
    activeText: string;
    inactiveText: string;
    control: Control<any>;
}

const SwitchField = ({ name, label, activeText, inactiveText, control }: SwitchFieldProps) => (
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <div className="w-full flex items-end">
                <div>
                    <Switch label={label} checked={field.value} onChange={field.onChange} />
                    <p className="text-xs text-gray-400 mt-1">{field.value ? activeText : inactiveText}</p>
                </div>
            </div>
        )}
    />
);


export default SwitchField
