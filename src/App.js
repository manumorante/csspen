import React from 'react'
import { Route, Router } from 'wouter'
import useHashLocation from './hooks/useHashLocation'
import Home from './pages/Home'
import Pen from './pages/Pen'
import Author from './pages/Author'

export default function App() {
  return (
    <div id='App' className='App'>
      <Router hook={useHashLocation}>
        <Route path='/' component={Home} />
        <Route path='/pen/:id' component={Pen} />
        <Route path='/author' component={Author} />
      </Router>
    </div>
  )
}
