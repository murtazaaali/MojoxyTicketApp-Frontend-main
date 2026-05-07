import { Outlet } from "react-router";

const AppLayout = () => {
    return (
        <div className="flex flex-1 flex-col antialiased">
            <Outlet />
        </div>
    );
};

export default AppLayout;