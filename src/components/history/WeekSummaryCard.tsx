import { useState } from 'react'
import { formatMoney } from '../../utils/money'
import { WEEKDAY_LABELS, formatShortDate } from '../../utils/date'
import { buildWeekBars } from '../../utils/weekSummary'
import styles from './WeekSummaryCard.module.css'

interface WeekSummaryCardProps {
  total: number
  dailyTotals: number[]
  days: Date[]
}

export function WeekSummaryCard({ total, dailyTotals, days }: WeekSummaryCardProps) {
  const bars = buildWeekBars(dailyTotals)
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const activeIndex = hoveredIndex ?? pinnedIndex

  function handleTap(index: number) {
    // Clear hover as part of the same update rather than waiting on a
    // separate mouseleave — iOS Safari fires a synthetic mouseenter right
    // before a tap's click, but its matching mouseleave is unreliable/
    // delayed, so without this the ring wouldn't appear until some later,
    // unrelated tap "unstuck" it.
    setHoveredIndex(null)
    setPinnedIndex((current) => (current === index ? null : index))
  }

  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <span className={styles.headerLabel}>THIS WEEK</span>
        <span
          className={
            activeIndex !== null
              ? `${styles.headerReadout} ${styles.headerReadoutVisible}`
              : styles.headerReadout
          }
        >
          {activeIndex !== null
            ? `${formatShortDate(days[activeIndex])} · ${formatMoney(dailyTotals[activeIndex])}`
            : ''}
        </span>
      </div>
      <div className={styles.total}>{formatMoney(total)}</div>
      <div className={styles.bars}>
        {bars.map((bar, index) => {
          const isActive = activeIndex === index
          const isPinned = pinnedIndex === index && hoveredIndex === null
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleTap(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              aria-label={`${formatShortDate(days[index])}, ${formatMoney(dailyTotals[index])}`}
              className={isActive || bar.isMax ? `${styles.bar} ${styles.barMax}` : styles.bar}
              style={{
                height: `${bar.heightPercent}%`,
                boxShadow: isPinned ? '0 0 0 2px var(--color-text-primary) inset' : 'none',
              }}
            />
          )
        })}
      </div>
      <div className={styles.dayInitials}>
        {days.map((day, index) => (
          <span
            key={index}
            className={
              activeIndex === index
                ? `${styles.dayInitial} ${styles.dayInitialActive}`
                : styles.dayInitial
            }
          >
            {WEEKDAY_LABELS[day.getDay()]}
          </span>
        ))}
      </div>
    </div>
  )
}
