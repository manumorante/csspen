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
          <Route path='/' element={<Navigate replace to='/heart' />} />
          <Route path='/:slug' element={<Pen />} />
          <Route path='/stories' element={<Stories />} />
          <Route path='/pen/:slug/:step' element={<PenAlone />} />
          <Route path='/pen/:slug' element={<PenAlone />} />
          <Route path='*' element={<Navigate replace to='/heart' />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
export default App
