import React from 'react'
import Base from './Base'
import { ChevronRightIcon } from '@heroicons/react/solid'

export default function Right({ acc }) {
  return (
    <Base acc={acc}>
      <ChevronRightIcon className='w-6 h-6' />
    </Base>
  )
}
