import { useAuth } from '../../hooks/useAuth'
import styles from './SignOutButton.module.css'

export function SignOutButton() {
  const { signOut } = useAuth()

  return (
    <button type="button" onClick={signOut} className={styles.button} aria-label="Sign out">
      <span className={styles.icon}>
        <span className={styles.bracket} />
        <span className={styles.shaft} />
        <span className={styles.arrowhead} />
      </span>
    </button>
  )
}
