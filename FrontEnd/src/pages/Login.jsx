import { useContext, useEffect, useState } from "react"
import {ShopContext} from "../Context/ShopContext"
import axios from "axios"
import { toast } from "react-toastify"

const Login = () => {
  const[currrenState,setCurrentState]=useState('Login')
  // token add
  const{token,setToken,navigate,backendUrl}=useContext(ShopContext)
  const [name,setName]=useState('')
  const[password,setPassword]=useState('')
  const[email,setEmail]=useState('')

  const [loading,setLoading]=useState(false)

  const onsubmitHandler=async(event)=>{
    event.preventDefault()

    try {
        setLoading(true)

      if (currrenState === 'Sign Up') {
        const response= await axios.post(backendUrl + '/api/user/register',{name,email,password})

        if (response.data.success) {
    setToken(response.data.token)
    localStorage.setItem('token', response.data.token)
    navigate('/')

        }else{
          toast.error(response.data.message)
        }

      }
      else{
        // Authentication login
        const response =await axios.post(backendUrl + '/api/user/login',{email,password})
        // reponse
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          // navigate('/')
        }else{
          toast.error(response.data.message)
        }
      }

    }catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)

    }finally {
  setLoading(false)
}
  }
  useEffect(()=>{
    if (token) {
      navigate('/')
  
    }
  },[token])

  return (
    <div>
      <form onSubmit={onsubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">

        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currrenState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {currrenState === 'Login' ? '' :
        <input
          onChange={(e)=>setName(e.target.value)}
          value={name}
          className="w-full border border-gray-800 px-3 py-2"
          type="name"
          placeholder="Name"
          required
        />}

        <input
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          className="w-full border border-gray-800 px-3 py-2"
          type="email"
          placeholder="Email"
          required
        />

        <input
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          className="w-full border border-gray-800 px-3 py-2"
          type="password"
          placeholder="Password"
          required
        />

        <div className="w-full justify-between flex text-sm mt-[-8px]">
          <p>Forget Password ?</p>

          {
            currrenState === 'Login' ?
            <p onClick={()=>setCurrentState('Sign Up')} className="cursor-pointer">
              Create Account
            </p> :
            <p onClick={()=>setCurrentState('Login')} className="cursor-pointer">
              Login Here
            </p>
          }

        </div>

        <button
  type="submit"
  disabled={loading}
  className="bg-black cursor-pointer text-white font-light px-8 py-2 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading
    ? 'Loading...'
    : currrenState === 'Login'
      ? 'Sign In'
      : 'Sign Up'
  }
</button>

        

      </form>
    </div>
  )
}

export default Login