import React, { useEffect, useState } from 'react'
import { supabase } from '../js/supabase'
import PenDB from './PenDB'

export default function PensDB () {
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

  if(!pens.length) return <div>Loading...</div>

  return (
    <div className='PenList'>
      {pens.map((pen) => (
        <PenDB key={pen.id} pen={pen} />
      ))}
    </div>
    )
}
