import React from 'react'
import Base from './Base'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'

export default function Left2x({ acc }) {
  return (
    <Base acc={acc}>
      <ChevronDoubleLeftIcon className='w-6 h-6' />
    </Base>
  )
}
