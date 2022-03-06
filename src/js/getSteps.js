import { supabase } from './supabase'

export const getSteps = async (slug) => {
  if(slug === undefined) return

  let { data, error } = await supabase
    .from('pen_steps')
    .select('info, code')
    .eq('slug', slug)
    .order('num', 'ASC')
  if (error) {
    console.error('Error:', error)
  } else {
    return data
  }
}
