import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import { fetchLogs } from '../lib/api/logs'
import type { LogEntry } from '../types'

export function useLogs() {
  const { user } = useAuth()
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    fetchLogs(user.id)
      .then(setLogs)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [user])

  return { logs, loading, error }
}
