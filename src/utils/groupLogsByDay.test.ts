import { describe, expect, it } from 'vitest'
import { groupLogsByDay } from './groupLogsByDay'
import type { LogEntry } from '../types'

function makeLog(overrides: Partial<LogEntry>): LogEntry {
  return {
    id: 'test-id',
    date: '2020-01-05T12:00:00.000Z',
    note: null,
    amount: 10,
    category_id: 'cat-1',
    user_id: 'user-1',
    ...overrides,
  }
}

describe('groupLogsByDay', () => {
  it('groups entries that fall on the same calendar day', () => {
    const logs = [
      makeLog({ date: '2020-01-05T09:00:00.000Z' }),
      makeLog({ date: '2020-01-05T18:00:00.000Z' }),
    ]
    const groups = groupLogsByDay(logs)
    expect(groups).toHaveLength(1)
    expect(groups[0].entries).toHaveLength(2)
  })

  it('computes the correct subtotal per day', () => {
    const logs = [
      makeLog({ date: '2020-01-05T09:00:00.000Z', amount: 10 }),
      makeLog({ date: '2020-01-05T18:00:00.000Z', amount: 20 }),
    ]
    const groups = groupLogsByDay(logs)
    expect(groups[0].subtotal).toBe(30)
  })

  it('orders groups newest first', () => {
    const logs = [
      makeLog({ date: '2020-01-01T12:00:00.000Z' }),
      makeLog({ date: '2020-01-10T12:00:00.000Z' }),
      makeLog({ date: '2020-01-05T12:00:00.000Z' }),
    ]
    const groups = groupLogsByDay(logs)
    expect(groups.map((g) => g.date.getDate())).toEqual([10, 5, 1])
  })

  it('orders entries within a group newest first', () => {
    const logs = [
      makeLog({ date: '2020-01-05T09:00:00.000Z', note: 'early' }),
      makeLog({ date: '2020-01-05T18:00:00.000Z', note: 'late' }),
    ]
    const groups = groupLogsByDay(logs)
    expect(groups[0].entries.map((e) => e.note)).toEqual(['late', 'early'])
  })

  it('returns an empty array for no logs', () => {
    expect(groupLogsByDay([])).toEqual([])
  })
})
