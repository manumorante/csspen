import React from 'react'
import Base from './Base'
import { ChevronDoubleRightIcon } from '@heroicons/react/solid'

export default function Right2x({ acc }) {
  return (
    <Base acc={acc}>
      <ChevronDoubleRightIcon className='w-6 h-6' />
    </Base>
  )
}
