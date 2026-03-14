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

      <Navbar />

      <div className="max-w-7xl mx-auto p-4">

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/intake" element={<Intake />} />

          <Route path="/result" element={<Result />} />

          <Route path="/about" element={<About />} />

        </Routes>

      </div>

    </BrowserRouter>
  )
}

export default App