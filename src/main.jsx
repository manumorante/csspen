import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from './js/UserProvider'
import { KeyStyle as S } from './js/Styles.js'
import Pens from './pages/Pens'
import Pen from './pages/Pen'
import Profile from './pages/Profile'
import Layout from './pages/Layout'
import About from './pages/About'
import Header from './components/Header'
import Footer from './components/Footer'

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <main {...S(['main'])}>
          <Header />
          <Routes>
            <Route path='/' element={<Pens />} />
            <Route path='/pen/:slug' element={<Pen />} />
            <Route path='profile' element={<Profile />} />
            <Route path='about' element={<About />} />
            <Route path='layout' element={<Layout />} />
            <Route path='*' element={<Navigate replace to='/' />} />
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
