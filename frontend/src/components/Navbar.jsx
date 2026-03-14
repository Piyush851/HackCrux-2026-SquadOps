import { Link, useLocation } from "react-router-dom"

function Navbar() {
  const location = useLocation();

  // Helper to highlight the active link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-card mx-4 mt-4 px-6 py-4 border-none shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
        
        {/* Brand/Logo Section */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
            S
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-800">
            SquadOps<span className="text-teal-600">Triage</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-8 mt-4 md:mt-0 font-medium text-sm">
          {[
            { name: "Home", path: "/" },
            { name: "Dashboard", path: "/dashboard" },
            { name: "Intake", path: "/intake" },
            { name: "About", path: "/about" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-all duration-200 relative pb-1 hover:text-teal-600 ${
                isActive(link.path) 
                  ? "text-teal-600 border-b-2 border-teal-600" 
                  : "text-slate-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

      </div>
    </nav>
  )
}

export default Navbar