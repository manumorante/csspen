import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// UserProvider es una prueba para usar contexto.
// La idea es definir uno global y cargarlo con lo jsuto.
import { UserProvider } from './js/UserProvider'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
