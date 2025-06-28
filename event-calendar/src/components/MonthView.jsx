

import { useState } from "react"
import EventItem from "./EventItem"
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  isSameDay,
  isEventInMonth,
  addMonths,
  subMonths
} from "../utils/dateUtils"

export default function MonthView({
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

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const generateCalendarGrid = () => {
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7
    const grid = []

    for (let i = 0; i < totalCells; i++) {
      const date = new Date(year, month, i - firstDay + 1)
      const inCurrentMonth = i >= firstDay && i < firstDay + daysInMonth
      grid.push({ date, inCurrentMonth })
    }

    return grid
  }

  const getEventsForDate = (date) => {
    return events.filter((event) =>
      isSameDay(new Date(event.date), date) &&
      isEventInMonth(new Date(event.date), currentDate)
    )
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

  const grid = generateCalendarGrid()

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded transition">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold text-gray-900">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded transition">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 bg-gray-50 text-center text-sm font-medium text-gray-500 border-b">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 min-h-[500px]">
        {grid.map(({ date, inCurrentMonth }, index) => {
          const isToday = isSameDay(date, new Date())
          const isDragOver = dragOverDate && isSameDay(date, dragOverDate)
          const eventsForDate = getEventsForDate(date)

          return (
            <div
              key={index}
              className={`border p-2 relative text-sm cursor-pointer ${
                inCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400"
              } ${isToday ? "bg-blue-50 border-blue-400" : ""} ${isDragOver ? "bg-green-100" : ""}`}
              onClick={() => onDateClick(date)}
              onDragOver={(e) => handleDragOver(e, date)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, date)}
            >
              <div className="absolute top-1 left-1 text-xs font-medium">{date.getDate()}</div>

              <div className="mt-5 space-y-1">
                {eventsForDate.map((event) => (
                  <EventItem
                    key={event.id}
                    event={event}
                    onClick={() => onEventClick(event)}
                    onDragStart={() => setDraggedEvent(event)}
                    onDragEnd={() => setDraggedEvent(null)}
                    onToggleComplete={() => onToggleComplete(event.id)}
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
