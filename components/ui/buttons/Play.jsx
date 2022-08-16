import React from 'react'
import Base from './Base'
import { PlayIcon } from '@heroicons/react/solid'

export default function Play({ acc }) {
  return (
    <Base acc={acc}>
      <PlayIcon className='w-6 h-6' />
    </Base>
  )
}
