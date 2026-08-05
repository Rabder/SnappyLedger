import { useState } from 'react'
import { applyTheme, getStoredTheme } from '../../utils/theme'
import styles from './ThemeToggle.module.css'

export function ThemeToggle() {
  const [theme, setTheme] = useState(getStoredTheme)

  function handleToggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
  }

  return (
    <button type="button" onClick={handleToggle} className={styles.toggle} aria-label="Toggle theme">
      <span className={theme === 'light' ? `${styles.knob} ${styles.knobLight}` : styles.knob} />
    </button>
  )
}
