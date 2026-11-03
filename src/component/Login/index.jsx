
import { useState } from 'react'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = () => {
   const history = useHistory()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

 const  onsubmitFailure = (error) =>{
    setErrorMsg(error)
   }
 const  onsubmitSuccess = (jwtToken) =>{
  console.log(jwtToken)

       // const {history} = this.props
       Cookies.set('jwtToken',jwtToken, {expires:30})
       history.replace('/board')
    }


const onSubmitForm = async event => {
  event.preventDefault()
  setErrorMsg('')

  if (!email.trim() || !password.trim()) {
    setErrorMsg('Please enter your email and password.')
    return
  }

  setLoading(true)

  const userDetails = {name, password, email}
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userDetails),
  }

  const url = '/api/auth/login'

  const response = await fetch(url, options)
  console.log(response)
  const data = await response.json()

  if (response.ok) {
    onsubmitSuccess(data.jwtToken)
  } else {
    onsubmitFailure(data.error)
  }

  setLoading(false)
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-8">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Company Name */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">
            ABC Company
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Kanban Task Management
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome Back!
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Please login to your account
          </p>
        </div>

        <form onSubmit={onSubmitForm} className="space-y-5">
          {/*Name*/}
           <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
            Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={event => setName(event.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-20 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-blue-600"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

       
          <div className="flex items-center justify-between text-sm">
            

            <button
              type="button"
              onClick={() => setErrorMsg('Please contact your administrator to reset your password.')}
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-sm text-red-600" role="alert">
              {errorMsg}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        <p className="text-center text-xs text-gray-400 mt-8">
          ABC Company • Kanban Board
        </p>

      </div>
    </div>
  )
}

export default Login
