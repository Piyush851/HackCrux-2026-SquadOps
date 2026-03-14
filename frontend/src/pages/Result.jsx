import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract the data passed from Intake.jsx
  const triageData = location.state?.triageData;

  // Fallback if someone navigates here directly without submitting data
  if (!triageData) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">No data found</h2>
        <button onClick={() => navigate('/intake')} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          Go back to Intake
        </button>
      </div>
    );
  }

  const { original_text, analysis } = triageData;
  const { urgency_level, urgency_score, structured_summary, extracted_entities } = analysis;

  // Determine badge color based on urgency
  const getUrgencyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header & Urgency Bar */}
      <div className="bg-white shadow-lg p-6 rounded-2xl border border-gray-100 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Triage Result</h2>
        <div className={`px-6 py-2 rounded-full border-2 font-bold text-lg ${getUrgencyColor(urgency_level)}`}>
          Urgency: {urgency_level} ({urgency_score}/100)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Entities (Takes up 1/3 space) */}
        <div className="space-y-6">
          <div className="bg-white shadow p-6 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Identified Symptoms</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {extracted_entities.symptoms?.map((sym, i) => <li key={i}>{sym}</li>)}
              {extracted_entities.symptoms?.length === 0 && <span className="text-sm italic">None detected</span>}
            </ul>
          </div>

          <div className="bg-white shadow p-6 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Risk Indicators</h3>
            <ul className="list-disc pl-5 space-y-1 text-red-600 font-medium">
              {extracted_entities.risk_indicators?.map((risk, i) => <li key={i}>{risk}</li>)}
              {extracted_entities.risk_indicators?.length === 0 && <span className="text-sm italic text-gray-500">None detected</span>}
            </ul>
          </div>
          
          <div className="bg-white shadow p-6 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Timeline Events</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {extracted_entities.timeline?.map((time, i) => <li key={i}>{time}</li>)}
              {extracted_entities.timeline?.length === 0 && <span className="text-sm italic">None detected</span>}
            </ul>
          </div>
        </div>

        {/* Right Column: Summaries (Takes up 2/3 space) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-blue-50 shadow p-6 rounded-2xl border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-3 border-b border-blue-200 pb-2">AI Structured Summary</h3>
            <p className="text-blue-800 leading-relaxed text-lg">
              {structured_summary}
            </p>
          </div>

          <div className="bg-gray-50 shadow p-6 rounded-2xl border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-3 border-b border-gray-300 pb-2">Original Extracted Text</h3>
            <p className="text-gray-500 text-sm whitespace-pre-wrap font-mono">
              {original_text}
            </p>
          </div>
        </div>

      </div>
      
      <div className="text-center pt-4">
        <button onClick={() => navigate('/intake')} className="text-gray-500 hover:text-gray-800 font-semibold underline">
          Process another patient
        </button>
      </div>

    </div>
  );
}

export default Result;