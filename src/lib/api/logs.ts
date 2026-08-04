import { supabase } from '../supabaseClient'
import type { LogEntry } from '../../types'

export async function insertLog(entry: {
  amount: number
  category_id: string
  date: string
  note: string | null
  user_id: string
}): Promise<void> {
  const { error } = await supabase.from('logs').insert(entry)
  if (error) throw error
}

export async function fetchLogs(userId: string): Promise<LogEntry[]> {
  const { data, error } = await supabase
    .from('logs')
    .select('id,date,note,amount,category_id,user_id')
    .eq('user_id', userId)
    .order('date', { ascending: false })
  if (error) throw error
  return data as LogEntry[]
}
