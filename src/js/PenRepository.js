import { supabase } from './supabase'
import { getSteps } from './getSteps'
import mapPen from './penMapper'

export class PenRepository {
  // Get a Pen
  async getPen(penID) {
    let { data: pen, error } = await supabase
      .from('pens')
      .select('*')
      .eq('id', penID)
      .single()
    if (error) {
      console.error(`Error: getPen() penID(${penID})`, error)
    } else {
      let steps = await getSteps(penID)
      if (!steps || steps.length === 0) {
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

  // Get a list of Pens
  async getPens() {
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

  // Get the list of Steps for a Pen
  async getSteps(penID) {
    if (penID === undefined) {
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

  // Get que code for the las step of a Pen
  async getLastStep(penID) {
    if (penID === undefined) {
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
}
