import { supabase } from './supabase'

export async function getPens() {
  let { data } = await supabase
    .from('pens')
    .select('*, steps (*)')
    .order('order', { ascending: true })
    .order('num', { foreignTable: 'steps' })

  return data
}

export async function getPaths() {
  let { data } = await supabase.from('pens').select('id')

  return data.map((pen) => `/${pen.id}`)
}
