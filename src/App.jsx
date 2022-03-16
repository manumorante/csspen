import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { UserProvider } from './js/UserProvider'
import { layout } from './styles.js'
import Pen from './pages/Pen'
import Profile from './pages/Profile'
import Header from './components/Header'
import Footer from './components/Footer'
import Layout from './pages/Layout'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <main className={`Main ${layout.main}`}>
          <Header />
          <Switch>
            <Redirect from='/' to='/pen/heart' exact />
            <Route path='/pen/:slug' component={Pen} />
            <Route path='/profile' component={Profile} />
            <Route path='/layout' component={Layout} />
          </Switch>
          <Footer />
        </main>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
