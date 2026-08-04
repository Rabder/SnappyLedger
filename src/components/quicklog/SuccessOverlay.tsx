import { formatMoney } from '../../utils/money'
import type { Category } from '../../types'
import styles from './SuccessOverlay.module.css'

interface SuccessOverlayProps {
  amount: number
  category: Category | undefined
  onLogAnother: () => void
}

export function SuccessOverlay({ amount, category, onLogAnother }: SuccessOverlayProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.checkCircle}>
        <div className={styles.checkmark} />
      </div>
      <span className={styles.title}>Logged!</span>
      <span className={styles.summary}>
        {formatMoney(amount)}
        {category ? ` · ${category.name}` : ''}
      </span>
      <button type="button" onClick={onLogAnother} className={styles.button}>
        Log another
      </button>
    </div>
  )
}
