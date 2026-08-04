import styles from './BottomTabBar.module.css'

interface BottomTabBarProps {
  active: 'log' | 'history'
}

export function BottomTabBar({ active }: BottomTabBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.tab} style={{ opacity: active === 'log' ? 1 : 0.55 }}>
        <span className={active === 'log' ? styles.iconFilled : styles.iconOutline} />
        <span className={active === 'log' ? styles.labelActive : styles.label}>Log</span>
      </div>
      <div className={styles.tab} style={{ opacity: active === 'history' ? 1 : 0.55 }}>
        <span className={active === 'history' ? styles.iconFilled : styles.iconOutline} />
        <span className={active === 'history' ? styles.labelActive : styles.label}>History</span>
      </div>
    </div>
  )
}
