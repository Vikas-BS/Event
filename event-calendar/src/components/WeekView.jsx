
import { useState } from "react"
import EventItem from "./EventItem"
import { getWeekDates, isSameDay, addWeeks, subWeeks } from "../utils/dateUtils"

export default function WeekView({
  currentDate,
  setCurrentDate,
  events,
  onDateClick,
  onEventClick,
  onEventDrop,
  draggedEvent,
  setDraggedEvent,
  onToggleComplete,
}) {
  const [dragOverDate, setDragOverDate] = useState(null)

  const weekDates = getWeekDates(currentDate, 0)
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const handlePrevWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1))
  }

  const handleNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1))
  }

  const handleDragOver = (e, date) => {
    e.preventDefault()
    setDragOverDate(date)
  }

  const handleDragLeave = () => {
    setDragOverDate(null)
  }

  const handleDrop = (e, date) => {
    e.preventDefault()
    if (draggedEvent) {
      onEventDrop(draggedEvent.id, date)
    }
    setDragOverDate(null)
  }

  const getEventsForDate = (date) => {
    return events.filter((event) => isSameDay(new Date(event.date), date))
  }

  const formatWeekRange = () => {
    const start = weekDates[0]
    const end = weekDates[6]
    const startMonth = start.toLocaleString("default", { month: "short" })
    const endMonth = end.toLocaleString("default", { month: "short" })

    if (start.getMonth() === end.getMonth()) {
      return `${startMonth} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`
    } else {
      return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${start.getFullYear()}`
    }
  }

  return (
    <div>
      {/* Week Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <button onClick={handlePrevWeek} className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="text-xl font-semibold text-gray-900">{formatWeekRange()}</h2>

        <button onClick={handleNextWeek} className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map((day, index) => {
          const date = weekDates[index]
          const isToday = isSameDay(date, new Date())

          return (
            <div key={day} className="p-4 text-center border-r border-gray-200 last:border-r-0">
              <div className="text-sm font-medium text-gray-700">{day}</div>
              <div className={`text-2xl font-semibold mt-1 ${isToday ? "text-blue-600" : "text-gray-900"}`}>
                {date.getDate()}
              </div>
            </div>
          )
        })}
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-7 min-h-96">
        {weekDates.map((date, index) => {
          const dayEvents = getEventsForDate(date)
          const isToday = isSameDay(date, new Date())
          const isDragOver = dragOverDate && isSameDay(dragOverDate, date)

          return (
            <div
              key={index}
              className={`border-r border-gray-200 last:border-r-0 p-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                isToday ? "bg-blue-50" : ""
              } ${isDragOver ? "bg-green-50" : ""}`}
              onClick={() => onDateClick(date)}
              onDragOver={(e) => handleDragOver(e, date)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, date)}
            >
              <div className="space-y-1">
                {dayEvents.map((event) => (
                  <EventItem
                    key={event.id}
                    event={event}
                    onClick={() => onEventClick(event)}
                    onDragStart={() => setDraggedEvent(event)}
                    onDragEnd={() => setDraggedEvent(null)}
                    onToggleComplete={() => onToggleComplete(event.id)}
                    compact={false}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
