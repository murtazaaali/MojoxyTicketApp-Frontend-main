
import type { TicketVerifyResult } from '../../../types'

const TicketVerifyEmptyState = ({
    result
}: {
    result: TicketVerifyResult | null
}
) => {
    return (
        <div className="bg-linear-to-br from-red-900/30 to-red-800/20 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 animate-fadeIn">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center animate-scaleIn">
                    <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>

            {/* Error Message */}
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">Verification Failed</h2>
                <p className="text-red-400 text-lg">{result?.message || "Unable to verify ticket"}</p>
            </div>

        </div>
    )
}

export default TicketVerifyEmptyState
