import { useLocation, useNavigate } from "react-router-dom";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Activity, 
  FileText, 
  Printer, 
  ArrowLeft 
} from "lucide-react";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const triageData = location.state?.triageData;

  // Premium Empty State
  if (!triageData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No Report Found</h2>
          <p className="text-slate-500 mb-8">It looks like there is no active patient data to display. Please submit a new intake form.</p>
          <button 
            onClick={() => navigate('/intake')} 
            className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Go to Intake Portal
          </button>
        </div>
      </div>
    );
  }

  // Defensive Destructuring: Always provide fallback values for AI data
  const { original_text = "No original text provided.", analysis = {} } = triageData;
  const { 
    urgency_level = "Unknown", 
    urgency_score = 0, 
    structured_summary = "No summary available.", 
    extracted_entities = {} 
  } = analysis;

  const symptoms = extracted_entities.symptoms || [];
  const riskIndicators = extracted_entities.risk_indicators || [];
  const timeline = extracted_entities.timeline || [];

  // Enhanced Theme Configuration
  const getTheme = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': 
        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', bar: 'bg-red-500', icon: <AlertTriangle /> };
      case 'medium': 
        return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', bar: 'bg-orange-500', icon: <Activity /> };
      case 'low': 
        return { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', bar: 'bg-teal-500', icon: <CheckCircle /> };
      default: 
        return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', bar: 'bg-slate-500', icon: <Clock /> };
    }
  };

  const theme = getTheme(urgency_level);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Top Action Bar */}
      <div className="flex justify-between items-center print:hidden">
        <button 
          onClick={() => navigate('/intake')} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium transition-colors"
        >
          <ArrowLeft size={20} /> Process Another Patient
        </button>
        <button 
          onClick={() => window.print()} 
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-sm font-medium"
        >
          <Printer size={18} /> Print Report
        </button>
      </div>

      {/* Main Urgency Banner */}
      <div className={`${theme.bg} ${theme.border} border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm`}>
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-full bg-white shadow-sm ${theme.text}`}>
            {theme.icon}
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">Triage Priority</h2>
            <div className={`text-4xl font-black capitalize ${theme.text}`}>
              {urgency_level}
            </div>
          </div>
        </div>

        {/* Visual Score Bar */}
        <div className="w-full md:w-64 bg-white p-4 rounded-xl shadow-sm border border-white/50">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-slate-500">Urgency Score</span>
            <span className={`text-2xl font-black ${theme.text}`}>{urgency_score}<span className="text-sm text-slate-400">/100</span></span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-3 rounded-full ${theme.bar} transition-all duration-1000 ease-out`} 
              style={{ width: `${Math.min(Math.max(urgency_score, 0), 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Entities */}
        <div className="space-y-6">
          <div className="bg-white shadow-sm p-6 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="text-blue-500" size={20} />
              Identified Symptoms
            </h3>
            <ul className="space-y-2">
              {symptoms.length > 0 ? symptoms.map((sym, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                  {sym}
                </li>
              )) : (
                <li className="text-sm italic text-slate-400">None detected</li>
              )}
            </ul>
          </div>

          <div className="bg-white shadow-sm p-6 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={20} />
              Risk Indicators
            </h3>
            <ul className="space-y-2">
              {riskIndicators.length > 0 ? riskIndicators.map((risk, i) => (
                <li key={i} className="flex items-start gap-2 text-red-600 font-medium bg-red-50 px-3 py-2 rounded-lg">
                  <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                  {risk}
                </li>
              )) : (
                <li className="text-sm italic text-slate-400">None detected</li>
              )}
            </ul>
          </div>
          
          <div className="bg-white shadow-sm p-6 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Clock className="text-orange-500" size={20} />
              Timeline Events
            </h3>
            <ul className="space-y-2">
              {timeline.length > 0 ? timeline.map((time, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0"></span>
                  {time}
                </li>
              )) : (
                <li className="text-sm italic text-slate-400">None detected</li>
              )}
            </ul>
          </div>
        </div>

        {/* Right Column: Summaries */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-blue-50/50 shadow-sm p-8 rounded-2xl border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
              <FileText className="text-blue-500" size={20} />
              AI Structured Summary
            </h3>
            <p className="text-slate-700 leading-relaxed text-lg">
              {structured_summary}
            </p>
          </div>

          <div className="bg-slate-50 shadow-sm p-8 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <FileText className="text-slate-400" size={20} />
              Original Extracted Text
            </h3>
            <div className="bg-white p-4 rounded-xl border border-slate-200 max-h-64 overflow-y-auto custom-scrollbar">
              <p className="text-slate-500 text-sm whitespace-pre-wrap font-mono">
                {original_text}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Result;