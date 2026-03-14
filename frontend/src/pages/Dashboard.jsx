import { useState, useEffect } from "react";
import { triageService } from "../services/triageService";
import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";
import PatientCard from "../components/PatientCard";

const COLORS = ["#ef4444", "#f97316", "#0f766e", "#2dd4bf"];

function Dashboard() {
  const [metrics, setMetrics] = useState({
    urgencyData: [],
    patientTrend: [],
    symptomData: [],
    recentPatients: [],
    stats: { total: 0, critical: 0, doctors: 8, waitTime: "0 min",}
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live data from the Flask backend on load
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await triageService.getMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMetrics();
    // Optional: Set an interval to auto-refresh the dashboard every 10 seconds
    const interval = setInterval(fetchMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <div className="text-center mt-20 text-xl font-bold text-gray-500">Loading live metrics...</div>;
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
            Triage Metrics
          </h1>
          <p className="text-slate-500 font-medium">Real-time patient flow & urgency distribution</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100 text-sm font-bold text-teal-600 animate-pulse">
          Live Update: Connected
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: "Total Patients", value: metrics.stats.total, color: "text-slate-800" },
          { label: "Critical Cases", value: metrics.stats.critical, color: "text-red-600" },
          { label: "Doctors Available", value: metrics.stats.doctors, color: "text-teal-600" },
          { label: "Avg Wait Time", value: metrics.stats.waitTime, color: "text-blue-600" }
        ].map((stat, i) => (
          <div key={i} className="glass-card bg-white p-6 rounded-2xl shadow-sm border-t-4 border-t-teal-500/20 hover:scale-[1.02] transition-transform">
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
            <h2 className={`text-3xl font-black mt-1 ${stat.color}`}>{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Priority Distribution */}
        <div className="glass-card bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="h-2 w-2 bg-teal-500 rounded-full"></span>
            Patient Priority
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={metrics.urgencyData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
              >
                {metrics.urgencyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Intake Trend */}
        <div className="glass-card bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
            Arrival Trends
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={metrics.patientTrend}>
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={4} dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Full-Width Chart */}
      <div className="glass-card bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="h-2 w-2 bg-green-500 rounded-full"></span>
          Symptom Analysis
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={metrics.symptomData}>
            <XAxis dataKey="symptom" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
            <Bar dataKey="count" fill="#2dd4bf" radius={[10, 10, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* --- NEW: Live Patient Queue --- */}
      <div className="glass-card bg-white rounded-2xl shadow-sm p-8 mt-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="h-2 w-2 bg-indigo-500 rounded-full animate-ping"></span>
          Live Patient Queue
        </h2>
        
        <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {metrics.recentPatients?.length > 0 ? (
            metrics.recentPatients.map((patient, index) => (
              <PatientCard key={index} patient={patient} />
            ))
          ) : (
            <div className="text-center py-10 text-gray-400 font-medium border-2 border-dashed border-gray-200 rounded-xl">
              No patients in the queue yet. Submit data via the Intake portal!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;