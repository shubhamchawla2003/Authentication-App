import React from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError } from '../Utility';
import { ToastContainer } from 'react-toastify';
function Home() {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    handleError('Logged out successfully');
    setTimeout(()=>{
      navigate('/');
    },1000)
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold'>Welcome {name}</h1>
      <button onClick={handleLogout} className='bg-blue-500 text-white p-2 rounded-md'>Logout</button>
      <ToastContainer />
    </div>
  )
}

export default Home
