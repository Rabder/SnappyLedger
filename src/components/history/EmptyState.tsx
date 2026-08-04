import styles from './EmptyState.module.css'

export function EmptyState() {
  return (
    <div className={styles.empty}>
      <span className={styles.text}>No expenses in this category yet</span>
    </div>
  )
}
