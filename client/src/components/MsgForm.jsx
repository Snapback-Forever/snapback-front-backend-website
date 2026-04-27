import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUserMsg } from '../redux/reducers/userMsgReducer.js'
import { Link } from 'react-router-dom'

const MsgForm = () => {

  const dispatch = useDispatch()

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    msgBody: "",
    status: 'msgReviewed',
    msgType: 'userToAdmin'
  })


  const handleInput = (e) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value
    })
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addUserMsg(state))
    // Optionally reset the form
    setState({
      firstName: "",
      lastName: "",
      email: "",
      msgBody: "",
      status: 'msgReviewed',
      msgType: 'userToAdmin'
    })
  }

  return (
<div style={{ background: "black" }} className="responsiveMe">
  <Link to={"/"}>
    <button style={{ fontSize: "4vh" }}>⬅️</button>
  </Link>

  <div
    className="responsiveContent"
    style={{
      height: "94vh",
      width: "100vw",
      display: "flex",
      background: "black",
      color: "whitesmoke",
      overflowY: "scroll",
    }}
  >
    <div className="msgQuestion" style={{ padding: "0 1vw" }}>
      <div className="msgQuestionImage" style={{ width: "100%", height: "40%" }}></div>

      <h1
        style={{
          textAlign: "center",
          width: "100%",
          height: "40%",
          display: "flex",
          alignItems: "center",
          fontFamily: "fangsong",
        }}
      >
        How Can I Help You?
      </h1>
    </div>

    <form
      className="messageForm"
      onSubmit={handleRegisterSubmit}
      style={{
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        <u>Send Admin A Question:</u>
      </h1>

      <h3>First Name: </h3>
      <input
        name="firstName"
        value={state.firstName}
        onChange={handleInput}
        required
        style={{ background: "white", width: "70%", color: "black" }}
        placeholder="Your First Name"
      />

      <h3>Last Name: </h3>
      <input
        name="lastName"
        value={state.lastName}
        onChange={handleInput}
        required
        style={{ background: "white", width: "70%", color: "black" }}
        placeholder="Your Last Name"
      />

      <h3>Email:</h3>
      <input
        type="email"
        name="email"
        value={state.email}
        onChange={handleInput}
        required
        style={{
          background: "white",
          width: "70%",
          color: "black",
          margin: "0 0 1vh 0",
        }}
        placeholder="exampl@mail.com"
      />

      <h5 style={{ textAlign: "center", color: "antiquewhite" }}>
        <span style={{ color: "yellow" }}>
          <u>Admin Will Email You A Response</u>
        </span>{" "}
        Your Question & Answer Will Be uploaded to{" "}
        <Link to={"/quest"}>Frequently Asked Questions Page.</Link>
      </h5>

      <h3>Message: </h3>
      <textarea
        name="msgBody"
        value={state.msgBody}
        onChange={handleInput}
        required
        style={{ background: "white", width: "90%", height: "40vh", color: "black" }}
        maxLength={1000}
        placeholder="1000 characters max"
      />

      <button
        className="rounded msgButton"
        type="submit"
        style={{ width: "90%", margin: "1vh" }}
      >
        Send Message
      </button>
    </form>
  </div>
</div>

  )
}

export default MsgForm
