import { useAuth } from './hooks/useAuth'
import { LoginScreen } from './components/auth/LoginScreen'
import { QuickLogScreen } from './components/quicklog/QuickLogScreen'

function App() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return <div style={{ padding: 24 }}>Loading…</div>
  }

  if (!user) {
    return <LoginScreen />
  }

  return (
    <>
      <QuickLogScreen />
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
