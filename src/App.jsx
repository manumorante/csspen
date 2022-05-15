import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Pen from './pages/Pen'
import PenAlone from './pages/PenAlone'
import Stories from './pages/Stories'

function App() {
  return (
    <BrowserRouter>
      <main className='w-full h-full overflow-hidden'>
        <Routes>
          <Route path='/' element={<Navigate replace to='/pen/heart' />} />
          <Route path='/pen/:slug' element={<Pen />} />
          <Route path='/stories' element={<Stories />} />
          <Route path='/alone/:slug' element={<PenAlone />} />
          <Route path='*' element={<Navigate replace to='/pen/heart' />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
export default App
