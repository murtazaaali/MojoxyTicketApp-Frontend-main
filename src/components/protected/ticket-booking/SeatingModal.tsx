import type { Event } from "../../../types";


const SeatingModal = ({
    setShowSeatingModal,
    event
}: {
    setShowSeatingModal: React.Dispatch<React.SetStateAction<boolean>>;
    event: Event
}) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
            onClick={() => setShowSeatingModal(false)}
        >
            <div
                className="relative max-w-6xl w-full bg-gray-950 rounded-2xl border border-white/10 overflow-hidden animate-[scaleIn_0.3s_ease]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-5 border-b border-white/10">
                    <div>
                        <h3 className="text-white font-bold text-lg">Seating Layout</h3>
                        <p className="text-gray-400 text-sm mt-0.5">
                            {event?.event_name} • {event?.city}
                        </p>
                    </div>
                    <button
                        onClick={() => setShowSeatingModal(false)}
                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-5 max-h-[calc(100vh-200px)] overflow-auto">
                    <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10">
                        <img
                            src={
                                event.overview_image instanceof File
                                    ? URL.createObjectURL(event.overview_image)
                                    : event.overview_image
                            }
                            alt="Seating layout overview"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                    <p className="text-sm text-gray-400 mt-4 text-center">
                        Use this layout to help you choose your preferred seating section
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SeatingModal
