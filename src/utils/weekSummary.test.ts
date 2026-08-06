import { describe, expect, it } from 'vitest'
import { buildWeekBars, computeWeekSummary } from './weekSummary'
import type { LogEntry } from '../types'

function daysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

function makeLog(overrides: Partial<LogEntry>): LogEntry {
  return {
    id: 'test-id',
    date: daysAgo(0),
    note: null,
    amount: 10,
    category_id: 'cat-1',
    user_id: 'user-1',
    ...overrides,
  }
}

describe('computeWeekSummary', () => {
  it('sums only entries within the last 7 days (today back to 6 days ago)', () => {
    const logs = [
      makeLog({ date: daysAgo(0), amount: 10 }),
      makeLog({ date: daysAgo(6), amount: 5 }),
      makeLog({ date: daysAgo(7), amount: 100 }), // outside the window
    ]
    expect(computeWeekSummary(logs).total).toBe(15)
  })

  it('returns 7 daily totals ordered oldest to newest', () => {
    const logs = [
      makeLog({ date: daysAgo(6), amount: 20 }),
      makeLog({ date: daysAgo(0), amount: 5 }),
    ]
    const summary = computeWeekSummary(logs)
    expect(summary.dailyTotals).toHaveLength(7)
    expect(summary.dailyTotals[0]).toBe(20) // 6 days ago
    expect(summary.dailyTotals[6]).toBe(5) // today
    expect(summary.days).toHaveLength(7)
    expect(summary.days[6].toDateString()).toBe(new Date().toDateString()) // today
  })

  it('returns all zeros for no logs', () => {
    const summary = computeWeekSummary([])
    expect(summary.total).toBe(0)
    expect(summary.dailyTotals).toEqual([0, 0, 0, 0, 0, 0, 0])
  })
})

describe('buildWeekBars', () => {
  it('marks the single highest day as max', () => {
    const bars = buildWeekBars([10, 50, 20, 0, 0, 0, 0])
    expect(bars[1].isMax).toBe(true)
    expect(bars[0].isMax).toBe(false)
  })

  it('gives every bar at least an 8% height floor', () => {
    const bars = buildWeekBars([0, 0, 0, 0, 0, 0, 100])
    expect(bars[0].heightPercent).toBeGreaterThanOrEqual(8)
  })

  it('does not mark any bar as max when all days are zero', () => {
    const bars = buildWeekBars([0, 0, 0, 0, 0, 0, 0])
    expect(bars.some((bar) => bar.isMax)).toBe(false)
  })
})
