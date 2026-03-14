import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Intake from "./pages/Intake"
import Result from "./pages/Result"
import About from "./pages/About"

function App() {
  return (
    <BrowserRouter>
      {/* The outer div ensures the theme background covers the full screen.
        We use 'min-h-screen' so the background doesn't cut off on short pages.
      */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
        
        <Navbar />

        {/* Main Content Container 
          'fade-in' is the CSS animation we added to index.css
        */}
        <main className="max-w-7xl mx-auto p-4 md:p-8 fade-in">
          
          <div className="mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/intake" element={<Intake />} />
              <Route path="/result" element={<Result />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>

        </main>

        {/* Optional: Footer or Spacer for a finished look */}
        <footer className="py-10 text-center text-gray-400 text-sm">
          © 2026 SquadOps Health-Tech Solutions
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App