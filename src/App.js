import React from 'react'
import { Route, Router } from 'wouter'
import useHashLocation from './hooks/useHashLocation'
import Pen from './components/Pen'

export default function App() {
  return (
    <div id='App' className='App'>
      <Router hook={useHashLocation}>
        <Route path='/' component={Pen} />
        <Route path='/:id' component={Pen} />
      </Router>
    </div>
  )
}
