import { supabase } from '../../database/supabase'

const getPens = async (req, res) => {
  let { data: pens, error } = await supabase
    .from('pens')
    .select('*, steps (*)')
    // .eq('visible', true)
    .order('order')
    .order('num', { foreignTable: 'steps' })

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(pens)
}

export default getPens
