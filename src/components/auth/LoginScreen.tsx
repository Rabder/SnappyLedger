import { useState, type CSSProperties, type FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'

export function LoginScreen() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const { error } =
      mode === 'signin' ? await signIn(email, password) : await signUp(email, password)

    setSubmitting(false)
    if (error) setError(error)
  }

  return (
    <div style={{ padding: 'calc(24px + env(safe-area-inset-top)) 20px 24px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 24px' }}>
        {mode === 'signin' ? 'Log in' : 'Sign up'}
      </h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
          style={inputStyle}
        />

        {error && <div style={{ color: 'var(--color-error)', fontSize: 13 }}>{error}</div>}

        <button type="submit" disabled={submitting} style={buttonStyle}>
          {submitting ? 'Please wait…' : mode === 'signin' ? 'Log in' : 'Sign up'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(mode === 'signin' ? 'signup' : 'signin')
          setError(null)
        }}
        style={{
          marginTop: 16,
          background: 'none',
          border: 'none',
          color: 'var(--color-text-muted)',
          fontSize: 13,
        }}
      >
        {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
      </button>
    </div>
  )
}

const inputStyle: CSSProperties = {
  background: 'var(--color-tile-default)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  padding: '12px 14px',
  color: 'var(--color-text-primary)',
  fontSize: 15,
}

const buttonStyle: CSSProperties = {
  background: 'var(--color-accent)',
  color: 'white',
  border: 'none',
  borderRadius: 'var(--radius-lg)',
  padding: '14px 0',
  fontSize: 16,
  fontWeight: 700,
  cursor: 'pointer',
}
