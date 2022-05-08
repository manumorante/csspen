import React from 'react'
import ReactDOM from 'react-dom'
import UserProvider from './context/UserProvider'
import AppProvider from './context/AppProvider'
import App from './App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
