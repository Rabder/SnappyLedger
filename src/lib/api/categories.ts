import { supabase } from '../supabaseClient'
import type { Category } from '../../types'

// Fixed display order per the design spec — Postgres doesn't guarantee row
// order without an explicit ORDER BY, so we sort client-side instead.
const CATEGORY_ORDER = ['Rent', 'Food', 'Transport', 'Subscriptions', 'Entertainment', 'Other']

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('id,name,color,icon')
  if (error) throw error
  return (data as Category[]).sort(
    (a, b) => CATEGORY_ORDER.indexOf(a.name) - CATEGORY_ORDER.indexOf(b.name),
  )
}
