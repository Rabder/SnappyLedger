import { useAuth } from './hooks/useAuth'
import { useCategories } from './hooks/useCategories'
import { LoginScreen } from './components/auth/LoginScreen'
import { CategoryIcon } from './components/shared/CategoryIcon'

function App() {
  const { user, loading, signOut } = useAuth()
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories()

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

      {categoriesLoading && (
        <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Loading categories…</p>
      )}
      {categoriesError && (
        <p style={{ fontSize: 13, color: 'var(--color-error)' }}>{categoriesError}</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {categories.map((category) => (
          <div
            key={category.id}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
          >
            <CategoryIcon category={category} size={48} />
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              {category.name}
            </span>
          </div>
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
