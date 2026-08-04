import { dateLabelFor } from '../../utils/date'
import styles from './DatePill.module.css'

interface DatePillProps {
  date: Date
  onClick: () => void
}

export function DatePill({ date, onClick }: DatePillProps) {
  return (
    <button type="button" onClick={onClick} className={styles.pill}>
      {dateLabelFor(date)} <span className={styles.chevron}>›</span>
    </button>
  )
}
