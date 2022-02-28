import { supabase } from './supabase'

export const getPens = async () => {
  let { data, error } = await supabase
    .from('pens')
    .select('*')
    .order('id', 'ASC')
  if (error) {
    console.error('Error:', error)
  } else {
    return data
  }
}
