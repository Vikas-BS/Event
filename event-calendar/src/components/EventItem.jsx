"use client"

export default function EventItem({ event, onClick, onDragStart, onDragEnd, onToggleComplete, compact = true }) {
  const getEventColor = (category) => {
    const colors = {
      work: "bg-blue-500",
      personal: "bg-green-500",
      health: "bg-red-500",
      social: "bg-purple-500",
      other: "bg-gray-500",
    }
    return colors[category] || colors.other
  }

  const handleClick = (e) => {
    e.stopPropagation()
    onClick()
  }

  const handleDragStart = (e) => {
    e.stopPropagation()
    onDragStart()
  }

  return (
    <div
      className={`${getEventColor(event.category)} text-white text-xs px-2 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity duration-200 ${
        event.completed ? "opacity-60 line-through" : ""
      }`}
      onClick={handleClick}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      title={`${event.title}${event.time ? ` - ${event.time}` : ""}`}
    >
      <div className="truncate font-medium">{event.title}</div>
    </div>
  )
}
