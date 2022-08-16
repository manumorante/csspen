import React from 'react'
import Base from './Base'
import { StopIcon } from '@heroicons/react/solid'

export default function Stop({ acc }) {
  return (
    <Base acc={acc}>
      <StopIcon className='w-6 h-6' />
    </Base>
  )
}
