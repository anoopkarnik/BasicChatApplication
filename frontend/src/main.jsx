import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { SocketContext, SocketProvider } from './contexts/SocketContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <AuthContextProvider>
      <SocketProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      </SocketProvider>
    </AuthContextProvider>
  </Router>
)
