import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Pen from './pages/Pen'
import Profile from './pages/Profile'
import { UserProvider } from './js/UserProvider'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Switch>
          <Redirect from='/' to='/pen/heart' exact />
          <Route path='/pen/:slug' component={Pen} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
