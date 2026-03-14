import { useState } from "react"

function Intake() {
  // 1. Expand state to hold all your new data types
  const [formData, setFormData] = useState({
    description: "",
    notes: "",
    transcript: "",
    report: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, report: e.target.files[0] }))
  }

  const submitData = (e) => {
    e.preventDefault()
    // This logs the object containing all inputs
    console.log("Submitting Data:", formData)
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
        Patient Intake Portal
      </h2>

      <form onSubmit={submitData} className="space-y-6">
        
        {/* Short Description Input */}
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

        {/* Detailed Clinical Notes */}
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

        {/* Speech/Transcription Area */}
        <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-blue-800">Voice Transcription (Speech)</label>
            <span className="text-[10px] bg-blue-200 text-blue-800 px-2 py-1 rounded-full uppercase tracking-wider">AI Powered</span>
          </div>
          <textarea
            name="transcript"
            rows="3"
            placeholder="Transcribed text from doctor's recordings..."
            className="w-full border border-blue-200 p-3 rounded-xl bg-white focus:ring-2 focus:ring-blue-400 outline-none"
            value={formData.transcript}
            onChange={handleChange}
          />
        </div>

        {/* File Upload for Reports */}
        <div className="border-2 border-dashed border-gray-200 p-6 rounded-2xl hover:bg-gray-50 transition-colors">
          <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">Medical Reports & Scans (PDF/Images)</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 shadow-lg shadow-green-200 transition-all transform active:scale-95"
        >
          Analyze & Process Records
        </button>
      </form>
    </div>
  )
}

export default Intake