import { CategoryIcon } from '../shared/CategoryIcon'
import { formatMoney } from '../../utils/money'
import { formatFullDate } from '../../utils/date'
import type { Category, LogEntry } from '../../types'
import styles from './DetailSheet.module.css'

interface DetailSheetProps {
  log: LogEntry
  category: Category | undefined
  onClose: () => void
}

export function DetailSheet({ log, category, onClose }: DetailSheetProps) {
  const label = log.note?.trim() || category?.name || 'Uncategorized'

  return (
    <>
      <div onClick={onClose} className={styles.backdrop} />
      <div className={styles.sheet}>
        <div className={styles.grabHandle} />
        <div className={styles.headerRow}>
          {category && <CategoryIcon category={category} size={44} />}
          <div className={styles.headerText}>
            <span className={styles.label}>{label}</span>
            <span className={styles.meta}>
              {category?.name ?? 'Uncategorized'} · {formatFullDate(new Date(log.date))}
            </span>
          </div>
        </div>
        <div className={styles.amount}>{formatMoney(log.amount)}</div>
        <button type="button" onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </>
  )
}
