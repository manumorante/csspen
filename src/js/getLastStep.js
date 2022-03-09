import { supabase } from './supabase'

export const getLastStep = async (penID) => {
  if(penID === undefined) {
    console.error(`Error: getLastSteps() penID(${penID})`)
    return false
  }

  let { data: step, error } = await supabase
    .from('pen_steps')
    .select('code')
    .eq('pen_id', penID)
    .order('num', { ascending: false })
    .limit(1)
    .single()
  if (error) {
    console.error(`Error: getLastSteps() penID(${penID})`, error)
  } else {
    return step
  }
}
