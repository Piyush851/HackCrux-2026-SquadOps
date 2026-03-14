import { useState } from "react"

function Intake() {

  const [symptoms, setSymptoms] = useState("")

  const submitData = (e) => {
    e.preventDefault()
    console.log(symptoms)
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">

      <h2 className="text-3xl font-bold mb-6">
        Patient Intake
      </h2>

      <form onSubmit={submitData}>

        <textarea
          rows="5"
          placeholder="Enter patient symptoms..."
          className="w-full border p-3 rounded mb-4"
          value={symptoms}
          onChange={(e)=>setSymptoms(e.target.value)}
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Analyze
        </button>

      </form>

    </div>
  )
}

export default Intake