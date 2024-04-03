import React, { useEffect, useState } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

function page() {
  const [censorPswd, setCensorPswd] = useState(true)
  const [formdata, setFormdata] = useState({
    User: '',
    Password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormdata({
      ...formdata,
      [name]: value,
    })
  }

  function alert(alert, field) {
    const formElement = document.getElementById(field)

    alertClear()

    const alertDiv = document.createElement('div')
    alertDiv.innerHTML = `<div class="text-light-1 mt-[1svh] text-[0.65rem] md:text-[1.0rem]" id="alert">${alert}</div>`
    formElement.appendChild(alertDiv)
  }

  function alertClear() {
    const existingAlert = document.getElementById('alert')

    if (existingAlert) {
      existingAlert.remove()
    }
  }

  function check(e) {
    e.preventDefault()
    let formData = new FormData(e.target)
    const pswd = formData.get('Password')
    const user = formData.get('User')

    if (true) {
      alert('Invalid Login', 'pswdcontainer')
    } else {
      //logic
    }
  }

  useEffect(() => {
    const handleClick = () => {
      window.location.href = '/auth/reset'
    }

    const element = document.getElementById('forgot')

    if (element) {
      element.addEventListener('click', handleClick)
    }

    return () => {
      if (element) {
        element.removeEventListener('click', handleClick)
      }
    }
  }, [])

  useEffect(() => {
    const handleClick = () => {
      setCensorPswd(!censorPswd)
    }

    const element = document.getElementById('toggle')

    if (element) {
      element.addEventListener('click', handleClick)
    }

    return () => {
      if (element) {
        element.removeEventListener('click', handleClick)
      }
    }
  }, [censorPswd])

  return (
    <main className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <div className="font-poppins font-bold text-2xl md:text-4xl text-center text-gray-800 mb-8">
          Welcome Back
        </div>
        <div className="font-poppins font-semibold text-xl md:text-2xl text-center text-gray-800 mb-12">
          Login to Your Account
        </div>
        <form
          id="1"
          className="flex flex-col items-center justify-center"
          onSubmit={(e) => check(e)}
        >
          <div id="usercontainer" className="mb-6 w-full">
              {/* <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg> */}
            
            <input
              type="text"
              name="User"
              placeholder="Email or Username"
              value={formdata.User}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 sm:text-sm"
              required
            />
          </div>
          <div id="pswdcontainer" className="mb-6 w-full relative">
            <input
              type={`${censorPswd ? 'password' : 'text'}`}
              name="Password"
              placeholder="Password"
              value={formdata.Password}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 sm:text-sm"
              required
            />
            <button
              type="button"
              id="toggle"
              className="absolute top-1/2 right-4 -translate-y-1/2 focus:outline-none"
              onClick={() => setCensorPswd(!censorPswd)}
            >
              {censorPswd ? (
                <HiEyeOff className="h-6 w-6 text-gray-500" />
              ) : (
                <HiEye className="h-6 w-6 text-gray-500" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="bg-gray-800 text-white rounded-[8px] px-[14px] py-[4px] md:px-[18px] md:py-[6px] xl:px-6 xl:py-2 border border-transparent hover:bg-gray-500 focus:outline-none mb-[15px] sm:mb-[20px] lg:mb-[25px]"
          >
            Continue
          </button>
          
          <div className="text-gray-800 text-sm md:text-base mb-6">
            Don't have an account?{' '}
            <a href="/auth/signup" className="text-black-400 font-bold hover:underline">
              Sign Up
            </a>
          </div>
          <button
            type="button"
            id="forgot"
            className="text-blue-400 text-sm md:text-base hover:underline focus:outline-none"
          >
            Forgot Password?
          </button>
        </form>
      </div>
    </main>
  )
}

export default page
