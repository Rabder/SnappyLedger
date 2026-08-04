import styles from './SaveArea.module.css'

interface SaveAreaProps {
  isValid: boolean
  helperText: string
  isInvalidAttempt: boolean
  onSave: () => void
}

export function SaveArea({ isValid, helperText, isInvalidAttempt, onSave }: SaveAreaProps) {
  return (
    <div className={styles.area}>
      <div className={styles.grip}>
        <div className={styles.gripHandle} />
      </div>
      <button
        type="button"
        onClick={onSave}
        className={isValid ? styles.saveButton : `${styles.saveButton} ${styles.saveButtonDimmed}`}
      >
        Log it
      </button>
      <div className={isInvalidAttempt ? `${styles.helper} ${styles.helperError}` : styles.helper}>
        {helperText}
      </div>
    </div>
  )
}
