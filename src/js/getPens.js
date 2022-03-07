import { supabase } from './supabase'

export const getPens = async () => {
  let { data: pens, error } = await supabase
    .from('pens')
    .select('*')
    .order('order', 'ASC')
  if (error) {
    console.error('Error: getPens()', error)
  } else {
    return pens
  }
}
