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

// Update step dada
export async function updateStepData({ penID, step, update }) {
  let { error } = await supabase.from('steps').update(update).match({ pen_id: penID, num: step })

  if (error) {
    console.error(error)
    return false
  }

  return true
}

// Update step info
export async function updateStepInfo({ penID, step, info }) {
  return updateStepData({ penID, step, update: { info } })
}

// Update step code
export async function updateStepCode({ penID, step, code }) {
  return updateStepData({ penID, step, update: { code } })
}

export async function getPaths() {
  let { data } = await supabase.from('pens').select('id')

  return data.map((pen) => `/${pen.id}`)
}
