import { client } from './supabase'

export class PenRepository {
  // Get all Pens with all their Steps
  async getPens() {
    let { data: pens, error } = await client
      .from('pens')
      .select('*, pen_steps (*)')
      .order('order')
      .order('num', { foreignTable: 'pen_steps' })
    if (error) {
      console.error('getPens()', error)
    } else {
      return pens
    }
  }

  // Update step
  async updateStep({ penID, step, code, info }) {
    let { error } = await client
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
