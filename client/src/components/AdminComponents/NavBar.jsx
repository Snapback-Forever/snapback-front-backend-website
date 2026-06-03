import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/authreducer';

const NavBar = ({ changeContent, setChangeContent, menuOpen, setMenuOpen }) => {

  const dispatch = useDispatch()



  return (

    <div className="navbar">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ margin: "0 1vw", fontSize: "4vh", fontVariant: "all-petite-caps" }}>Admin</div>

        <div className='menu-div'>
          {/* Toggle Button - visible on small screens */}

          <button className="menu-toggle rounded" onClick={() => setMenuOpen((prev) => !prev)} >
            {menuOpen ?
              <div className='seeMe'>
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8" />
                </svg>
              </div>
              :
              <div className='seeMe'>
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4" />
                </svg>
              </div>
            } </button>

        </div>
      </div>

      {/* Show menu if open on small screens, always open on larger screens */}
      <div className="buttons-container" style={{ display: menuOpen ? "flex" : "" }} >

        <button className="navbar-button rounded" style={{ background: "goldenrod", padding: "0.5vh 1vw", margin: "0.5vh 0.5vw" }} onClick={() => setChangeContent("msg")}>📨 Messages</button>

        <button className="navbar-button rounded" style={{ background: "goldenrod", padding: "0.5vh 1vw", margin: "0.5vh 0.5vw" }} onClick={() => setChangeContent("msgAdmin")}>📨 Admin To Admin</button>

        <button className="navbar-button rounded" style={{ background: "goldenrod", padding: "0.5vh 1vw", margin: "0.5vh 0.5vw" }} onClick={() => setChangeContent("accounts")}>Admin Accounts</button>

        <button className="navbar-button rounded" style={{ background: "goldenrod", padding: "0.5vh 1vw", margin: "0.5vh 0.5vw" }} onClick={() => setChangeContent("audit")}>Audit Report's</button>

        <button className="navbar-button rounded" style={{ background: "goldenrod", padding: "0.5vh 1vw", margin: "0.5vh 0.5vw" }} onClick={() => setChangeContent("QA")}>Questions/Answers</button>

        <button className="navbar-button rounded" style={{ background: "goldenrod", padding: "0.5vh 1vw", margin: "0.5vh 0.5vw" }} onClick={() => setChangeContent("newWebsite")}>Add Website</button>

        <button className="navbar-button rounded" style={{ background: "goldenrod", padding: "0.5vh 1vw", margin: "0.5vh 0.5vw" }} onClick={() => setChangeContent("newUser")}>Add A User</button>

        <button className="navbar-button rounded" style={{ background: "goldenrod", padding: "0.5vh 1vw", margin: "0.5vh 0.5vw" }} onClick={() => setChangeContent("newAdminMsg")}>Send Msg To Admin</button>

        <button className="navbar-button rounded" style={{ background: "goldenrod", padding: "0.5vh 1vw", margin: "0.5vh 0.5vw" }} onClick={() => setChangeContent("newMeme")}>Create Meme</button>

        <button className="navbar-button rounded" style={{ background: "goldenrod", padding: "0.5vh 1vw", margin: "0.5vh 0.5vw" }} onClick={() => setChangeContent("allMeme")}>All Meme</button>

        <button className="navbar-button rounded" style={{ background: "red", padding: "0.5vh 1vw", margin: "0.5vh 0.5vw" }} onClick={() => dispatch(logout())}>LogOut</button>

      </div>
    </div>
  )
}

export default NavBar
