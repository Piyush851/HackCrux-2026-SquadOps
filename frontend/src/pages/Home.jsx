import { Link } from "react-router-dom";
import { Activity, Clock, FileWarning, BrainCircuit, LayoutList, ShieldCheck } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="bg-white border-b border-slate-200 pt-20 pb-24 px-6 text-center shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
            <Activity size={16} />
            <span>Smart Triage Assistant</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            AI-Powered Intelligent <br className="hidden md:block" />
            <span className="text-blue-600">Patient Prioritization</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Enhance situational awareness and workflow efficiency. Instantly convert unstructured patient data into actionable insights without replacing the human touch.
          </p>
          <Link
            to="/intake"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30 active:scale-95 text-lg"
          >
            Start Patient Intake
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-20 space-y-24">
        
        {/* 2. THE PROBLEM SECTION */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Challenge in Modern Healthcare</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Healthcare professionals are overwhelmed by unstructured information, leading to cognitive fatigue and critical delays.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-6">
                <FileWarning size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Fragmented Data</h3>
              <p className="text-slate-600 leading-relaxed">
                Interpreting massive volumes of unstructured intake descriptions, consultation notes, and diagnostic reports takes away from patient face-time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-6">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Time-Sensitive Risk</h3>
              <p className="text-slate-600 leading-relaxed">
                Information must be synthesized rapidly. Communication delays and documentation burdens can occasionally lead to misprioritized cases.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
                <BrainCircuit size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Cognitive Overload</h3>
              <p className="text-slate-600 leading-relaxed">
                The mental effort required to manually connect the dots across various audio and text inputs leads to severe provider burnout.
              </p>
            </div>
          </div>
        </section>

        {/* 3. THE SOLUTION SECTION */}
        <section className="bg-slate-900 rounded-3xl p-8 md:p-16 text-white text-center md:text-left shadow-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Solution: Structured Clarity</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                We've built an AI-powered triage assistant that acts as a cognitive safety net. It automatically converts chaotic inputs into clear, prioritized signals so your team can focus on what matters most: treating patients.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center justify-center md:justify-start gap-3 text-slate-200">
                  <LayoutList className="text-blue-400" size={20} />
                  <span>Converts unstructured text/audio to structured summaries</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3 text-slate-200">
                  <Activity className="text-blue-400" size={20} />
                  <span>Generates intelligent prioritization signals</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3 text-slate-200">
                  <ShieldCheck className="text-green-400" size={20} />
                  <span className="font-semibold text-white">Empowers providers—never automates medical decisions</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <h3 className="font-semibold text-xl mb-4 text-center">Ready to streamline your workflow?</h3>
              <p className="text-slate-400 text-center mb-8 text-sm">
                Join the platform to access instant AI symptom analysis and patient queue management.
              </p>
              <Link
                to="/intake"
                className="flex items-center justify-center w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-400 transition-colors"
              >
                Go to Intake Dashboard
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Home;