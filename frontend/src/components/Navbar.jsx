import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center">

        <h1 className="text-xl font-bold">
          SquadOps Triage
        </h1>

        <div className="flex gap-6 mt-2 md:mt-0">

          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>

          <Link to="/dashboard" className="hover:text-gray-200">
            Dashboard
          </Link>

          <Link to="/intake" className="hover:text-gray-200">
            Intake
          </Link>

          <Link to="/about" className="hover:text-gray-200">
            About
          </Link>

        </div>

      </div>

    </nav>
  )
}

export default Navbar