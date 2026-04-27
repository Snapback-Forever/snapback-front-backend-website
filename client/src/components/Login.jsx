import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/reducers/authreducer'

const Login = ({ loginModal, setLoginModal }) => {

  const dispatch = useDispatch()

  const [showPassword, SetShowPassword] = useState(false)

  const [state, setState] = useState({

    email: "",
    password: ""

  })

  const handleInput = (e) => {
    let { name, value } = e.target
    setState({
      ...state,
      [name]: value
    })
  }

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(state))

  }

  return (
    <div style={{ background: "white" }} className='loginModal'>

      <div style={{ width: "100%" }}>
        <button onClick={() => setLoginModal(false)} style={{ fontSize: "3vh" }}>❎</button>
      </div>

      <div style={{ width: "100%", height: "90%", display: "flex", alignItems: "center", justifyContent: "center" }}>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "60vw", height: "30vh" }} >

          <h2 style={{ textAlign: "center" }}><u>Admin Login Only</u></h2>
          <h6><b>Email OR AccountName</b></h6>
          
          <input
            type="text"
            name="email"
            value={state.email || ""}
            onChange={handleInput}
            placeholder="email@mail.com"
            className='text-center'
            style={{ width: "88%", border: "solid lightgray" }}
            required
          />

          <h6><b>Password</b></h6>
          <div className='w-full text-center flex flex-row justify-center items-center'>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={state.password || ""}
              onChange={handleInput}
              placeholder="********"
              className='text-center'
              style={{ width: "80%", border: "solid lightgray" }}
              required
            />

            <button
              type="button"
              onClick={() => SetShowPassword(!showPassword)}
             
            >
              {showPassword ? (<div style={{ border: "solid lightgray", borderLeft: "none" }} title="Hide Password">😲</div>)
                : (<div style={{ border: "solid lightgray", borderLeft: "none" }} title="Show Password">😎</div>)}
            </button></div>

          <button type='submit' style={{ width: "88%", background: "goldenrod", color: "black", marginTop: "1vh" }} className='rounded'>Login</button>
          <div className=' w-full h-full flex flex-col justify-end items-center' style={{ height: "7vh" }}>

          </div>

        </form>
      </div>

    </div>
  )
}

export default Login
