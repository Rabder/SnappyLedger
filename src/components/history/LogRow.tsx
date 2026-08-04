import { CategoryIcon } from '../shared/CategoryIcon'
import { formatMoney } from '../../utils/money'
import type { Category, LogEntry } from '../../types'
import styles from './LogRow.module.css'

interface LogRowProps {
  log: LogEntry
  category: Category | undefined
  onClick: () => void
}

export function LogRow({ log, category, onClick }: LogRowProps) {
  const primaryLabel = log.note?.trim() || category?.name || 'Uncategorized'

  return (
    <button type="button" onClick={onClick} className={styles.row}>
      {category && <CategoryIcon category={category} size={36} />}
      <span className={styles.text}>
        <span className={styles.primaryLabel}>{primaryLabel}</span>
        <span className={styles.categoryLabel}>{category?.name ?? 'Uncategorized'}</span>
      </span>
      <span className={styles.amount}>{formatMoney(log.amount)}</span>
    </button>
  )
}
