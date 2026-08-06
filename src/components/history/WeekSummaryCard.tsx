import { formatMoney } from '../../utils/money'
import { buildWeekBars } from '../../utils/weekSummary'
import styles from './WeekSummaryCard.module.css'

interface WeekSummaryCardProps {
  total: number
  dailyTotals: number[]
}

export function WeekSummaryCard({ total, dailyTotals }: WeekSummaryCardProps) {
  const bars = buildWeekBars(dailyTotals)

  return (
    <div className={styles.card}>
      <span className={styles.label}>THIS WEEK</span>
      <div className={styles.total}>{formatMoney(total)}</div>
      <div className={styles.bars}>
        {bars.map((bar, index) => (
          <div
            key={index}
            className={bar.isMax ? `${styles.bar} ${styles.barMax}` : styles.bar}
            style={{ height: `${bar.heightPercent}%` }}
          />
        ))}
      </div>
    </div>
  )
}
