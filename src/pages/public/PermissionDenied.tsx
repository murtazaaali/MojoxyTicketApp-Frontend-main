import { Link } from "react-router";

export default function PermissionDenied() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6 text-center">
            <div className="max-w-md w-full">
                <h1 className="mb-6 text-3xl font-bold text-white">
                    ACCESS DENIED
                </h1>

                <p className="mb-6 text-gray-400 text-base sm:text-lg">
                    You do not have permission to view this page.
                </p>

                <Link
                    to="/"
                    className="inline-block px-6 py-3 rounded-lg bg-purple-900 text-white font-medium hover:bg-purple-800 transition-colors"
                >
                    Back to Home Page
                </Link>
            </div>

            <p className="mt-6 text-sm text-gray-400">
                &copy; {new Date().getFullYear()} - Mojoxy
            </p>
        </div>
    );
}
