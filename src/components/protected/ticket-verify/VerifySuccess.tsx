import type { TicketVerifyResult } from '../../../types'

const VerifySuccess = ({
    result
}: {
    result: TicketVerifyResult
}) => {
    return (
        <div className="bg-linear-to-br from-emerald-900/30 to-emerald-800/20 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30 animate-fadeIn">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
                <div className="relative">
                    <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-scaleIn">
                        <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
                </div>
            </div>

            {/* Success Message */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">✓ Ticket Verified!</h2>
                <p className="text-emerald-400 text-lg">{result.message}</p>
            </div>

            {/* Ticket Details */}
            <div className="bg-gray-900/50 rounded-xl p-6 space-y-4 border border-gray-700">
                <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                    <span className="text-gray-400 text-sm">Ticket Code</span>
                    <span className="text-white font-mono font-semibold">{result.data.code}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                    <span className="text-gray-400 text-sm">Name</span>
                    <span className="text-white font-medium">{result.data.name}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                    <span className="text-gray-400 text-sm">Ticket Type</span>
                    <span className="text-white font-medium capitalize">{result.data.type}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Event ID</span>
                    <span className="text-white font-mono text-sm">{result.data.event}</span>
                </div>
            </div>

            {/* Status Badge */}
            <div className="mt-6 text-center">
                <span className="inline-flex items-center px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/30">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                    Ticket Activated
                </span>
            </div>
        </div>
    )
}

export default VerifySuccess
