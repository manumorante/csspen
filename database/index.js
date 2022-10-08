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

// Update step data
async function _updateStep({ penID, num, update }) {
  let { error } = await supabase.from('steps').update(update).match({ pen_id: penID, num })
  if (error) console.error(`updateStepCss: penID(${penID}) num(${num}) update(${update})`, error)
  return error
}

// Update step css
export async function updateStepCss({ penID, num, css }) {
  return _updateStep({ penID, num, update: { css } })
}

// Update step info
export async function updateStepInfo({ penID, num, info }) {
  return _updateStep({ penID, num, update: { info } })
}

// Update step css, and info
export async function updateStep({ penID, num, css, info }) {
  return _updateStep({ penID, num, update: { css, info } })
}

export async function swapCSS({ penID, num1, num2 }) {
  let { data: steps } = await supabase.from('steps').select('css').match({ pen_id: penID }).in('num', [num1, num2])

  let css1 = steps.find((step) => step.num === num1).css
  let css2 = steps.find((step) => step.num === num2).css

  let { error: error1 } = await supabase.from('steps').update({ css: css2 }).match({ pen_id: penID, num: num1 })

  let { error: error2 } = await supabase.from('steps').update({ css: css1 }).match({ pen_id: penID, num: num2 })

  if (error1 || error2) {
    console.error(error1 || error2)
    return false
  }

  return true
}

// Add new Step
export async function addStep({ penID, num, info = 'New step...', css }) {
  let { error } = await supabase.from('steps').insert({ pen_id: penID, num, info: info, css: css })

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
