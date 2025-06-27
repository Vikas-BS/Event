"use client"

import { useState, useEffect } from "react"
import MonthView from "./components/MonthView"
import WeekView from "./components/WeekView"
import EventModal from "./components/EventModal"
import FilterPanel from "./components/FilterPanel"
import QuickActions from "./components/QuickActions"
import NotificationManager from "./components/NotificationManager"
import SearchBar from "./components/SearchBar"
import SettingsModal from "./components/SettingsModal"
import StatsPanel from "./components/StatsPanel"
import {
  formatDateLocal,
  generateRecurringEvents,
} from "./utils/dateUtils"

export default function App() {
  const [events, setEvents] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filters, setFilters] = useState({ category: "all" })
  const [searchTerm, setSearchTerm] = useState("")
  const [draggedEvent, setDraggedEvent] = useState(null)
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    defaultView: "month",
    weekStartsOn: 0,
  })
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  // ✅ Load events from localStorage on first load
  useEffect(() => {
    const storedEvents = localStorage.getItem("events")
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents))
    }
  }, [])

  // ✅ Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events))
  }, [events])

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      filters.category === "all" || event.category === filters.category
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.description &&
        event.description.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const handleDateClick = (date) => {
    setSelectedDate(date)
    setSelectedEvent(null)
    setIsModalOpen(true)
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    setSelectedDate(new Date(event.date))
    setIsModalOpen(true)
  }

  const handleSaveEvent = (data) => {
    const id = selectedEvent?.id || Date.now().toString()
    const newEvent = {
      ...data,
      id,
      completed: selectedEvent?.completed || false,
    }

    let updated = events.filter((e) => e.id !== id)

    if (newEvent.isRecurring) {
      const recurring = generateRecurringEvents(newEvent)
      updated = [...updated, ...recurring]
    } else {
      updated.push(newEvent)
    }

    setEvents(updated)
    setIsModalOpen(false)
  }

  const handleDeleteEvent = () => {
    if (!selectedEvent) return

    const isRecurring = selectedEvent.originalId != null
    const removeId = isRecurring ? selectedEvent.originalId : selectedEvent.id

    const filtered = events.filter(
      (e) => e.id !== removeId && e.originalId !== removeId
    )
    setEvents(filtered)
    setIsModalOpen(false)
  }

  const handleToggleComplete = (eventId) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId ? { ...e, completed: !e.completed } : e
      )
    )
  }

  const handleDropEvent = (eventId, newDate) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId ? { ...e, date: formatDateLocal(newDate) } : e
      )
    )
  }

  const handleAddEventToday = () => {
    setSelectedDate(new Date())
    setSelectedEvent(null)
    setIsModalOpen(true)
  }

  const ViewComponent =
    settings.defaultView === "week" ? WeekView : MonthView

  return (
    <div
      className={`${
        settings.darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen w-screen`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-2xl font-bold">Event Calendar</h1>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Settings
        </button>
      </div>

      {/* Body */}
      <main className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterPanel filters={filters} setFilters={setFilters} events={events} />
          <ViewComponent
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            events={filteredEvents}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
            onEventDrop={handleDropEvent}
            draggedEvent={draggedEvent}
            setDraggedEvent={setDraggedEvent}
            onToggleComplete={handleToggleComplete}
            weekStartsOn={settings.weekStartsOn}
          />
        </div>

        <div className="space-y-6">
          <QuickActions onAddEventToday={handleAddEventToday} />
          <StatsPanel events={filteredEvents} darkMode={settings.darkMode} />
        </div>
      </main>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        onDelete={selectedEvent ? handleDeleteEvent : null}
        initialData={selectedEvent}
        selectedDate={selectedDate}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        setSettings={setSettings}
      />

      <NotificationManager events={events} enabled={settings.notifications} />
    </div>
  )
}
