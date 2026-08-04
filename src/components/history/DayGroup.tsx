import { formatMoney } from '../../utils/money'
import { LogRow } from './LogRow'
import type { Category, LogEntry } from '../../types'
import type { LogDayGroup } from '../../utils/groupLogsByDay'
import styles from './DayGroup.module.css'

interface DayGroupProps {
  group: LogDayGroup
  categories: Category[]
  onSelectLog: (log: LogEntry) => void
}

export function DayGroup({ group, categories, onSelectLog }: DayGroupProps) {
  return (
    <div className={styles.group}>
      <div className={styles.header}>
        <span className={styles.dayLabel}>{group.dateLabel}</span>
        <span className={styles.subtotal}>{formatMoney(group.subtotal)}</span>
      </div>
      <div className={styles.rows}>
        {group.entries.map((log) => (
          <LogRow
            key={log.id}
            log={log}
            category={categories.find((category) => category.id === log.category_id)}
            onClick={() => onSelectLog(log)}
          />
        ))}
      </div>
    </div>
  )
}
