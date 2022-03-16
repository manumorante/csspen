import React from 'react'
import { useUser } from '../js/UserProvider'
import Account from '../components/Account'
import Auth from '../components/Auth'

export default function NewPen() {
  const session = useUser()

  return (
    <div className='NewPen'>
      <div>New pen</div>
    </div>
  )
}
