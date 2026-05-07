import type { RefUser } from '../../../types'
import { CheckCircle, Mail, XCircle } from 'lucide-react'

const GRID_BG = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4="

const OrgHeroSection = ({ user }: { user: RefUser }) => {
    const initial = user?.name?.charAt(0).toUpperCase()
    const isActive = user?.isActive

    return (
        <div className="relative mb-12">
            <div
                className="absolute inset-0 opacity-30"
                style={{ backgroundImage: `url('${GRID_BG}')` }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">

                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <div className="w-32 h-32 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold text-white shadow-2xl shadow-purple-500/50">
                            {initial}
                        </div>
                        {isActive && (
                            <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 border-4 border-black">
                                <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <h1 className="text-4xl font-bold text-white mb-2">{user?.name}</h1>

                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
                                Event Organizer
                            </span>
                            {isActive ? (
                                <span className="flex items-center gap-1 text-green-400 text-sm">
                                    <CheckCircle className="w-4 h-4" /> Active
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-gray-400 text-sm">
                                    <XCircle className="w-4 h-4" /> Inactive
                                </span>
                            )}
                        </div>


                        <div className="flex flex-col gap-2 text-gray-400">
                            <a
                                href={`mailto:${user?.email}`}
                                className="flex items-center gap-2 hover:text-purple-400 transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                {user?.email}
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OrgHeroSection