"use client";
import React, { useEffect, useState, useRef } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

function Page1() {
  const [step, setStep] = useState(1)
  const [censorPswd, setCensorPswd] = useState(true)
  const [censorPswdCheck, setCensorPswdCheck] = useState(true)
  const [emailOTP, setEmailOTP] = useState('')
  const [formdata, setFormdata] = useState({
    Email: '',
    Username: '',
    Password: '',
    RePassword: '',
    otp: '',
  })
  const [alertMessage, setAlertMessage] = useState('')

  // Create refs for password visibility toggles
  const censorRef = useRef(null)
  const censorCheckRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    if (step !== 3) return

    const handleClick = () => {
      setCensorPswd(!censorPswd)
    }

    const element = censorRef.current
    if (element) {
      element.addEventListener('click', handleClick)
    }

    return () => {
      if (element) {
        element.removeEventListener('click', handleClick)
      }
    }
  }, [censorPswd, step])

  useEffect(() => {
    if (step !== 3) return

    const handleClick = () => {
      setCensorPswdCheck(!censorPswdCheck)
    }

    const element = censorCheckRef.current
    if (element) {
      element.addEventListener('click', handleClick)
    }

    return () => {
      if (element) {
        element.removeEventListener('click', handleClick)
      }
    }
  }, [censorPswdCheck, step])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormdata({
      ...formdata,
      [name]: value,
    })
  }

  const check = (e, stage, action) => {
    e.preventDefault()
    // let formData = null
    if (!action && stage !== 'User') {
      setStep(step - 1)
      setAlertMessage('')
    }

    // Place your validation logic here
    // For example, for the 'User' stage:
    if (action && stage === 'User') {
      let Email = formdata?.Email
      let Username = formdata?.Username

      // Example validation check
      if (Email && Username) {
        setAlertMessage('')
        setStep(step + 1)
        // document.getElementById(step).reset()
        formRef.current.reset()
        setEmailOTP('010101') // Example OTP
      } else {
        setAlertMessage('Invalid Login')
      }
    } else if (action && stage == 'OTP') {
      let OTP = formdata?.otp

      if (OTP != emailOTP) {
        setAlertMessage('Incorrect OTP')
      } else {
        setAlertMessage('')
        setStep(step + 1)
        formRef.current.reset()
      }
    } else if (action && stage == 'Password') {
      let Password = formdata?.Password
      let Check = formdata?.RePassword

      if (Password.length < 8 || Password.length > 20) {
        setAlertMessage(
          'The Password Should Be 8-20 Characters',
          'passwordcontainer',
        )
      } else if (!Password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)) {
        setAlertMessage(
          'Password should contain at least one special character',
          'passwordcontainer',
        )
      } else if (!Password.match(/[A-Z]+/)) {
        setAlertMessage(
          'Password should contain at least one uppercase letter',
          'passwordcontainer',
        )
      } else if (!Password.match(/[a-z]+/)) {
        setAlertMessage(
          'Password should contain at least one lowercase letter',
          'passwordcontainer',
        )
      } else if (!Password.match(/[0-9]+/)) {
        setAlertMessage(
          'Password should contain at least one number',
          'passwordcontainer',
        )
      } else if (Password != Check) {
        setAlertMessage("Passwords don't match", 'repasswordcontainer')
      } else {
        setAlertMessage('')
        console.log('formdata', formdata)
        window.alert(
          formdata['Email'] +
            '\n' +
            formdata['Username'] +
            '\n' +
            formdata['Password'] +
            '\n' +
            formdata['RePassword'],
        )
      }
    }
  }

  // Add similar logic for 'OTP' and 'Password' stages

  return (
    <main className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600">
      {step === 1 && (
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
          <div className="font-poppins text-center font-[700] text-[1.75rem] md:text-[2.0rem] xl:text-[2.2rem] text-blue-500">
            Reset Password
          </div>
          <div className="font-poppins text-center font-[500] text-[1.3rem] md:text-[1.5rem] xl:text-[1.8rem] text-blue-500 mb-[30px] sm:mb-[40px] lg:mb-[50px]">
            Credentials
          </div>
          <form
            id="1"
            ref={formRef}
            className="flex flex-col items-center justify-center"
            onSubmit={(e) => check(e, 'User', true)}
          >
            <div id="emailcontainer" className="mb-6 w-full ">
              <input
                type="text"
                name="Email"
                placeholder="Email"
                value={formdata.Email}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 sm:text-sm"
                required
              />
            </div>
            <div id="usernamecontainer" className="mb-6 w-full ">
              <input
                type="text"
                name="Username"
                placeholder="Username"
                value={formdata.Username}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 sm:text-sm"
                required
              />
            </div>
            {alertMessage ? <p>{alertMessage}</p> : null}
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-[8px] px-[14px] py-[4px] md:px-[18px] md:py-[6px] xl:px-6 xl:py-2 border border-blue-500 hover:bg-blue-600 mb-[15px] sm:mb-[20px] lg:mb-[25px]"
            >
              Continue
            </button>
            <div className="text-gray-800 text-sm md:text-base mb-6">
              Don't have an account?{' '}
              <a
                href="/auth/signup"
                className="text-blue-400 font-bold hover:underline"
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      )}
      {step === 2 && (
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
          <div className="font-poppins text-center font-[700] text-[1.75rem] md:text-[2.0rem] xl:text-[2.2rem] text-blue-500">
            Reset Password
          </div>
          <div className="font-poppins text-center font-[500] text-[1.3rem] md:text-[1.5rem] xl:text-[1.8rem] text-blue-500 mb-[30px] sm:mb-[40px] lg:mb-[50px]">
            We just sent your email an OTP
          </div>
          <form
            id="2"
            ref={formRef}
            className="flex flex-col items-center justify-center gap-8"
            onSubmit={(e) => check(e, 'OTP', true)}
          >
            <div
              id="otpcontainer"
              className=" flex flex-col items-center w-full justify-center "
            >
              <input
                type="text"
                name="otp"
                placeholder="OTP: Email"
                value={formdata.otp}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 sm:text-sm"
                required
              />
            </div>
            {alertMessage ? (
              <p className="text-center">{alertMessage}</p>
            ) : null}
            <div className="w-full grid grid-cols-2 gap-3 mx-auto ">
              <button
                type="button"
                className="bg-blue-500 text-white rounded-[8px] px-[16px] py-[5px] md:px-[18px] md:py-[6px] xl:px-6 xl:py-2 border border-blue-500 hover:bg-blue-600"
                onClick={(e) => check(e, 'OTP', false)}
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-[8px] px-[16px] py-[5px] md:px-[18px] md:py-[6px] xl:px-6 xl:py-2 border border-blue-500 hover:bg-blue-600 "
              >
                Continue
              </button>
            </div>
            <div className="text-gray-800 text-sm md:text-base mb-6">
              Don't have an account?{' '}
              <a href="/auth/signup" className="text-blue-400 hover:underline">
                Sign Up
              </a>
            </div>
          </form>
        </div>
      )}
      {step === 3 && (
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
          <div className="font-poppins text-center font-[700] text-[1.75rem] md:text-[2.0rem] xl:text-[2.2rem] text-blue-500">
            Reset Password
          </div>
          <div className="font-poppins text-center font-[500] text-[1.3rem] md:text-[1.5rem] xl:text-[1.8rem] text-blue-500 mb-[30px] sm:mb-[40px] lg:mb-[50px]">
            New Password
          </div>
          <form
            id="3"
            ref={formRef}
            className="flex flex-col items-center justify-center gap-8"
            onSubmit={(e) => check(e, 'Password', true)}
          >
            <div
              id="passwordcontainer"
              className="w-full flex flex-col items-center justify-center "
            >
              <div className="flex flex-col items-center justify-center w-full relative">
                <input
                  type={`${censorPswd ? 'password' : 'text'}`}
                  name="Password"
                  placeholder="New Password"
                  value={formdata.Password}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 sm:text-sm"
                  required
                />
                <div
                  className="absolute right-0 cursor-pointer mr-2 text-[#7a7a7a]"
                  id="censor"
                >
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
              </div>
            </div>
            <div
              id="repasswordcontainer"
              className="w-full flex flex-col items-center justify-center "
            >
              <div className="flex w-full flex-col items-center justify-center relative">
                <input
                  type={`${censorPswdCheck ? 'password' : 'text'}`}
                  name="RePassword"
                  placeholder="Retype New Password"
                  value={formdata.RePassword}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 sm:text-sm"
                  required
                />
                <div
                  className="absolute right-0 cursor-pointer mr-2 text-[#7a7a7a]"
                  id="censorcheck"
                >
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
              </div>
            </div>
            {alertMessage ? (
              <p className="text-center">{alertMessage}</p>
            ) : null}
            <div className="w-full grid grid-cols-2 gap-3 mx-auto ">
              <button
                type="button"
                className="bg-blue-500 text-white rounded-[8px] px-[16px] py-[5px] md:px-[18px] md:py-[6px] xl:px-6 xl:py-2 border border-blue-500 hover:bg-blue-600"
                onClick={(e) => check(e, 'OTP', false)}
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-[8px] px-[16px] py-[5px] md:px-[18px] md:py-[6px] xl:px-6 xl:py-2 border border-blue-500 hover:bg-blue-600 "
              >
                Continue
              </button>
            </div>
            <div className="text-gray-800 text-sm md:text-base mb-6">
              Don't have an account?{' '}
              <a
                href="/auth/signup"
                className="text-blue-400 font-bold hover:underline"
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      )}
    </main>
  )
}

export default Page1
