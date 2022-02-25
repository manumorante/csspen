import { useEffect, useState } from 'react'
import { supabase } from '../js/supabase'

export default function usePens () {
  const [pens, setPens] = useState([])

  useEffect(() => {
    fetchPens().catch(console.error)
  }, [])

  const fetchPens = async () => {
    let { data, error } = await supabase
      .from('pens')
      .select('*')
      .order('id', { ascending: false })
    if (error) console.log('error', error)
    else setPens(data)
  }

  return [pens]
}
