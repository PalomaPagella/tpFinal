import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Header from './Componentes/Header/Header.jsx'
import App from './Componentes/App/App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <App />

  </React.StrictMode>,
)
