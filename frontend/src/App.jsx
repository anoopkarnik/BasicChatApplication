import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home/Home'
import { CurrentUserProvider } from './contexts/currentUserContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <CurrentUserProvider>
          <Layout>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/signin" element={<Signin/>} />
                <Route path="/signup" element={<Signup/>} />
              </Routes>
          </Layout>
        </CurrentUserProvider>
      </Router>
    </>
  )
}

export default App
