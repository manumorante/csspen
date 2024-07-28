import { createClient, SupabaseClient } from "@/utils/supabase/server"
import { Pen } from "@/types"

let supabase: SupabaseClient

async function createSupabaseClient(): Promise<SupabaseClient> {
  if (!supabase) {
    supabase = createClient()
  }
  return supabase
}

createSupabaseClient()

export async function getPens(): Promise<Pen[]> {
  const { data } = await supabase
    .from("pens")
    .select("*, steps (*)")
    .order("order", { ascending: true })
    .order("num", { foreignTable: "steps" })
  // .match({ visible: true })

  return data as Pen[]
}

export async function getPen({ penID }: { penID: string }): Promise<Pen> {
  const { data } = await supabase
    .from("pens")
    .select("*, steps (*)")
    .order("num", { foreignTable: "steps" })
    .match({ id: penID })
    .single()

  return data as Pen
}

export async function getPensAndPen({
  penID,
}: {
  penID: string
}): Promise<{ pens: Pen[]; pen: Pen | null }> {
  const pens = await getPens()
  const pen = pens.find((pen) => pen.id === penID) || null

  return { pens, pen }
}

// Update Pen
export async function dbUpdatePen({
  id,
  name,
  info,
  html,
  brandcolor,
  textcolor,
  bgcolor,
}: Pen) {
  let { error } = await supabase
    .from("pens")
    .update({ name, info, html, brandcolor, textcolor, bgcolor })
    .match({ id })
  if (error)
    console.error(
      `dbUpdatePen: id(${id} name(${name}) info(${info}) html(${html})`,
      error
    )
  return error
}

// Update step data
async function _updateStep({
  penID,
  num,
  update,
}: {
  penID: string
  num: number
  update: any
}) {
  let { error } = await supabase
    .from("steps")
    .update(update)
    .match({ pen_id: penID, num })
  if (error)
    console.error(
      `updateStepCss: penID(${penID}) num(${num}) update(${update})`,
      error
    )
  return error
}

// Update step css, and info
export async function dbUpdateStep({
  penID,
  num,
  css,
  info,
}: {
  penID: string
  num: number
  css: string
  info: string
}) {
  return _updateStep({ penID, num, update: { css, info } })
}

// Create new Step
export async function dbCreateStep({
  pen_id,
  num,
  info = "New step...",
  css,
}: {
  pen_id: string
  num: number
  info: string
  css: string
}) {
  let { error } = await supabase
    .from("steps")
    .insert({ pen_id, num, info, css })
  if (error)
    console.error(
      `dbCreateStep: penID(${pen_id}) num(${num}) info(${info}) css(${css})`,
      error
    )
  return error
}

// Create new Pen
export async function dbCreatePen({
  id,
  name,
  info,
  html,
  brandcolor,
  textcolor,
  bgcolor,
}: Pen) {
  const result = await supabase.from("pens").select("id")
  const order = result.data ? result.data.length + 1 : 1

  let { error } = await supabase.from("pens").insert({
    id,
    name,
    info,
    html,
    brandcolor,
    textcolor,
    bgcolor,
    order,
    visible: false,
  })
  if (error)
    console.error(
      `dbCreatePen: id(${id}) name(${name}) info(${info}) order(${order})`,
      error
    )

  // Create de first default step
  const css = `.${id} { width: 100px; height: 100px; background: red; }`
  await supabase
    .from("steps")
    .insert({ pen_id: id, num: 1, info: "First step", css })
  return error
}

// Delete pen from pens table and destroy dependents steps
export async function dbDeletePen({ penID }: { penID: string }) {
  let { error } = await supabase.from("pens").delete().match({ id: penID })
  if (error) console.error(`dbDeletePen: penID(${penID})`, error)
  return error
}

// Delete Step
export async function dbDeleteStep({
  penID,
  num,
}: {
  penID: string
  num: number
}) {
  let { error } = await supabase
    .from("steps")
    .delete()
    .match({ pen_id: penID, num })
  if (error) console.error(`dbDeleteStep: penID(${penID}) num(${num})`, error)
  return error
}
