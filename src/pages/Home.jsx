import React from 'react'

function Home() {
  return (
    <div className='Home w-screen h-screen flex flex-col overflow-hidden'>
      <header className='Header bg-slate-600 h-12 flex-grow-0'>Topbar</header>

      <div className='Pen bg-blue-300 h-full flex flex-col sm:flex-row'>
        <div className='List bg-slate-500 hidden sm:block sm:w-48'>Editor</div>
        <div className='Editor bg-neutral-600 h-1/2 sm:w-96 sm:h-full'>Editor</div>
        <div className='Stage bg-red-700 flex-grow'>Stage</div>
      </div>

      <footer className='Footer bg-green-600 h-12 flex-grow-0'>Footer</footer>
    </div>
  )
}

export default Home
