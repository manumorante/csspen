import React from 'react'
import Base from './Base'
import { ChevronLeftIcon } from '@heroicons/react/solid'

export default function Left({ acc }) {
  return (
    <Base acc={acc}>
      <ChevronLeftIcon className='w-6 h-6' />
    </Base>
  )
}
