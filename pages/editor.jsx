import React, { useEffect, useState } from 'react'
import { getPens } from 'database'
import { supabase } from 'database/supabase'
import Cover from '@/Cover'
import Colors from '@/admin/Colors'
import StepByStep from '@/admin/StepByStep'
import PenInfo from '@/admin/PenInfo'
import Header from '@/admin/Header'

export default function Admin({ user }) {
  const [pens, setPens] = useState([])

  useEffect(() => {
    getPens().then((data) => {
      setPens(data)
    })
  }, [])

  return (
    <div className='Admin bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'>
      <Header user={user} />
      <div className='Pens flex flex-col gap-40 p-8'>
        {pens.map((pen) => {
          const { id, name, info, html, steps, colors } = pen
          const css = steps[steps.length - 1].css
          return (
            <div className='Pen' key={id}>
              <div className='Header flex justify-between mb-8'>
                <div className='NameAndCover flex items-start gap-6 mb-6'>
                  <Cover html={html} css={css} bg={colors.c3} size={80} className='grow-0 rounded-md' />
                  <PenInfo penID={id} name={name} info={info} />
                  <Colors colors={colors} />
                </div>
              </div>

              <StepByStep pen={pen} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/login', permanent: false } }
  }

  // If there is a user, return it.
  return { props: { user } }
}
