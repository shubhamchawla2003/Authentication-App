import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../Utility'
import { useNavigate } from 'react-router-dom'

function Login() {
  //for navigation
  const navigate = useNavigate()

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    //const {name, value} = e.target;
    /*const copySignupInfo = {...signupInfo};
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);*/
    setLoginInfo(c=>({...c, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {email, password} = loginInfo;
    if(email === '' || password === ''){
      return handleError('Please fill all the fields')
    }
    try{
      const url = 'http://localhost:8080/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const data = await response.json()
      const {success,message,token,name,error} = data;
      if(success){
        localStorage.setItem('token',token);
        localStorage.setItem('name',name)
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/home')
        },1000)
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

     <h1 className="text-2xl font-bold text-center">Login</h1>
     <p className="text-sm text-gray-500 text-center mb-4">Login to your account</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input onChange={handleChange} value={loginInfo.email} name="email" type="email" placeholder="Enter your Email"  className="border border-gray-300 rounded-md p-2" />
          </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input onChange={handleChange} value={loginInfo.password} name="password" type="password" placeholder="Enter your Password"  className="border border-gray-300 rounded-md p-2" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Login</button>
        <p className="text-sm text-gray-500 text-center"> Don't have an account? <Link to="/signup">Signup</Link></p>
      </form>

      <ToastContainer />

    </div>
    </div>
  )
}

export default Login

