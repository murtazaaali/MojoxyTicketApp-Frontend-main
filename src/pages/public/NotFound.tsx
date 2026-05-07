import { Link } from "react-router";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6 text-center">
            <div className="max-w-md w-full">
                <h1 className="mb-6 text-5xl font-bold text-white">
                    404
                </h1>

                <h2 className="mb-4 text-2xl font-semibold text-white/90">
                    Page Not Found
                </h2>

                <p className="mb-6 text-gray-400 text-base sm:text-lg">
                    The page you are looking for does not exist.
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
