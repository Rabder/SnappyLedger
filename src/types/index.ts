export interface Category {
  id: string
  name: string
  color: string
  icon: string
}

export interface LogEntry {
  id: string
  date: string
  note: string | null
  amount: number
  category_id: string
  user_id: string
}
