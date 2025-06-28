

export default function SettingsModal({ isOpen, onClose, settings, setSettings }) {
  if (!isOpen) return null

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`rounded-lg shadow-xl max-w-md w-full ${settings.darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${settings.darkMode ? "text-white" : "text-gray-900"}`}>Settings</h2>
            <button
              onClick={onClose}
              className={`transition-colors duration-200 ${
                settings.darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Dark Mode
              </label>
              <button
                onClick={() => handleChange("darkMode", !settings.darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  settings.darkMode ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    settings.darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Enable Notifications
              </label>
              <button
                onClick={() => handleChange("notifications", !settings.notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  settings.notifications ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    settings.notifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Default View */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                Default View
              </label>
              <select
                value={settings.defaultView}
                onChange={(e) => handleChange("defaultView", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  settings.darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option value="month">Month View</option>
                <option value="week">Week View</option>
              </select>
            </div>

            {/* Week Starts On */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                Week Starts On
              </label>
              <select
                value={settings.weekStartsOn}
                onChange={(e) => handleChange("weekStartsOn", Number.parseInt(e.target.value))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  settings.darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option value={0}>Sunday</option>
                <option value={1}>Monday</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                settings.darkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
