import { sameDay, stripTime } from './date'
import type { LogEntry } from '../types'

export interface WeekSummary {
  total: number
  dailyTotals: number[] // 7 entries, oldest (6 days ago) → newest (today)
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
  }
}

export interface WeekBar {
  heightPercent: number
  isMax: boolean
}

export function buildWeekBars(dailyTotals: number[]): WeekBar[] {
  const max = Math.max(...dailyTotals, 1)
  return dailyTotals.map((value) => ({
    heightPercent: Math.max(6, Math.round((value / max) * 100)),
    isMax: value === max && value > 0,
  }))
}
