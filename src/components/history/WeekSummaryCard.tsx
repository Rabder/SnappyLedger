import { useState } from 'react'
import { formatMoney } from '../../utils/money'
import { dateLabelFor } from '../../utils/date'
import { buildWeekBars } from '../../utils/weekSummary'
import styles from './WeekSummaryCard.module.css'

interface WeekSummaryCardProps {
  total: number
  dailyTotals: number[]
  days: Date[]
}

export function WeekSummaryCard({ total, dailyTotals, days }: WeekSummaryCardProps) {
  const bars = buildWeekBars(dailyTotals)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return (
    <div className={styles.card}>
      <span className={styles.label}>THIS WEEK</span>
      <div className={styles.total}>{formatMoney(total)}</div>
      <div className={styles.bars}>
        {bars.map((bar, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
            aria-label={`${dateLabelFor(days[index])}, ${formatMoney(dailyTotals[index])}`}
            className={bar.isMax ? `${styles.bar} ${styles.barMax}` : styles.bar}
            style={{ height: `${bar.heightPercent}%` }}
          />
        ))}
      </div>
      {selectedIndex !== null && (
        <div className={styles.detail}>
          {dateLabelFor(days[selectedIndex])} · {formatMoney(dailyTotals[selectedIndex])}
        </div>
      )}
    </div>
  )
}
