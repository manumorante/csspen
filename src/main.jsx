import React from 'react'
import ReactDOM from 'react-dom'
import ApiContext from './context/ApiContext'
import App from './App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <ApiContext>
      <App />
    </ApiContext>
  </React.StrictMode>,
  document.getElementById('root')
)
