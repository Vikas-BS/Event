"use client"

export default function StatsPanel({ events, darkMode }) {
  const totalEvents = events.length
  const completedEvents = events.filter((event) => event.completed).length
  const upcomingEvents = events.filter((event) => new Date(event.date) >= new Date() && !event.completed).length

  const categoryStats = events.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1
    return acc
  }, {})

  const mostActiveCategory = Object.entries(categoryStats).sort(([, a], [, b]) => b - a)[0]

  return (
    <div className={`rounded-lg shadow-lg p-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Statistics</h3>

      <div className="space-y-3">
        <div className={`flex justify-between ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          <span className="text-sm">Total Events:</span>
          <span className="font-medium">{totalEvents}</span>
        </div>

        <div className={`flex justify-between ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          <span className="text-sm">Completed:</span>
          <span className="font-medium text-green-600">{completedEvents}</span>
        </div>

        <div className={`flex justify-between ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          <span className="text-sm">Upcoming:</span>
          <span className="font-medium text-blue-600">{upcomingEvents}</span>
        </div>

        {mostActiveCategory && (
          <div className={`flex justify-between ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <span className="text-sm">Most Active:</span>
            <span className="font-medium capitalize">
              {mostActiveCategory[0]} ({mostActiveCategory[1]})
            </span>
          </div>
        )}

        <div className={`pt-2 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Completion Rate: {totalEvents > 0 ? Math.round((completedEvents / totalEvents) * 100) : 0}%
          </div>
          <div className={`w-full bg-gray-200 rounded-full h-2 mt-1 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${totalEvents > 0 ? (completedEvents / totalEvents) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
