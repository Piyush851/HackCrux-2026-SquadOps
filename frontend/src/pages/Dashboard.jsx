import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts"

const urgencyData = [
  { name: "Critical", value: 5 },
  { name: "High", value: 8 },
  { name: "Medium", value: 12 },
  { name: "Low", value: 6 }
]

const patientTrend = [
  { time: "9AM", patients: 3 },
  { time: "10AM", patients: 6 },
  { time: "11AM", patients: 9 },
  { time: "12PM", patients: 12 },
  { time: "1PM", patients: 7 }
]

const symptomData = [
  { symptom: "Fever", count: 18 },
  { symptom: "Headache", count: 12 },
  { symptom: "Chest Pain", count: 7 },
  { symptom: "Cough", count: 10 }
]

// Using the colors from our new Healthcare Palette
const COLORS = ["#ef4444", "#f97316", "#0f766e", "#2dd4bf"]

function Dashboard() {
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
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100 text-sm font-bold text-teal-600">
          Live Update: Just Now
        </div>
      </div>

      {/* Stats Cards - Now with Glassmorphism */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: "Total Patients", value: "31", color: "text-slate-800" },
          { label: "Critical Cases", value: "5", color: "text-red-600" },
          { label: "Doctors Available", value: "8", color: "text-teal-600" },
          { label: "Avg Wait Time", value: "12 min", color: "text-blue-600" }
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 border-t-4 border-t-teal-500/20 hover:scale-[1.02] transition-transform">
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
            <h2 className={`text-3xl font-black mt-1 ${stat.color}`}>{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Priority Distribution */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="h-2 w-2 bg-teal-500 rounded-full"></span>
            Patient Priority
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={urgencyData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
              >
                {urgencyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Intake Trend */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
            Arrival Trends
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={patientTrend}>
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                 contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="patients" 
                stroke="#3b82f6" 
                strokeWidth={4} 
                dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Full-Width Chart */}
      <div className="glass-card p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="h-2 w-2 bg-green-500 rounded-full"></span>
          Symptom Analysis
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={symptomData}>
            <XAxis dataKey="symptom" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip 
               cursor={{fill: 'transparent'}}
               contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="count" fill="#2dd4bf" radius={[10, 10, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Dashboard