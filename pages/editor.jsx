import React, { useEffect, useState } from 'react'
import { getPens } from 'database'
import { supabase } from 'database/supabase'
import cx from 'classnames'
import Cover from '@/Cover'
import Colors from '@/admin/Colors'
import StepByStep from '@/admin/StepByStep'
import PenInfo from '@/admin/PenInfo'
import Header from '@/admin/Header'

function Pen({ pen }) {
  const [isOpen, setIsOpen] = useState(false)
  const { id, name, info, html, steps, colors } = pen
  const css = steps[steps.length - 1].css

  return (
    <div className='Pen bg-gradient-to-t from-black/10 hover:from-black/20'>
      <div className={cx('flex justify-between')}>
        <div className='w-full flex items-center gap-3'>
          <div
            className='cursor-pointer'
            onClick={() => {
              setIsOpen(!isOpen)
            }}>
            <Cover html={html} css={css} bg={colors.c3} size={80} />
          </div>
          <PenInfo penID={id} name={name} info={info} isOpen={isOpen} />
          <div className='flex flex-col gap-2 mr-3'>
            <Colors colors={colors} />
            <div className=' text-right'>
              {steps.length} {steps.length > 1 ? <span>steps</span> : <span>step</span>}
            </div>
          </div>
        </div>
      </div>

      {isOpen && <StepByStep pen={pen} />}
    </div>
  )
}

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

      <div className='Pens flex flex-col'>
        {pens.map((pen) => (
          <Pen pen={pen} key={pen.id} />
        ))}
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
