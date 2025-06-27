export function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

export function getFirstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

export function formatDate(date) {
  return date.toISOString().split("T")[0]
}

export function parseDate(dateString) {
  return new Date(dateString)
}
export function formatDateLocal(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function isEventInMonth(eventDate, currentDate) {
  return eventDate.getFullYear() === currentDate.getFullYear() && eventDate.getMonth() === currentDate.getMonth()
}

export function addMonths(date, months) {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + months)
  return newDate
}

export function subMonths(date, months) {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() - months)
  return newDate
}

export function addDays(date, days) {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days)
  return newDate
}

export function getWeekDates(date, weekStartsOn = 0) {
  const dates = []
  const startOfWeek = new Date(date)
  const day = startOfWeek.getDay()
  const diff = day - weekStartsOn
  startOfWeek.setDate(startOfWeek.getDate() - diff)

  for (let i = 0; i < 7; i++) {
    const weekDate = new Date(startOfWeek)
    weekDate.setDate(startOfWeek.getDate() + i)
    dates.push(weekDate)
  }

  return dates
}

export function isEventInWeek(eventDate, currentDate, weekStartsOn = 0) {
  const weekDates = getWeekDates(currentDate, weekStartsOn)
  return eventDate >= weekDates[0] && eventDate <= weekDates[6]
}

export function addWeeks(date, weeks) {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + weeks * 7)
  return newDate
}

export function subWeeks(date, weeks) {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() - weeks * 7)
  return newDate
}

export function generateRecurringEvents(baseEvent) {
  const events = []
  const startDate = new Date(baseEvent.date)
  const endDate = baseEvent.recurringEnd ? new Date(baseEvent.recurringEnd) : addMonths(startDate, 12)

  let currentDate = new Date(startDate)
  let counter = 0

  while (currentDate <= endDate && counter < 365) {
    // Safety limit
    events.push({
      ...baseEvent,
      id: `${baseEvent.id}-${counter}`,
      date: formatDateLocal(currentDate), // Use local date formatting
      isRecurringInstance: true,
      originalId: baseEvent.id,
    })

    switch (baseEvent.recurringType) {
      case "daily":
        currentDate = addDays(currentDate, 1)
        break
      case "weekly":
        currentDate = addDays(currentDate, 7)
        break
      case "monthly":
        currentDate = addMonths(currentDate, 1)
        break
      default:
        currentDate = addDays(currentDate, 7)
    }

    counter++
  }

  return events
}
