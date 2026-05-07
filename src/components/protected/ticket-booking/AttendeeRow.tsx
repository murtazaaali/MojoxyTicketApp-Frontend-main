import { Trash2 } from "lucide-react";
import type { AttendeeEntry } from "../../../types";

const inputClass =
    "w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm rounded-lg px-3 py-2 outline-none transition-colors focus:border-emerald-500/50 focus:bg-white/10";

const AttendeeRow = ({
    index,
    attendee,
    onChange,
    onRemove,
    isLast,
}: {
    index: number;
    attendee: AttendeeEntry;
    onChange: (field: keyof AttendeeEntry, val: string) => void;
    onRemove: () => void;
    isLast: boolean;
}) => {
    const isVip = attendee.type?.toLowerCase() === "vip";

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start animate-[fadeIn_0.25s_ease] py-2">

            {/* Index */}
            <div className="md:col-span-1 flex md:justify-center">
                <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${isVip
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-emerald-500/20 text-emerald-400"
                        }`}
                >
                    {index + 1}
                </div>
            </div>

            {/* Inputs (responsive grid) */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                    type="text"
                    value={attendee.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    placeholder="Attendee name"
                    className={inputClass}
                />

                <input
                    type="text"
                    value={attendee.cnic || ""}
                    onChange={(e) => onChange("cnic", e.target.value)}
                    placeholder="CNIC (xxxxx-xxxxxxx-x)"
                    className={inputClass}
                />

                <input
                    type="email"
                    value={attendee.email || ""}
                    onChange={(e) => onChange("email", e.target.value)}
                    placeholder="Email"
                    className={inputClass}
                />

                <input
                    type="text"
                    value={attendee.phone || ""}
                    onChange={(e) => onChange("phone", e.target.value)}
                    placeholder="Phone"
                    className={inputClass}
                />
            </div>

            {/* Type */}
            <div className="md:col-span-1 flex md:justify-center">
                <span
                    className={`text-xs font-semibold px-2 py-1 rounded-md ${isVip
                            ? "bg-amber-500/15 text-amber-400"
                            : "bg-white/10 text-gray-400"
                        }`}
                >
                    {attendee.type}
                </span>
            </div>

            {/* Price */}
            <div className="md:col-span-2 flex md:justify-end">
                <span className="text-gray-400 text-xs tabular-nums">
                    {attendee.priceAmount}
                </span>
            </div>

            {/* Delete */}
            <div className="md:col-span-1 flex md:justify-end">
                <button
                    type="button"
                    onClick={onRemove}
                    disabled={isLast}
                    className="text-gray-500 hover:text-red-400 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default AttendeeRow;