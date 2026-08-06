import { formatMoney } from '../../utils/money'
import styles from './WeekSummaryPill.module.css'

interface WeekSummaryPillProps {
  total: number
}

export function WeekSummaryPill({ total }: WeekSummaryPillProps) {
  return (
    <div className={styles.pill}>
      <span className={styles.label}>THIS WEEK</span>
      <span className={styles.total}>{formatMoney(total)}</span>
    </div>
  )
}
