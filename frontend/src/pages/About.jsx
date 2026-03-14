import React from 'react';

function About() {
  const techStack = [
    { name: "React 19", role: "Frontend UI", icon: "⚛️" },
    { name: "Vite 8", role: "Build Tool", icon: "⚡" },
    { name: "Tailwind CSS", role: "Styling Engine", icon: "🎨" },
    { name: "Node.js", role: "Backend Server", icon: "🟢" },
    { name: "MongoDB", role: "Database", icon: "🍃" },
    { name: "AI Agent", role: "Autonomous Triage", icon: "🤖" }
  ];

  return (
    <div className="space-y-12 pb-20">
      
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-black text-slate-800 tracking-tight mb-4">
          Redefining <span className="text-teal-600">Patient Triage</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
          SquadOps is an intelligent healthcare solution designed to reduce wait times 
          and prioritize critical care through autonomous AI analysis and real-time metrics.
        </p>
      </section>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="glass-card p-8 hover:bg-white transition-colors">
          <div className="h-12 w-12 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center text-2xl mb-4">
            ⏱️
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Real-time Analysis</h3>
          <p className="text-slate-600 text-sm">
            Instant processing of patient symptoms to determine urgency levels 
            before they even reach the desk.
          </p>
        </div>

        <div className="glass-card p-8 hover:bg-white transition-colors">
          <div className="h-12 w-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center text-2xl mb-4">
            🎙️
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Multi-Modal Input</h3>
          <p className="text-slate-600 text-sm">
            Supports voice transcriptions, clinical notes, and PDF lab reports for 
            a comprehensive patient overview.
          </p>
        </div>

        <div className="glass-card p-8 hover:bg-white transition-colors">
          <div className="h-12 w-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center text-2xl mb-4">
            🚀
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Autonomous Agents</h3>
          <p className="text-slate-600 text-sm">
            Powered by modern LLM agents that identify medical patterns 
            to assist doctors in decision-making.
          </p>
        </div>
      </div>

      {/* Tech Stack Section */}
      <section className="glass-card p-10 bg-slate-900 text-white border-none shadow-2xl">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Technology Ecosystem</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {techStack.map((tech, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
              <span className="text-3xl mb-2">{tech.icon}</span>
              <span className="font-bold text-sm">{tech.name}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">{tech.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Team/Project Context */}
      <section className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Built by SquadOps</h2>
        <p className="text-slate-500 italic">
          Developed during HackCrux 2026 to solve the critical bottleneck in modern emergency rooms.
        </p>
      </section>

    </div>
  );
}

export default About;