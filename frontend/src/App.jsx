import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Refrace from './Refrace'
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoutes = ({element}) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className=' '>
      <Refrace setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element ={<Navigate to="/login" />} />
        <Route path='/home' element ={<PrivateRoutes element={<Home/>} />} />
        <Route path='/login' element ={<Login/>} />
        <Route path='/signup' element ={<Signup/>} />
      </Routes>
    </div>
  )
}

export default App
