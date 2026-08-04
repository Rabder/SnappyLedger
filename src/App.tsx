import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { LoginScreen } from './components/auth/LoginScreen'
import { QuickLogScreen } from './components/quicklog/QuickLogScreen'
import { HistoryScreen } from './components/history/HistoryScreen'

function App() {
  const { user, loading, signOut } = useAuth()
  const [activeScreen, setActiveScreen] = useState<'log' | 'history'>('log')

  if (loading) {
    return <div style={{ padding: 24 }}>Loading…</div>
  }

  if (!user) {
    return <LoginScreen />
  }

  return (
    <>
      {activeScreen === 'log' ? (
        <QuickLogScreen onNavigate={setActiveScreen} />
      ) : (
        <HistoryScreen onNavigate={setActiveScreen} />
      )}
      {/* Dev-only affordance, not part of the design spec — real screens have no auth UI. */}
      <button
        type="button"
        onClick={signOut}
        style={{
          position: 'fixed',
          top: 8,
          right: 8,
          background: 'none',
          border: 'none',
          color: 'var(--color-text-faint)',
          fontSize: 10,
          opacity: 0.6,
          cursor: 'pointer',
        }}
      >
        Sign out
      </button>
    </>
  )
}

export default App
