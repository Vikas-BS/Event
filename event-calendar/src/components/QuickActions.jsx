

export default function QuickActions({ onAddEventToday }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>

      <button
        onClick={onAddEventToday}
        className="flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Event Today
      </button>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
          Click any day to add an event
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
          Click an event to edit it
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
          Drag events to reschedule
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
          Use search to find events
        </div>
      </div>
    </div>
  )
}
