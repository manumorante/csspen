import { supabase } from './supabase'

// Get all `pens` and `steps` ordered ascending by `order`
export async function getPens() {
  let { data } = await supabase
    .from('pens')
    .select('*, steps (*)')
    .order('order', { ascending: true })
    .order('num', { foreignTable: 'steps' })

  return data
}

// Update Pen dada
export async function updatePenData({ penID, update }) {
  let { error } = await supabase.from('pens').update(update).match({ id: penID })

  if (error) {
    console.error(error)
    return false
  }

  return true
}

// Update step dada
export async function updateStepData({ penID, step, update }) {
  let { error } = await supabase.from('steps').update(update).match({ pen_id: penID, num: step })

  if (error) {
    console.error(error)
    return false
  }

  return true
}

export async function getPaths() {
  let { data } = await supabase.from('pens').select('id')

  return data.map((pen) => `/${pen.id}`)
}
