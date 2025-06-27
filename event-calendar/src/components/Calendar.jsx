"use client"

import { useState } from "react"
import EventItem from "./EventItem"
import { getDaysInMonth, getFirstDayOfMonth, isSameDay, addMonths, subMonths } from "../utils/dateUtils"

export default function Calendar({
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

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)
  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" })

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"]

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
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

  const renderCalendarDays = () => {
    const days = []
    const totalCells = 42

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border-r border-b border-gray-200"></div>)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayEvents = getEventsForDate(date)
      const isToday = isSameDay(date, new Date())
      const isDragOver = dragOverDate && isSameDay(dragOverDate, date)

      days.push(
        <div
          key={day}
          className={`h-24 border-r border-b border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
            isToday ? "bg-blue-50" : ""
          } ${isDragOver ? "bg-green-50" : ""}`}
          onClick={() => onDateClick(date)}
          onDragOver={(e) => handleDragOver(e, date)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, date)}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : "text-gray-900"}`}>{day}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <EventItem
                key={event.id}
                event={event}
                onClick={() => onEventClick(event)}
                onDragStart={() => setDraggedEvent(event)}
                onDragEnd={() => setDraggedEvent(null)}
                onToggleComplete={() => onToggleComplete(event.id)}
              />
            ))}
            {dayEvents.length > 2 && <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>}
          </div>
        </div>,
      )
    }

    // Fill remaining cells
    const remainingCells = totalCells - (firstDayOfMonth + daysInMonth)
    for (let i = 0; i < remainingCells; i++) {
      const nextMonthDay = i + 1
      days.push(
        <div key={`next-${i}`} className="h-24 border-r border-b border-gray-200 p-2">
          <div className="text-sm text-gray-400">{nextMonthDay}</div>
        </div>,
      )
    }

    return days
  }

  return (
    <div>
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="text-xl font-semibold text-gray-900">{monthName}</h2>

        <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">{renderCalendarDays()}</div>
    </div>
  )
}
