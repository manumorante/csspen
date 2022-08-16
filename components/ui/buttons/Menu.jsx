import React from 'react'
import Base from './Base'
import { MenuIcon } from '@heroicons/react/solid'

export default function Menu({ acc }) {
  return (
    <Base acc={acc}>
      <MenuIcon className='w-6 h-6' />
    </Base>
  )
}
