import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { triageService } from "../services/triageService";

function Intake() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 1. Updated state to hold the dedicated audio file
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

  // Handler for the Audio File
  const handleAudioChange = (e) => {
    setFormData((prev) => ({ ...prev, audioFile: e.target.files[0] }));
  };

  // Handler for the PDF Report
  const handleReportChange = (e) => {
    setFormData((prev) => ({ ...prev, report: e.target.files[0] }));
  };

  const submitData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let response;

      // Logic routing: We prioritize processing the Audio file first, then PDF, then text.
      if (formData.audioFile) {
        response = await triageService.processAudio(formData.audioFile);
      } 
      else if (formData.report) {
        response = await triageService.processReport(formData.report);
      } 
      else {
        const combinedText = `
          Title: ${formData.description}
          Clinical Notes: ${formData.notes}
        `.trim();
        
        if (!combinedText) throw new Error("Please provide clinical notes, an audio file, or a PDF report.");
        
        response = await triageService.processText(combinedText);
      }

      // Route to the result page with the AI data
      navigate('/result', { state: { triageData: response } });

    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred while communicating with the AI.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100 mb-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
        Patient Intake Portal
      </h2>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-semibold border border-red-200">
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
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
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
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        {/* --- NEW: Dedicated Audio Upload Area --- */}
        <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-bold text-blue-800">Voice Recording (Audio Upload)</label>
            <span className="text-[10px] bg-blue-200 text-blue-800 px-2 py-1 rounded-full uppercase tracking-wider">Whisper AI</span>
          </div>
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioChange}
            className="block w-full text-sm text-blue-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer bg-white p-2 rounded-xl border border-blue-200"
          />
          <p className="text-xs text-blue-600 mt-2">Upload an MP3 or WAV file of the patient consultation or doctor's notes.</p>
        </div>

        {/* --- UPDATED: Dedicated PDF Upload Area --- */}
        <div className="border-2 border-dashed border-gray-200 p-6 rounded-2xl hover:bg-gray-50 transition-colors">
          <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">Medical Reports & Scans (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleReportChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all transform active:scale-95 ${
            isLoading ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 shadow-green-200'
          }`}
        >
          {isLoading ? "Analyzing via AI Pipeline..." : "Analyze & Process Records"}
        </button>
      </form>
    </div>
  );
}

export default Intake;