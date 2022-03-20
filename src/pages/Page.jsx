import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Page() {
  return (
    <div className='[page]'>
      <h1>Page</h1>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
