import { supabase } from './supabase'
import mapPen from './mapPen'

export const getPen = async (id) => {
  let { data, error } = await supabase
    .from('pens')
    .select('*')
    .eq('slug', id)
    .single()
  if (error) {
    console.error('error', error)
  } else {
    const mappedPen = mapPen(data)
    if(!mappedPen) {
      console.error('Error: mapping pen', 'data', data)
      return false
    }

    return mappedPen
  }
}
