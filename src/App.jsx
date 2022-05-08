import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Pen from './pages/Pen'
import Profile from './pages/Profile'
import Stories from './pages/Stories'

function App() {
  return (
    <BrowserRouter>
      <main className='w-full h-full overflow-hidden'>
        <Routes>
          <Route path='/' element={<Navigate replace to='/pen/heart' />} />
          <Route path='/pen/:slug' element={<Pen />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/stories' element={<Stories />} />
          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
export default App
