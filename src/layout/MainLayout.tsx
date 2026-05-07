import { Outlet } from "react-router";
import * as Comp from "../components/shared";

const MainLayout = () => {
    return (
        <div className="flex bg-black flex-col min-h-screen ">
            <Comp.Header />

            <main className="flex-1 bg-linear-to-br  p-1 sm:p-6 lg:p-6">
                <div className="max-w-screen-2xl mx-auto">
                    <Outlet />
                </div>
            </main>

            <Comp.Footer />
        </div>
    );
};

export default MainLayout;