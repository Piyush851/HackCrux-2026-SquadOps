import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { triageService } from "../services/triageService";

function Intake() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    description: "",
    notes: "",
    audioFile: null,
    report: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAudioChange = (e) => {
    setFormData((prev) => ({ ...prev, audioFile: e.target.files[0] }));
  };

  const handleReportChange = (e) => {
    setFormData((prev) => ({ ...prev, report: e.target.files[0] }));
  };

  const submitData = async (e) => {
    e.preventDefault();
    
    // 1. THE FIX: Strict Pre-Flight Check!
    // Check if the actual text fields are completely blank
    const isTextEmpty = !formData.description.trim() && !formData.notes.trim();
    
    // If there is no audio, no pdf, AND no text, block the submission instantly!
    if (!formData.audioFile && !formData.report && isTextEmpty) {
      setError("Please provide clinical notes, an audio file, or a PDF report.");
      return; // EXIT EARLY: The loading spinner never triggers!
    }

    // Now it is safe to start the loading sequence
    setIsLoading(true);
    setError(null);

    try {
      let response;

      // Logic routing
      if (formData.audioFile) {
        response = await triageService.processAudio(formData.audioFile);
      } 
      else if (formData.report) {
        response = await triageService.processReport(formData.report);
      } 
      else {
        // Only combine the text if we know it actually has content
        const combinedText = `Title: ${formData.description}\nClinical Notes: ${formData.notes}`.trim();
        response = await triageService.processText(combinedText);
      }

      // Route to the result page with the AI data
      if (response) {
         navigate('/result', { state: { triageData: response } });
      }

    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred while communicating with the AI.");
    } finally {
      // 2. THE FIX: Ensure the spinner ALWAYS turns off, even if it fails
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100 mb-10 animate-fade-in">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
        Patient Intake Portal
      </h2>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 font-semibold border border-red-200 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {error}
        </div>
      )}

      <form onSubmit={submitData} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description / Title</label>
          <input
            type="text"
            name="description"
            placeholder="e.g. Chronic back pain"
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Clinical Notes</label>
          <textarea
            name="notes"
            rows="4"
            placeholder="Enter detailed observations, patient history, or current symptoms..."
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        {/* Dedicated Audio Upload Area */}
        <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-bold text-blue-800">Voice Recording (Audio Upload)</label>
            <span className="text-[10px] bg-blue-200 text-blue-800 px-2 py-1 rounded-full uppercase tracking-wider font-bold">Whisper AI</span>
          </div>
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioChange}
            className="block w-full text-sm text-blue-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer bg-white p-2 rounded-xl border border-blue-200 transition-colors"
          />
          <p className="text-xs text-blue-600 mt-2 font-medium">Upload an MP3 or WAV file of the patient consultation or doctor's notes.</p>
        </div>

        {/* Dedicated PDF Upload Area */}
        <div className="border-2 border-dashed border-gray-200 p-6 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-colors">
          <label className="block text-sm font-bold text-gray-700 mb-2 text-center">Medical Reports & Scans (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleReportChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full font-bold py-4 rounded-xl shadow-md transition-all duration-200 flex justify-center items-center gap-2 ${
            isLoading 
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed scale-95' 
              : 'bg-slate-900 text-white hover:bg-slate-800 hover:-translate-y-1 hover:shadow-xl active:scale-95'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing via AI Pipeline...
            </>
          ) : (
            "Analyze & Process Records"
          )}
        </button>
      </form>
    </div>
  );
}

export default Intake;