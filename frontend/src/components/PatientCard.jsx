import { useNavigate } from "react-router-dom";

function PatientCard({ patient }) {
    const navigate = useNavigate();
    
    const {
        urgency_level,
        urgency_score,
        structured_summary,
        extracted_entities,
        created_at // Assuming your MongoDB backend sends this!
    } = patient;

    // Helper to format the MongoDB UTC timestamp into local time (e.g., "2:30 PM")
    const formattedTime = created_at 
        ? new Date(created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : "Just now";

    const getUrgencyStyles = (level) => {
        switch (level?.toLowerCase()) {
            case "high":
                return "bg-red-50 border-red-200 text-red-700 hover:border-red-300 hover:bg-red-100/50";
            case "medium":
                return "bg-yellow-50 border-yellow-200 text-yellow-800 hover:border-yellow-300 hover:bg-yellow-100/50";
            case "low":
                return "bg-green-50 border-green-200 text-green-800 hover:border-green-300 hover:bg-green-100/50";
            default:
                return "bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-100/50";
        }
    };

    const getBadgeColor = (level) => {
        switch (level?.toLowerCase()) {
            case "high": return "bg-red-500 shadow-red-500/50";
            case "medium": return "bg-yellow-500 shadow-yellow-500/50";
            case "low": return "bg-green-500 shadow-green-500/50";
            default: return "bg-gray-500 shadow-gray-500/50";
        }
    };

    const handleViewDetails = () => {
        // Route to the Result page, mocking the payload structure the Result page expects
        navigate('/result', { 
            state: { 
                triageData: {
                    original_text: "Historical record retrieved from database.",
                    analysis: patient
                } 
            } 
        });
    };

    return (
        <div className={`p-5 rounded-xl border-l-4 shadow-sm mb-4 transition-all duration-200 cursor-default ${getUrgencyStyles(urgency_level)}`}>
            
            {/* Header: Urgency and Time */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full shadow-sm animate-pulse ${getBadgeColor(urgency_level)}`}></div>
                    <h3 className="font-bold text-lg tracking-tight">
                        Urgency: {urgency_level} <span className="text-sm font-semibold opacity-75">({urgency_score}/100)</span>
                    </h3>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-60">
                        {formattedTime}
                    </span>
                    <button 
                        onClick={handleViewDetails}
                        className="text-sm font-bold underline decoration-2 underline-offset-2 opacity-80 hover:opacity-100 transition-opacity active:scale-95"
                    >
                        View Details
                    </button>
                </div>
            </div>

            {/* AI Summary */}
            <p className="text-sm font-medium opacity-90 mb-4 leading-relaxed line-clamp-2">
                {structured_summary}
            </p>

            {/* Entities Tags */}
            <div className="flex flex-wrap gap-2">
                {extracted_entities?.symptoms?.slice(0, 3).map((sym, i) => (
                    <span
                        key={i}
                        className="text-xs bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-black/10 font-bold shadow-sm"
                    >
                        {sym}
                    </span>
                ))}
                {extracted_entities?.symptoms?.length > 3 && (
                    <span className="text-xs bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-black/10 font-bold shadow-sm">
                        +{extracted_entities.symptoms.length - 3} more
                    </span>
                )}
            </div>
        </div>
    );
}

export default PatientCard;