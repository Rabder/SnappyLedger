import { dateLabelFor } from '../../utils/date'
import styles from './DatePill.module.css'

interface DatePillProps {
  date: Date
}

export function DatePill({ date }: DatePillProps) {
  return (
    <button type="button" className={styles.pill}>
      {dateLabelFor(date)} <span className={styles.chevron}>›</span>
    </button>
  )
}
