import { useNavigate } from 'react-router-dom'



const OrgNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Organizer not found</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="text-purple-400 hover:text-purple-300"
                >
                    Go back
                </button>
            </div>
        </div>
    )
}

export default OrgNotFound
