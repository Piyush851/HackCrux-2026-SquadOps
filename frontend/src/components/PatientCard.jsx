function PatientCard({ patient }) {
    const {
        urgency_level,
        urgency_score,
        structured_summary,
        extracted_entities,
    } = patient;

    const getUrgencyStyles = (level) => {
        switch (level?.toLowerCase()) {
            case "high":
                return "bg-red-50 border-red-200 text-red-700";
            case "medium":
                return "bg-yellow-50 border-yellow-200 text-yellow-700";
            case "low":
                return "bg-green-50 border-green-200 text-green-700";
            default:
                return "bg-gray-50 border-gray-200 text-gray-700";
        }
    };

    const getBadgeColor = (level) => {
        switch (level?.toLowerCase()) {
            case "high":
                return "bg-red-500";
            case "medium":
                return "bg-yellow-500";
            case "low":
                return "bg-green-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <div
            className={`p-5 rounded-xl border-l-4 shadow-sm mb-4 transition-all hover:shadow-md ${getUrgencyStyles(urgency_level)}`}
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <div
                        className={`w-3 h-3 rounded-full animate-pulse ${getBadgeColor(urgency_level)}`}
                    ></div>
                    <h3 className="font-bold text-lg">
                        Urgency: {urgency_level} ({urgency_score}/100)
                    </h3>
                </div>
                <button className="text-sm font-semibold underline opacity-80 hover:opacity-100">
                    View Details
                </button>
            </div>

            <p className="text-sm font-medium opacity-90 mb-3">
                {structured_summary}
            </p>

            <div className="flex flex-wrap gap-2">
                {extracted_entities?.symptoms?.slice(0, 3).map((sym, i) => (
                    <span
                        key={i}
                        className="text-xs bg-white/60 px-2 py-1 rounded-md border border-black/10 font-medium"
                    >
                        {sym}
                    </span>
                ))}
                {extracted_entities?.symptoms?.length > 3 && (
                    <span className="text-xs bg-white/60 px-2 py-1 rounded-md border border-black/10 font-medium">
                        +{extracted_entities.symptoms.length - 3} more
                    </span>
                )}
            </div>
        </div>
    );
}

export default PatientCard;
