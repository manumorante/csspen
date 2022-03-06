import { supabase } from './supabase'
import mapPens from './mapPens'

export const getPens = async () => {
  let { data, error } = await supabase
    .from('pens')
    .select('*')
    .order('id', 'ASC')
  if (error) {
    console.error('Error:', error)
  } else {
    const mappedPens = mapPens(data)
    if (!mappedPens) {
      console.error('Error: mapping pens', 'data', data)
      return false
    }

    return mappedPens
  }
}
