function UrgencyBadge({ level, score }) {
  // 1. Defensive: Normalize the string just in case the AI sends "high" instead of "High"
  const normalizedLevel = level 
    ? level.charAt(0).toUpperCase() + level.slice(1).toLowerCase() 
    : "Unknown";

  // 2. Map exact AI outputs to our new Healthcare Color Palette
  const styles = {
    High: {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-300",
      dot: "bg-red-500"
    },
    Medium: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-300",
      dot: "bg-yellow-500"
    },
    Low: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-300",
      dot: "bg-green-500"
    },
    Unknown: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-300",
      dot: "bg-gray-500"
    }
  };

  // Fallback to Unknown if a weird string sneaks through
  const currentStyle = styles[normalizedLevel] || styles.Unknown;

  return (
    <span 
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-sm font-bold text-sm tracking-wide transition-colors ${currentStyle.bg} ${currentStyle.text} ${currentStyle.border}`}
    >
      {/* 3. Live Telemetry Dot (Pulses for High/Medium urgency) */}
      <span className="relative flex h-2 w-2">
        {(normalizedLevel === 'High' || normalizedLevel === 'Medium') && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentStyle.dot}`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${currentStyle.dot}`}></span>
      </span>
      
      {normalizedLevel.toUpperCase()}
      
      {/* 4. Optional Score Display: Render the exact number if passed as a prop */}
      {score !== undefined && (
        <span className="opacity-75 text-xs ml-0.5 border-l pl-2 border-current">
          {score}/100
        </span>
      )}
    </span>
  );
}

export default UrgencyBadge;