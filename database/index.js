import { info } from 'autoprefixer'
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

// Add new Step
export async function addStep({ penID, step, info, css }) {
  let { error } = await supabase.from('steps').insert({ pen_id: penID, num: step, info: info, css: css })

  if (error) {
    console.error(error)
    return false
  }

  return true
}

// Delete Step
export async function deleteStep({ penID, num }) {
  let { error } = await supabase.from('steps').delete().match({ pen_id: penID, num })

  if (error) {
    console.error(error)
    return false
  }

  return true
}

export async function getPaths(path = '/') {
  let { data } = await supabase.from('pens').select('id')

  return data.map((pen) => `${path}${pen.id}`)
}

function parseUser(user) {
  const identity = user?.identities[0]?.identity_data || {}
  return { ...user, ...identity }
}

export async function getUserByCookie(req) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  return parseUser(user)
}
