import { useState } from 'react'
import { useCategories } from '../../hooks/useCategories'
import { useLogs } from '../../hooks/useLogs'
import { groupLogsByDay } from '../../utils/groupLogsByDay'
import { CategoryFilterChips } from './CategoryFilterChips'
import { DayGroup } from './DayGroup'
import { EmptyState } from './EmptyState'
import { DetailSheet } from './DetailSheet'
import { BottomTabBar } from '../layout/BottomTabBar'
import type { LogEntry } from '../../types'
import styles from './HistoryScreen.module.css'

interface HistoryScreenProps {
  onNavigate: (screen: 'log' | 'history') => void
}

export function HistoryScreen({ onNavigate }: HistoryScreenProps) {
  const { categories } = useCategories()
  const { logs } = useLogs()
  const [categoryFilter, setCategoryFilter] = useState<string | 'all'>('all')
  const [detailLog, setDetailLog] = useState<LogEntry | null>(null)

  const filteredLogs =
    categoryFilter === 'all' ? logs : logs.filter((log) => log.category_id === categoryFilter)
  const groups = groupLogsByDay(filteredLogs)
  const detailCategory = detailLog
    ? categories.find((category) => category.id === detailLog.category_id)
    : undefined

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <span className={styles.title}>History</span>
      </div>

      <CategoryFilterChips
        categories={categories}
        selected={categoryFilter}
        onSelect={setCategoryFilter}
      />

      <div className={styles.list}>
        {groups.length === 0 ? (
          <EmptyState />
        ) : (
          groups.map((group) => (
            <DayGroup
              key={group.date.getTime()}
              group={group}
              categories={categories}
              onSelectLog={setDetailLog}
            />
          ))
        )}
      </div>

      <BottomTabBar active="history" onNavigate={onNavigate} />

      {detailLog && (
        <DetailSheet
          log={detailLog}
          category={detailCategory}
          onClose={() => setDetailLog(null)}
        />
      )}
    </div>
  )
}
