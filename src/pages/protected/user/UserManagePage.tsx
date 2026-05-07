import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import type { User, UserFormData } from "../../../types";
import useUsersStore from "../../../store/user";
import TopHeader from "../../../components/shared/form/TopHeader"
import { Button, RadioGroup, ReactFormInput, Switch } from "../../../components/ui"
import { useNavigate, useParams } from "react-router-dom";
import { ROLE_OPTIONS } from "../../../utilities/const";
import { Mail, ShieldCheck, User as UserIcon } from "lucide-react";
import { Section } from "../../../components/shared/form";
import { ROUTES_PATHS } from "../../../routes/routes_path";


const DEFAULT_VALUES: UserFormData = {
    name: "",
    email: "",
    role: "",
    phone: "",
    isActive: true,
    password: "*System12345",
};


const UserManagePage = () => {
    const { addUser, updateUser, fetchUserById } = useUsersStore();
    const { user_id } = useParams<{ user_id?: string }>();
    const navigate = useNavigate()


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm<UserFormData>({
        defaultValues: DEFAULT_VALUES,
    });


    useEffect(() => {
        const loadForm = async () => {
            if (user_id) {
                const fetched = await fetchUserById(user_id as string);
                if (!fetched) {
                    navigate(ROUTES_PATHS.DASHBOARD.USERS.LIST)
                    return
                };


                reset(fetched);
            } else {
                reset(DEFAULT_VALUES)
            }
        };

        loadForm();
    }, [user_id, fetchUserById, reset, navigate]);




    const onSubmit = (data: UserFormData) => {
        const transformedData: Omit<User, "_id"> = {
            ...data,
        };

        if (user_id) {
            updateUser(user_id!, transformedData);
        } else {
            addUser(transformedData);
        }
    };


    return (
        <div className="text-white">
            <TopHeader
                title={(user_id ? "Edit" : "Add") + " User Information"}
                description={user_id ? "Update user details to keep your user up-to-date."
                    : "Fill the form to add a new user."}
            />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information Section */}
                <Section
                    title="Personal Information"
                    icon={<UserIcon />}
                    className="bg-linear-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20"
                >
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        <div>
                            <ReactFormInput
                                label="Enter Name"
                                type="text"
                                placeholder="John Doe"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && (
                                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>
                        <div>
                            <ReactFormInput
                                label="Enter Phone"
                                type="text"
                                placeholder="+92 300 1234567"
                                {...register("phone")}
                            />
                            {errors.phone && (
                                <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                            )}
                        </div>
                    </div>
                </Section>

                {/* Account Information Section */}
                <Section
                    title="Account Information"
                    icon={<Mail />}
                >
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                        <div>
                            <ReactFormInput
                                label="Enter Email"
                                type="email"
                                placeholder="user@example.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                            )}
                            {!user_id && (
                                <p className="text-xs text-gray-400 mt-1">
                                    A default password will be assigned: *System12345
                                </p>
                            )}
                        </div>
                    </div>
                </Section>

                {/* Role & Permissions Section */}

                <Section
                    title="Role & Permissions"
                    icon={<ShieldCheck />}
                >
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        <div>
                            <Controller
                                name="role"
                                control={control}
                                rules={{ required: "Role is required" }}
                                render={({ field }) => (
                                    <RadioGroup
                                        label="Select Role"
                                        options={ROLE_OPTIONS}
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.role && (
                                <p className="text-red-400 text-sm mt-1">{errors.role.message}</p>
                            )}
                        </div>
                        <div className="flex items-end">
                            <Controller
                                name="isActive"
                                control={control}
                                render={({ field }) => (
                                    <div className="w-full">
                                        <Switch
                                            label="User Active Status"
                                            checked={field.value}
                                            onChange={field.onChange}
                                        />
                                        <p className="text-xs text-gray-400 mt-1">
                                            {field.value
                                                ? "User can access the system"
                                                : "User account is deactivated"}
                                        </p>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </Section>

                {/* </div> */}

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 pb-8">
                    <Button variant="secondary" size="lg" type="submit" className="min-w-50">
                        {user_id ? "Update" : "Save"} User
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default UserManagePage