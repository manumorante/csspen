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

// Update Pen
export async function dbUpdatePen({ id, name, info, html, brandcolor, textcolor, bgcolor }) {
  let { error } = await supabase.from('pens').update({ name, info, html, brandcolor, textcolor, bgcolor }).match({ id })
  if (error) console.error(`dbUpdatePen: id(${id} name(${name}) info(${info}) html(${html})`, error)
  return error
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
export async function dbUpdateStep({ penID, num, css, info }) {
  return _updateStep({ penID, num, update: { css, info } })
}

// Create new Step
export async function dbCreateStep({ penID, num, info = 'New step...', css }) {
  let { error } = await supabase.from('steps').insert({ pen_id: penID, num, info, css })
  if (error) console.error(`dbCreateStep: penID(${penID}) num(${num}) info(${info}) css(${css})`, error)
  return error
}

// Create new Pen
export async function dbCreatePen({ id, name, info, html, brandcolor, textcolor, bgcolor }) {
  const order = (await supabase.from('pens').select('id')).data.length + 1

  let { error } = await supabase
    .from('pens')
    .insert({ id, name, info, html, brandcolor, textcolor, bgcolor, order, visible: false })
  if (error) console.error(`dbCreatePen: id(${id}) name(${name}) info(${info}) order(${order})`, error)

  // Create de first default step
  const css = `.${id} { width: 100px; height: 100px; background: red; }`
  await supabase.from('steps').insert({ pen_id: id, num: 1, info: 'First step', css })
  return error
}

// Delete Pen
export async function dbDeletePen({ penID }) {
  if (!penID || penID === '' || penID === {}) return false

  let { error: pensError } = await supabase.from('pens').delete().match({ id: penID })
  // let { error: stepsError } = await supabase.from('steps').delete().match({ pen_id: penID })

  if (pensError) console.error(`dbDeletePen: penID(${penID})`, pensError)
  return pensError
}

// Delete Step
export async function dbDeleteStep({ penID, num }) {
  let { error } = await supabase.from('steps').delete().match({ pen_id: penID, num })
  if (error) console.error(`dbDeleteStep: penID(${penID}) num(${num})`, error)
  return error
}

export async function getUserByCookie(req) {
  function parseUser(user) {
    const identity = user?.identities[0]?.identity_data || {}
    return { ...user, ...identity }
  }

  const { user } = await supabase.auth.api.getUserByCookie(req)
  return parseUser(user)
}
