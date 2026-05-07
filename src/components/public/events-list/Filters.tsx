import { Calendar, Filter, Search } from "lucide-react";
import { Button, Card, Input, Select } from "../../ui";
import { EVENT_CATEGORIES } from "../../../utilities/const";

interface FiltersProps {
    search: string;
    category: string;
    date: string;
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onDateChange: (value: string) => void;
    onClear: () => void;
}

const Filters = ({
    search,
    category,
    date,
    onSearchChange,
    onCategoryChange,
    onDateChange,
    onClear,
}: FiltersProps) => {
    return (
        <div className="mb-8">
            <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

                    {/* SEARCH */}
                    <Input
                        icon={<Search size={16} />}
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />

                    {/* CATEGORY */}
                    <Select
                        icon={<Filter className="w-4 h-4" />}
                        value={category}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        options={[
                            { label: "All Categories", value: "" },
                            ...EVENT_CATEGORIES,
                        ]}
                    />

                    {/* DATE */}
                    <Select
                        icon={<Calendar className="w-4 h-4" />}
                        value={date}
                        onChange={(e) => onDateChange(e.target.value)}
                        options={[
                            { value: "all", label: "Any Date" },
                            { value: "today", label: "Today" },
                            { value: "week", label: "This Week" },
                            { value: "month", label: "This Month" },
                            { value: "upcoming", label: "Upcoming" },
                        ]}
                    />

                    {/* CLEAR */}
                    <Button fullWidth variant="secondary" onClick={onClear}>
                        Clear
                    </Button>

                </div>
            </Card>
        </div>
    );
};

export default Filters;