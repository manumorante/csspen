import React, { useState } from 'react'
import Image from 'next/future/image'
import cx from 'classnames'
import Link from 'next/link'
import { HomeIcon } from '@heroicons/react/20/solid'
import PenNav from './PenNav'

export default function Header({ user, pens, pen }) {
  console.log('render header')
  const [penNavOpen, setPenNavOpen] = useState(false)
  const email = user?.email
  const avatar_url = user?.avatar_url

  const handlePenClick = () => {
    console.log('handlePenClick')

    setPenNavOpen(false)
    setPenID
  }

  const handlePenNavToggle = () => {
    console.log('handlePenNavToggle')

    setPenNavOpen(!penNavOpen)
  }

  return (
    <div
      className={cx(
        'Header',
        'w-full h-10 fixed top-0 z-50',
        'bg-black/10 ',
        'border-b border-white dark:border-white/10'
      )}>
      <div className='flex justify-between items-start'>
        <div className='Left flex gap-3 items-center'>
          <Link href='/admin'>
            <a className='Title text-lg font-bold pl-8'>
              <HomeIcon className='w-6 h-6' />
            </a>
          </Link>

          {pens && (
            <>
              <button className='py-2 px-3 hover:bg-black/50' onClick={handlePenNavToggle}>
                {pen ? pen.name : 'Pens'}
              </button>
              {penNavOpen && <PenNav pens={pens} onClick={handlePenClick} />}
            </>
          )}
        </div>

        <div className='Right'>
          <div className='EmailAndAvatar flex items-center gap-3'>
            <div>{email}</div>
            <Link href='/profile'>
              <a>
                {avatar_url ? (
                  <Image src={avatar_url} alt={email} width={40} height={40} />
                ) : (
                  <div className='Avatar w-10 h-10 bg-black/20' />
                )}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
