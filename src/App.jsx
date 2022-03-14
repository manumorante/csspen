import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Profile from './components/Profile'
import Home from './pages/Home'
import Pen from './pages/Pen'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/pen/:slug' component={Pen} />
        <Route path='/profile' component={Profile} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
