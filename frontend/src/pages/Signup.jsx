import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../Utility'
import { useNavigate } from 'react-router-dom'

function Signup() {
  //for navigation
  const navigate = useNavigate()

  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    //const {name, value} = e.target;
    /*const copySignupInfo = {...signupInfo};
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);*/
    setSignupInfo(c=>({...c, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {name, email, password} = signupInfo
    if(name === '' || email === '' || password === ''){
      return handleError('Please fill all the fields')
    }
    try{
      const url = 'http://localhost:8080/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      const data = await response.json()
      const {success,message,error} = data;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/login')
        },2000)
      }else if(error){
        const detail = error?.details?.[0]?.message;
        handleError(detail)
      }else if(!success){
        handleError(message)
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="signup-container flex flex-col items-center justify-center h-screen">
    <div className="flex flex-col gap-4 bg-white p-8 rounded-md shadow-md w-full max-w-md">

     <h1 className="text-2xl font-bold text-center">Signup</h1>
     <p className="text-sm text-gray-500 text-center mb-4">Create an account to get started</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" >Name</label>
          <input onChange={handleChange} value={signupInfo.name} name="name" type="text" placeholder="Enter your Name"  className="border border-gray-300 rounded-md p-2" />
        </div>
        <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input onChange={handleChange} value={signupInfo.email} name="email" type="email" placeholder="Enter your Email"  className="border border-gray-300 rounded-md p-2" />
          </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input onChange={handleChange} value={signupInfo.password} name="password" type="password" placeholder="Enter your Password"  className="border border-gray-300 rounded-md p-2" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Signup</button>
        <p className="text-sm text-gray-500 text-center"> Already have an account? <Link to="/login">Login</Link></p>
      </form>

      <ToastContainer />

    </div>
    </div>
  )
}

export default Signup
