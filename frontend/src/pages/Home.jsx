import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="text-center py-20">

      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        AI Powered Intelligent Triage System
      </h1>

      <p className="text-gray-600 max-w-xl mx-auto mb-8">
        This system helps healthcare professionals prioritize
        patients by analyzing symptoms using AI.
      </p>

      <Link
        to="/intake"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Start Patient Intake
      </Link>

    </div>
  )
}

export default Home