import { useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import { useAuth } from './hooks/useAuth'
import { LoginScreen } from './components/auth/LoginScreen'

function App() {
  const { user, loading, signOut } = useAuth()

  // TEMPORARY (milestone 3 check only): prove the Supabase client + env vars
  // work by fetching categories and logging them. Removed once
  // src/hooks/useCategories.ts exists in milestone 5.
  useEffect(() => {
    supabase
      .from('categories')
      .select('*')
      .then(({ data, error }) => {
        if (error) console.error('Supabase fetch error:', error)
        else console.log('Categories from Supabase:', data)
      })
  }, [])

  if (loading) {
    return <div style={{ padding: 24 }}>Loading…</div>
  }

  if (!user) {
    return <LoginScreen />
  }

  return (
    <div style={{ padding: '24px 20px', fontFamily: 'var(--font-sans)' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 24px' }}>
        SnappyLedger
      </h1>
      <p style={{ fontSize: 13, color: 'var(--color-text-muted)', margin: '-16px 0 24px' }}>
        Signed in as {user.email}
      </p>

      <div
        style={{
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 18,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            color: 'var(--color-text-muted)',
            fontSize: 13,
            marginBottom: 4,
          }}
        >
          Amount card (Space Mono)
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 42,
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          $25.00
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[
          ['Rent', 'var(--color-category-rent)'],
          ['Food', 'var(--color-category-food)'],
          ['Transport', 'var(--color-category-transport)'],
          ['Subscriptions', 'var(--color-category-subscriptions)'],
          ['Entertainment', 'var(--color-category-entertainment)'],
          ['Other', 'var(--color-category-other)'],
        ].map(([name, color]) => (
          <span
            key={name}
            style={{
              background: color,
              color: 'var(--color-text-primary)',
              borderRadius: 'var(--radius-pill)',
              padding: '4px 10px',
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {name}
          </span>
        ))}
      </div>

      <button
        type="button"
        style={{
          marginTop: 24,
          width: '100%',
          background: 'var(--color-accent)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-lg)',
          padding: '17px 0',
          fontSize: 17,
          fontWeight: 700,
        }}
      >
        Log it
      </button>

      <button
        type="button"
        onClick={signOut}
        style={{
          marginTop: 12,
          width: '100%',
          background: 'none',
          color: 'var(--color-text-muted)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '12px 0',
          fontSize: 14,
        }}
      >
        Sign out
      </button>
    </div>
  )
}

export default App
