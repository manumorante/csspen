import React, { useEffect } from 'react'
import ListOfPens from '../../components/ListOfPens'
import { usePens } from '../../hooks/usePens'

export default function Home () {
  const { loading, pens } = usePens()

  useEffect(function () {
    // console.log('efecto', pens)
  }, [loading, pens])


  return (
    <div className='Page Home'>
      <h2 className='Page__title'>Home</h2>

      {loading
        ? <div>loading</div>
        : <ListOfPens pens={pens}/>
      }

    </div>
  )
}
