import { supabase } from '../supabaseClient'
import type { Category } from '../../types'

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('id,name,color,icon')
  if (error) throw error
  return data as Category[]
}
