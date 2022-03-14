import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Profile from './components/Profile'
import Pen from './pages/Pen'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from='/' to='/pen/heart' exact />
        <Route path='/pen/:slug' component={Pen} />
        <Route path='/profile' component={Profile} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
