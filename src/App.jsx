import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { UserProvider } from './js/UserProvider'
import Footer from './components/Footer'
import Pen from './pages/Pen'
import Home from './pages/Home'
import Profile from './pages/Profile'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className='App w-screen h-screen flex flex-col overflow-hidden'>
          <Switch>
            <Redirect from='/' to='/pen/heart' exact />
            <Route path='/pen/:slug' component={Pen} />
            <Route path='/profile' component={Profile} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
