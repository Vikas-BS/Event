
import { useState, useEffect } from "react"

export default function EventModal({ isOpen, onClose, onSave, onDelete, initialData, selectedDate }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    category: "other",
    location: "",
    isRecurring: false,
    recurringType: "weekly",
    recurringEnd: "",
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        date: initialData.date || "",
        time: initialData.time || "",
        category: initialData.category || "other",
        location: initialData.location || "",
        isRecurring: initialData.isRecurring || false,
        recurringType: initialData.recurringType || "weekly",
        recurringEnd: initialData.recurringEnd || "",
      })
    } else if (selectedDate) {
      const year = selectedDate.getFullYear()
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
      const day = String(selectedDate.getDate()).padStart(2, "0")
      const localDateString = `${year}-${month}-${day}`

      setFormData((prev) => ({
        ...prev,
        date: localDateString,
      }))
    }
  }, [initialData, selectedDate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return
    onSave(formData)
    onClose()
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      onDelete()
      onClose()
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              {initialData ? "Edit Event" : "Add New Event"}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-sm sm:text-base">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 text-white border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 text-white border border-gray-300 rounded-lg"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block font-medium text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-white border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-white border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 text-white border border-gray-300 rounded-lg"
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="health">Health</option>
                <option value="social">Social</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Recurrence */}
            <div className=" text-white border-t pt-4 mt-4 space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isRecurring"
                  name="isRecurring"
                  checked={formData.isRecurring}
                  onChange={handleChange}
                />
                <label htmlFor="isRecurring" className="font-medium text-gray-700">
                  Repeat Event
                </label>
              </div>

              {formData.isRecurring && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="recurringType" className="block font-medium text-gray-700 mb-1">Repeat</label>
                    <select
                      id="recurringType"
                      name="recurringType"
                      value={formData.recurringType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="recurringEnd" className="block font-medium text-gray-700 mb-1">End Repeat On</label>
                    <input
                      type="date"
                      id="recurringEnd"
                      name="recurringEnd"
                      value={formData.recurringEnd}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row sm:justify-between pt-4 gap-2 sm:gap-0">
              {onDelete && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              )}
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {initialData ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
