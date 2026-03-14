import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Intake from "./pages/Intake";
import Result from "./pages/Result";
import About from "./pages/About";
import Home from "./pages/Home"; // Assuming you have a Home page, or we can make one!

function App() {
  return (
    <Router>
      {/* The background color covers the whole screen, making the glassmorphism pop */}
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-teal-200 selection:text-teal-900">
        
        {/* The Navbar stays sticky at the top of every page */}
        <Navbar />

        {/* The main content area where your pages will render */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/intake" element={<Intake />} />
            <Route path="/result" element={<Result />} />
            <Route path="/about" element={<About />} />
            
            {/* Catch-all: If someone types a weird URL, redirect them to the Dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        
      </div>
    </Router>
  );
}

export default App;