const Brand = () => {
    return (
        <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
                <img
                    src="/images/logo-icon.png"
                    alt="Eventify Logo"
                    className="w-48 h-48 object-contain"
                    loading="lazy"
                    decoding="async"
                />
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
                Discover and book amazing events around the world.
            </p>
        </div>
    );
};

export default Brand;