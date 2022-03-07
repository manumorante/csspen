import { supabase } from './supabase'
import { getSteps } from './getSteps'
import mapPen from './mapPen'

export const getPen = async (penID) => {
  let { data: pen, error } = await supabase
    .from('pens')
    .select('*')
    .eq('id', penID)
    .single()
  if (error) {
    console.error(`Error: getPen() penID(${penID})`, error)
  } else {

    let steps = await getSteps(penID)
    if(!steps || steps.length === 0) {
      console.error(`Error: getSteps id(${penID}) steps:`, steps)
      return false
    }

    const mappedPen = mapPen(pen, steps)
    if (!mappedPen) {
      console.error(`Error: getPen() mapPen() pen:`, pen)
      return false
    }

    return mappedPen
  }
}
