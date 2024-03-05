import { useContext, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home/Home'
import { AuthContext } from './contexts/AuthContext'
import { AuthContextProvider } from './contexts/AuthContext'

function App() {
  const [count, setCount] = useState(0)

  const {currentUser, setCurrentUser} = useContext(AuthContext)

  return (
    <div className='p-4 h-screen relative w-full flex justify-center items-center'>
      <Routes>
        <Route path='/' element={currentUser ? <Home /> : <Navigate to={"/signin"} />} />
        <Route path='/signin' element={currentUser  ? <Navigate to='/' /> : <Signin/>} />
        <Route path='/signup' element={currentUser  ? <Navigate to='/' /> : <Signup/>} />
      </Routes>
    </div>
  )
}

export default App
