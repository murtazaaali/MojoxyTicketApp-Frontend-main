import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon, BarChart3 } from "lucide-react";
import { ROUTES_PATHS } from "../../../routes/routes_path";
import type { Event } from "../../../types"
import useEventsStore from "../../../store/event";
import { Badge, Button } from "../../../components/ui";
import DataTable from "../../../components/shared/table/DataTable";

const EventList = ({ isUnapproved = false }: { isUnapproved?: boolean }) => {

    const navigate = useNavigate();

    const { events, fetchEvents, deleteEvent } = useEventsStore();

    const event_list = isUnapproved ? events.filter((e) => !e.approved) : events


    const handleDelete = (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this event?");
        if (!confirm) return
        deleteEvent(id)
    }

    return (
        <DataTable<Event>
            title={isUnapproved ? "Unapproved Events" : "All Events"}
            description={
                isUnapproved
                    ? "Review and approve pending events"
                    : "Manage and view all users events"
            }
            buttonTitle="Create New Event"
            addPath={ROUTES_PATHS?.DASHBOARD?.EVENTS?.FORM("")}
            data={event_list}
            isFetched={false}
            // fetchData={fetchEvents}
            fetchData={() =>
                fetchEvents("", "", "", false, isUnapproved)
            }
            columns={[

                {
                    title: "Code",
                    render: (event) => event?.code || "-",
                },
                {
                    title: "User",
                    render: (event) => (
                        <div className="flex flex-col items-center">
                            <span className="font-medium text-gray-800 dark:text-white/90">
                                {event?.user?.name || "-"}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {event?.user?.email || "-"}
                            </span>
                        </div>
                    ),
                },
                {
                    title: "Status",
                    render: (event) => event?.status?.toUpperCase() || "-",
                },
                {
                    title: "Is Approved",
                    render: (event) => (
                        <Badge>
                            {event?.approved ? "APPROVED" : "NOT APPROVED"}
                        </Badge>
                    ),
                },
                {
                    title: "Actions",
                    render: (event) => (
                        <div className="flex justify-center gap-2">
                            <Button size="sm" variant="ghost" onClick={() => navigate(ROUTES_PATHS?.DASHBOARD?.EVENTS?.INSIGHT(event?._id as string))}>
                                <BarChart3 className="h-4 w-4" />
                                Insight
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => navigate(ROUTES_PATHS?.DASHBOARD?.EVENTS?.FORM(event?._id))}>
                                <PencilIcon className="h-4 w-4" />
                                Edit
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(String(event?._id))}
                            >
                                <TrashIcon className="h-4 w-4" />
                                Delete
                            </Button>
                        </div>
                    ),
                },
            ]}
        />
    );
};

export default EventList;
