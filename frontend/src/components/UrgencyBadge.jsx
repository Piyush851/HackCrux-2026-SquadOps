function UrgencyBadge({ level }) {

  const colors = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-orange-500",
    Critical: "bg-red-600"
  }

  return (
    <span className={`text-white px-3 py-1 rounded ${colors[level]}`}>
      {level}
    </span>
  )
}

export default UrgencyBadge