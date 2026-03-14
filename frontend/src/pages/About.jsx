import React from 'react';

function About() {
  // Corrected the tech stack to reflect the actual architecture we built!
  const techStack = [
    { name: "React", role: "Frontend UI", icon: "⚛️" },
    { name: "Vite", role: "Build Tool", icon: "⚡" },
    { name: "Tailwind CSS", role: "Styling Engine", icon: "🎨" },
    { name: "Flask & Python", role: "Backend API", icon: "🐍" },
    { name: "MongoDB Atlas", role: "Cloud Database", icon: "🍃" },
    { name: "LLaMA 3 & Whisper", role: "Groq AI Pipeline", icon: "🧠" }
  ];

  return (
    <div className="space-y-12 pb-20 animate-fade-in">
      
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-black text-slate-800 tracking-tight mb-4">
          Redefining <span className="text-teal-600">Patient Triage</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed font-medium">
          SquadOps is an intelligent healthcare solution designed to reduce wait times 
          and prioritize critical care through autonomous AI analysis and real-time metrics.
        </p>
      </section>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="glass-card bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
          <div className="h-14 w-14 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center text-3xl mb-6 shadow-inner">
            ⏱️
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Real-time Analysis</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Instant processing of patient symptoms to determine urgency levels 
            before they even reach the desk.
          </p>
        </div>

        <div className="glass-card bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
          <div className="h-14 w-14 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center text-3xl mb-6 shadow-inner">
            🎙️
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Multi-Modal Input</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Supports voice transcriptions, clinical notes, and PDF lab reports for 
            a comprehensive patient overview.
          </p>
        </div>

        <div className="glass-card bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
          <div className="h-14 w-14 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center text-3xl mb-6 shadow-inner">
            🚀
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Autonomous Agents</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Powered by modern LLM agents that identify medical patterns 
            to assist doctors in rapid decision-making.
          </p>
        </div>
      </div>

      {/* Tech Stack Section */}
      <section className="glass-card p-12 bg-slate-900 text-white rounded-3xl shadow-2xl relative overflow-hidden mt-8">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <h2 className="text-3xl font-bold mb-10 text-center relative z-10">Our Technology Ecosystem</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
          {techStack.map((tech, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-200 border border-white/10 backdrop-blur-sm cursor-default">
              <span className="text-4xl mb-3 drop-shadow-md">{tech.icon}</span>
              <span className="font-bold text-sm tracking-wide">{tech.name}</span>
              <span className="text-[10px] text-teal-400 font-semibold uppercase tracking-widest mt-1">{tech.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Team/Project Context */}
      <section className="max-w-3xl mx-auto text-center pt-8 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">Built by SquadOps</h2>
        <p className="text-slate-500 font-medium">
          Developed during <span className="text-teal-600 font-bold">HackCrux 2026</span> to solve the critical bottleneck in modern emergency rooms.
        </p>
      </section>

    </div>
  );
}

export default About;