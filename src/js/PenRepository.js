import { supabase } from './supabase'

export class PenRepository {
  // Get a Pen
  async getPen(penID) {
    let { data: pen, error } = await supabase
      .from('pens')
      .select('*')
      .eq('id', penID)
      .single()
    if (error) {
      console.error(`getPen() penID(${penID})`, error)
      return false
    } else {
      return pen
    }
  }

  // Get a list of Pens
  async getPens() {
    let { data: pens, error } = await supabase
      .from('pens')
      .select('*')
      .order('order', 'ASC')
    if (error) {
      console.error('getPens()', error)
    } else {
      return pens
    }
  }

  // Get the list of Steps for a Pen
  async getSteps(penID) {
    if (!penID) {
      console.error(`getSteps() penID(${penID})`)
      return false
    }

    let { data: steps, error } = await supabase
      .from('pen_steps')
      .select('info, code')
      .eq('pen_id', penID)
      .order('num', 'ASC')
    if (error) {
      console.error(`getSteps() penID(${penID})`, error)
    } else {
      return steps
    }
  }

  // Get que code for the las step of a Pen
  async getLastStep(penID) {
    if (penID === undefined) {
      console.error(`getLastSteps() penID(${penID})`)
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
      console.error(`getLastSteps() penID(${penID})`, error)
    } else {
      return step
    }
  }

  // Update step
  async updateStep({ penID, step, code, info }) {
    let { error } = await supabase
      .from('pen_steps')
      .update({ code: code, info: info })
      .match({ pen_id: penID, num: step + 1 })
    if (error) {
      console.error(
        `updateStep() code(${code}) info(${info}) penID(${penID}) step(${step}) Error:`,
        error
      )
    }

    return true
  }
}
