const COPYRIGHT_VALUES = [
    {
        title: 'Privacy'
    },
    {
        title: 'Terms'
    },
    {
        title: 'Cookies'
    }
]


const Copyright = () => {
    return (
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
                © 2026 Eventify. All rights reserved.
            </p>

            <div className="flex gap-6">
                {
                    COPYRIGHT_VALUES.map((i, idx) =>
                        <a key={idx} className="text-gray-500 hover:text-purple-500 text-sm transition-colors" href="#">
                            {i.title}
                        </a>
                    )
                }

            </div>
        </div>
    );
};

export default Copyright;