import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon } from "lucide-react";
import { ROUTES_PATHS } from "../../../routes/routes_path";
import type { User } from "../../../types"
import useUsersStore from "../../../store/user";
import { Badge, Button } from "../../../components/ui";
import DataTable from "../../../components/shared/table/DataTable";

const UserList = () => {
    const navigate = useNavigate();

    const {
        users,
        fetchUsers,
        deleteUser,
    } = useUsersStore();


    const handleDelete = (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this user?");
        if (!confirm) return
        deleteUser(id);
    }

    return (
        <DataTable<User>
            title='Users List'
            description="Manage and view all registered users"
            buttonTitle="Create New User"
            addPath={ROUTES_PATHS?.DASHBOARD?.USERS?.FORM("")}
            data={users}
            isFetched={false}
            fetchData={fetchUsers}

            columns={[
                {
                    title: "User",
                    render: (u) => (
                        <div className="flex flex-col items-center">
                            <span className="font-medium text-gray-800 dark:text-white/90">
                                {u?.name}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {u?.role}
                            </span>
                        </div>
                    ),
                },
                {
                    title: "Email",
                    render: (u) => u?.email,
                },
                {
                    title: "Phone",
                    render: (u) => u?.phone,
                },
                {
                    title: "Status",
                    render: (u) => (
                        <Badge>
                            {u.isActive ? "ACTIVE" : "BLOCKED"}
                        </Badge>
                    ),
                },
                {
                    title: "Actions",
                    render: (u) => (
                        <div className="flex justify-center gap-2">
                            <Button size="sm" variant="ghost" onClick={() => navigate(ROUTES_PATHS?.DASHBOARD?.USERS?.FORM(u?._id))}>
                                <PencilIcon className="h-4 w-4" />
                                Edit
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(String(u?._id))}
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

export default UserList;
