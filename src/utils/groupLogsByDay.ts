import { dateLabelFor, stripTime } from './date'
import type { LogEntry } from '../types'

export interface LogDayGroup {
  date: Date
  dateLabel: string
  subtotal: number
  entries: LogEntry[]
}

export function groupLogsByDay(logs: LogEntry[]): LogDayGroup[] {
  const groupsByDay = new Map<number, LogDayGroup>()

  for (const log of logs) {
    const day = stripTime(new Date(log.date))
    const key = day.getTime()
    const existing = groupsByDay.get(key)
    if (existing) {
      existing.entries.push(log)
      existing.subtotal += log.amount
    } else {
      groupsByDay.set(key, {
        date: day,
        dateLabel: dateLabelFor(day),
        subtotal: log.amount,
        entries: [log],
      })
    }
  }

  return Array.from(groupsByDay.values())
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map((group) => ({
      ...group,
      entries: [...group.entries].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    }))
}
