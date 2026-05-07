import { QrCode } from "lucide-react"
import type { TicketDetail } from "../../../types"


const SelfTicketCardModel = ({
    event_name,
    selectedTicket,
    setShowQRModal
}: {
    event_name: string,
    selectedTicket: TicketDetail,
    setShowQRModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
            onClick={() => setShowQRModal(false)}
        >
            <div
                className="bg-gray-900 rounded-2xl border border-white/20 w-full max-w-3xl max-h-[90vh] overflow-auto sm:overflow-hideen"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="bg-linear-to-r from-emerald-500/20 to-blue-500/20 border-b border-white/10 p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/30 flex items-center justify-center">
                                <QrCode className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                            </div>
                            <h3 className="text-white font-bold text-base sm:text-lg">Event Ticket</h3>
                        </div>
                        <button
                            onClick={() => setShowQRModal(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm truncate">{event_name}</p>
                </div>

                {/* Modal Body: Flex layout for QR + Details */}
                <div className="flex flex-col sm:flex-row p-3 sm:p-6 gap-4 sm:gap-6">
                    {/* Left Side: Ticket Details */}
                    <div className="flex-1 space-y-3">
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <p className="text-gray-400 text-xs sm:text-sm mb-1">Ticket Holder</p>
                            <p className="text-white font-semibold">{selectedTicket.name}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                <p className="text-gray-400 text-xs sm:text-sm mb-1">Ticket Type</p>
                                <p className="text-white font-medium">{selectedTicket.type}</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                <p className="text-gray-400 text-xs sm:text-sm mb-1">Price</p>
                                <p className="text-emerald-400 font-bold">{selectedTicket.priceAmount}</p>
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <p className="text-gray-400 text-xs sm:text-sm mb-1">Ticket Code</p>
                            <p className="text-white font-mono text-xs sm:text-sm truncate">{selectedTicket.code}</p>
                        </div>


                    </div>

                    {/* Right Side: QR Code */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-62.5 sm:max-w-75 w-full">
                            <img
                                src={selectedTicket.qr_code}
                                alt="Ticket QR Code"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="bg-white/5 border-t border-white/10 p-2 sm:p-4">
                    <p className="text-gray-400 text-xs text-center sm:text-sm">
                        Present this QR code at the event entrance for scanning
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SelfTicketCardModel
