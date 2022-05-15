import { client } from './supabase'

export class PenRepository {
  // Get all Pens with all their Steps
  async getPens() {
    let { data: pens, error } = await client
      .from('pens')
      .select('*, steps (*)')
      // .eq('visible', true)
      .order('order')
      .order('num', { foreignTable: 'steps' })
    if (error) {
      console.error('getPens()', error)
    } else {
      return pens
    }
  }

  // Update step
  async updateStep({ penID, step, css, info }) {
    let { error } = await client
      .from('steps')
      .update({ css: css, info: info })
      .match({ pen_id: penID, num: step + 1 })
    if (error) {
      console.error(
        `updateStep() css(${css}) info(${info}) penID(${penID}) step(${step}) Error:`,
        error
      )
    }

    return true
  }

  // New step
  async newStep({ pen_id, num, info, css }) {
    let { error } = await client
      .from('steps')
      .insert({
        pen_id: pen_id,
        num: num,
        info: info,
        css: css,
      })
      .single()

    if (error) {
      console.error(`newStep() Error:`, error)
    }

    return true
  }

  // Delete step
  async deleteStep({ penID, stepNum }) {
    let { error } = await client
      .from('steps')
      .delete()
      .eq('pen_id', penID)
      .eq('num', stepNum)
      .single()

    if (error) {
      console.error(`newStep() Error:`, error)
    }

    return true
  }
}
