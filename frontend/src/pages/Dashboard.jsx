import { useState, useEffect } from "react";
import { triageService } from "../services/triageService";
import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from "recharts";
import PatientCard from "../components/PatientCard";
import { AlertCircle, Activity } from "lucide-react";

// Explicitly map urgency levels to colors so they never mismatch
const URGENCY_COLORS = {
  High: "#ef4444",    // Red
  Medium: "#f97316",  // Orange
  Low: "#2dd4bf",     // Teal
  Unknown: "#94a3b8"  // Slate
};

function Dashboard() {
  const [metrics, setMetrics] = useState({
    urgencyData: [],
    patientTrend: [],
    symptomData: [],
    recentPatients: [],
    stats: { total: 0, critical: 0, doctors: 8, waitTime: "0 min" }
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("connected"); // 'connected' | 'error'

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await triageService.getMetrics();
        setMetrics(data);
        setConnectionStatus("connected");
      } catch (error) {
        console.error("Error fetching metrics:", error);
        setConnectionStatus("error");
      } finally {
        setIsLoading(false);
      }
    };
    
    // Initial fetch
    fetchMetrics();
    
    // Poll every 10 seconds
    const interval = setInterval(fetchMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Activity className="w-12 h-12 text-teal-500 animate-pulse" />
        <div className="text-xl font-bold text-slate-500 animate-pulse">Loading live metrics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
            Triage Metrics
          </h1>
          <p className="text-slate-500 font-medium mt-1">Real-time patient flow & urgency distribution</p>
        </div>
        
        {/* Dynamic Connection Badge */}
        {connectionStatus === "connected" ? (
          <div className="flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-lg border border-teal-100 text-sm font-bold text-teal-700">
            <span className="h-2.5 w-2.5 bg-teal-500 rounded-full animate-ping"></span>
            Live Update: Connected
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg border border-red-100 text-sm font-bold text-red-700">
            <AlertCircle size={16} />
            Connection Lost
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Total Patients", value: metrics.stats.total, color: "text-slate-800" },
          { label: "Critical Cases", value: metrics.stats.critical, color: "text-red-600" },
          { label: "Doctors Available", value: metrics.stats.doctors, color: "text-teal-600" },
          { label: "Avg Wait Time", value: metrics.stats.waitTime, color: "text-blue-600" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-t-4 border-t-teal-500/20 hover:-translate-y-1 transition-transform duration-200">
            <p className="text-slate-500 text-xs md:text-sm font-bold uppercase tracking-wider">{stat.label}</p>
            <h2 className={`text-3xl md:text-4xl font-black mt-2 ${stat.color}`}>{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Priority Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
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
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
              >
                {metrics.urgencyData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={URGENCY_COLORS[entry.name] || URGENCY_COLORS.Unknown} 
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                itemStyle={{ fontWeight: 'bold' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Intake Trend */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
            Arrival Trends
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={metrics.patientTrend}>
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} allowDecimals={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
              />
              <Line 
                type="monotone" 
                dataKey="patients" 
                name="Patients"
                stroke="#3b82f6" 
                strokeWidth={4} 
                dot={{ r: 5, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Full-Width Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="h-2 w-2 bg-green-500 rounded-full"></span>
          Top Symptoms
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={metrics.symptomData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="symptom" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 500}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dx={-10} allowDecimals={false} />
            <Tooltip 
              cursor={{fill: '#f1f5f9'}} 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
            />
            <Bar dataKey="count" name="Occurrences" fill="#2dd4bf" radius={[8, 8, 0, 0]} barSize={48}>
              {metrics.symptomData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "#0f766e" : "#2dd4bf"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Live Patient Queue */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mt-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-indigo-500 rounded-full animate-ping"></span>
          Live Patient Queue
        </h2>
        
        <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
          {metrics.recentPatients?.length > 0 ? (
            metrics.recentPatients.map((patient, index) => (
              <PatientCard key={patient._id || index} patient={patient} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl">
              <Activity className="text-slate-300 w-12 h-12 mb-3" />
              <p className="text-slate-500 font-medium">No patients in the queue yet.</p>
              <p className="text-slate-400 text-sm mt-1">Submit data via the Intake portal to see it here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;