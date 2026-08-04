import styles from './AmountCard.module.css'

interface AmountCardProps {
  value: string
  onChange: (value: string) => void
  shake?: boolean
}

export function AmountCard({ value, onChange, shake }: AmountCardProps) {
  return (
    <div className={shake ? `${styles.card} ${styles.shake}` : styles.card}>
      <span className={styles.currency}>$</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        inputMode="decimal"
        placeholder="0"
        className={styles.input}
      />
    </div>
  )
}
