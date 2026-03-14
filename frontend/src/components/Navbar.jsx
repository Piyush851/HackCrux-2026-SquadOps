import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [serverStatus, setServerStatus] = useState("checking...");

  // Helper to highlight the active link
  const isActive = (path) => location.pathname === path;

  // Hackathon Wow-Factor: Ping the Python backend health check route!
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/health");
        if (response.ok) {
          setServerStatus("online");
        } else {
          setServerStatus("offline");
        }
      } catch (error) {
        setServerStatus("offline");
      }
    };

    checkServerStatus();
    // Re-ping every 30 seconds to ensure the connection stays alive
    const interval = setInterval(checkServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Intake", path: "/intake" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md mx-4 mt-4 px-6 py-4 border border-slate-200 shadow-sm rounded-2xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand/Logo Section */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
            S
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-800 hidden sm:block">
            SquadOps<span className="text-teal-600">Triage</span>
          </h1>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 font-semibold text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-all duration-200 relative pb-1 hover:text-teal-600 ${
                isActive(link.path) 
                  ? "text-teal-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-teal-600 after:rounded-full" 
                  : "text-slate-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Server Status & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          
          {/* Live Server Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
            <span className={`relative flex h-2.5 w-2.5`}>
              {serverStatus === "online" && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                serverStatus === "online" ? "bg-green-500" : serverStatus === "checking..." ? "bg-yellow-500" : "bg-red-500"
              }`}></span>
            </span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              API: {serverStatus}
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-slate-100 flex flex-col gap-4 pb-2 animate-fade-in-down">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-semibold text-base transition-colors ${
                isActive(link.path) ? "text-teal-600 pl-2 border-l-2 border-teal-600" : "text-slate-600 pl-2"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-2 mt-2 pl-2">
             <span className={`inline-block rounded-full h-2.5 w-2.5 ${
                serverStatus === "online" ? "bg-green-500" : serverStatus === "checking..." ? "bg-yellow-500" : "bg-red-500"
              }`}></span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                API: {serverStatus}
              </span>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;