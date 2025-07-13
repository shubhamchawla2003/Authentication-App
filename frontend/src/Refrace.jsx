import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Refrace = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      setIsAuthenticated(true);
      if(location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/login'){
        navigate('/home');
      }
    }
  },[location,navigate,setIsAuthenticated])
  return (
    null
  )
}

export default Refrace
