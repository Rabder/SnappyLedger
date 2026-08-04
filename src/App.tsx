import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { LoginScreen } from './components/auth/LoginScreen'
import { QuickLogScreen } from './components/quicklog/QuickLogScreen'
import { HistoryScreen } from './components/history/HistoryScreen'

function App() {
  const { user, loading } = useAuth()
  const [activeScreen, setActiveScreen] = useState<'log' | 'history'>('log')

  if (loading) {
    return <div style={{ padding: 24 }}>Loading…</div>
  }

  if (!user) {
    return <LoginScreen />
  }

  return activeScreen === 'log' ? (
    <QuickLogScreen onNavigate={setActiveScreen} />
  ) : (
    <HistoryScreen onNavigate={setActiveScreen} />
  )
}

export default App
