import { sameDay, stripTime } from './date'
import type { LogEntry } from '../types'

export interface WeekSummary {
  total: number
  dailyTotals: number[] // 7 entries, oldest (6 days ago) → newest (today)
  days: Date[] // matching 7 dates, same order
}

export function computeWeekSummary(logs: LogEntry[]): WeekSummary {
  const today = stripTime(new Date())
  const days: Date[] = []
  for (let i = 6; i >= 0; i--) {
    const day = new Date(today)
    day.setDate(day.getDate() - i)
    days.push(day)
  }

  const dailyTotals = days.map((day) =>
    logs
      .filter((log) => sameDay(stripTime(new Date(log.date)), day))
      .reduce((sum, log) => sum + log.amount, 0),
  )

  return {
    total: dailyTotals.reduce((sum, value) => sum + value, 0),
    dailyTotals,
    days,
  }
}

export interface WeekBar {
  heightPercent: number
  isMax: boolean
}

export function buildWeekBars(dailyTotals: number[]): WeekBar[] {
  const max = Math.max(...dailyTotals, 1)
  // sqrt scale, not linear — a single outlier day (e.g. rent) shouldn't
  // crush every other bar down to an invisible sliver.
  const scaledMax = Math.sqrt(max)
  return dailyTotals.map((value) => ({
    heightPercent: Math.max(8, Math.round((Math.sqrt(value) / scaledMax) * 100)),
    isMax: value === max && value > 0,
  }))
}
