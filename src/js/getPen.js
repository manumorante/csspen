import { supabase } from './supabase'
import { getSteps } from './getSteps'
import mapPen from './mapPen'

export const getPen = async (id) => {
  let { data, error } = await supabase
    .from('pens')
    .select('*')
    .eq('slug', id)
    .single()
  if (error) {
    console.error('Error:', error)
  } else {

    let steps = await getSteps(id)
    if(!steps) {
      console.error(`Error: getSteps response hash(${id}) steps(${steps})`)
      return false
    }

    const mappedPen = mapPen(data, steps)
    if (!mappedPen) {
      console.error('Error: mapping pen', 'data', data)
      return false
    }

    return mappedPen
  }
}
