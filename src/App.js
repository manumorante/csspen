import React from 'react'
import { Route, Router } from 'wouter'
import useHashLocation from './hooks/useHashLocation'
import { PensContextProvider } from './context/PensContext'
import Home from './pages/Home'
import Playground from './pages/Playground'
import Author from './pages/Author'
import Header from './components/Header'

export default function App() {
  return (
    <div id='App' className='app'>
      <PensContextProvider>
        <Router hook={useHashLocation}>
          <Header/>

          <Route path='/' component={Home} />
          <Route path='/pen/:id' component={Playground} />
          <Route path='/author' component={Author} />
        </Router>
      </PensContextProvider>
    </div>
  )
}
