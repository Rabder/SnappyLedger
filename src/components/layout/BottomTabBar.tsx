import styles from './BottomTabBar.module.css'

interface BottomTabBarProps {
  active: 'log' | 'history'
  onNavigate: (screen: 'log' | 'history') => void
}

export function BottomTabBar({ active, onNavigate }: BottomTabBarProps) {
  return (
    <div className={styles.bar}>
      <button
        type="button"
        onClick={() => onNavigate('log')}
        className={styles.tab}
        style={{ opacity: active === 'log' ? 1 : 0.55 }}
      >
        <span className={active === 'log' ? styles.iconFilled : styles.iconOutline} />
        <span className={active === 'log' ? styles.labelActive : styles.label}>Log</span>
      </button>
      <button
        type="button"
        onClick={() => onNavigate('history')}
        className={styles.tab}
        style={{ opacity: active === 'history' ? 1 : 0.55 }}
      >
        <span className={active === 'history' ? styles.iconFilled : styles.iconOutline} />
        <span className={active === 'history' ? styles.labelActive : styles.label}>History</span>
      </button>
    </div>
  )
}
