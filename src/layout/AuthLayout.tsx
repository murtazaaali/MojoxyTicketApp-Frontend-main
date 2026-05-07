import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div className="flex bg-black flex-col min-h-screen ">

            <main className="flex-1 bg-linear-to-br  p-1 sm:p-6 lg:p-6">
                <div className="max-w-screen-2xl mx-auto">
                    <Outlet />
                </div>
            </main>

        </div>
    )
}

export default AuthLayout
