import { supabase } from './supabase'

export const getSteps = async (penID) => {
  if(penID === undefined) {
    console.error(`Error: getSteps() penID(${penID})`)
    return false
  }

  let { data: steps, error } = await supabase
    .from('pen_steps')
    .select('info, code')
    .eq('pen_id', penID)
    .order('num', 'ASC')
  if (error) {
    console.error(`Error: getSteps() penID(${penID})`, error)
  } else {
    return steps
  }
}
