function Dashboard() {

  const patients = [
    { id: 1, name: "Patient A", urgency: "High" },
    { id: 2, name: "Patient B", urgency: "Medium" },
    { id: 3, name: "Patient C", urgency: "Critical" }
  ]

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Triage Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {patients.map((p) => (

          <div key={p.id} className="bg-white shadow p-4 rounded-lg">

            <h3 className="text-lg font-semibold">
              {p.name}
            </h3>

            <p className="text-red-600 font-bold mt-2">
              Urgency: {p.urgency}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Dashboard