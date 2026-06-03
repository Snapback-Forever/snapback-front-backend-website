import React from 'react'
import { useSelector } from 'react-redux'

import AdminMsgAdmin from './AdminMsgAdmin'
import SeeAdminMsgs from './SeeAdminMsgs'
import SeeMsgFromUser from './SeeMsgFromUser'
import AuditReports from './AuditReports'
import AllUsersCard from './AllUsersCard'
import QAReport from './QAReport'
import AddAWebsite from './AddAWebsite'
import AddAUser from './AddAUser'
import AddMeme from './AddMeme'
import AllMemes from './AllMemes'


const Content = ({ changeContent, setChangeContent, allAdminMsg, trigger, setTrigger, allAuditReports, allUsers, allWebsites }) => {


  const authId = useSelector(state => state.auth.user._id)

  return (
    <div 
    className={
      changeContent === "msgAdmin" || changeContent === ""
        ? "adminMsgBG"
        : changeContent === "msg"
        ? "msgBG"
        : changeContent === "audit" 
        ? "auditBg" 
        : changeContent === "accounts" 
        ? "userBg"
        : changeContent === "QA" 
        ? "qaBG"
        : changeContent === "newWebsite" 
        ? "websiteBg"
        : changeContent === "newUser" 
        ? "userBg"
        : changeContent === "newAdminMsg" 
        ? "newMsgAdmin"
        : ""
    } 
    style={{ color: "white", margin: "1vh 1vw", width: "99%", height: "88%", overflowY: "scroll" }}>

      {/* See Messages From Users */}
      {changeContent === "msg" ?
        <>
          {allAdminMsg?.filter(msg => msg.msgType === 'userToAdmin').length === 0 ? <h2 style={{ textAlign: "center", background: "black" }}>No Messages From Users To View</h2> : <>
            <h2 style={{ textAlign: "center", background: "black" }}><u>Message's From Users</u></h2>
            {allAdminMsg?.filter(msg => msg.msgType === 'userToAdmin').reverse().map(msg => {
              return (<SeeMsgFromUser msg={msg} trigger={trigger} setTrigger={setTrigger} />)
            })}
          </>}</>
        : ""}

      {/* See Admin Messages */}
      {changeContent === "msgAdmin" || changeContent === "" ?
        <>
          {allAdminMsg?.filter(msg => msg.msgType === "adminToAdmin").length === 0 ? <h2 style={{ textAlign: "center", background: "black" }}>No Messages Admin Messages To View</h2> : <>
            <h2 style={{ textAlign: "center", background: "black" }}><u>Admin To Admin Messages</u></h2>
            {allAdminMsg?.filter(msg => msg.msgType === "adminToAdmin").reverse().map(msg => {
              return (<SeeAdminMsgs msg={msg} trigger={trigger} setTrigger={setTrigger} />)
            })}
          </>}</>
        : ""}


      {/* See Audit Reports */}
      {changeContent === "audit" ?
        <>
          {allAuditReports?.filter(report => report).length === 0 ? <h2 style={{ textAlign: "center", background: "black" }}>No Messages To View</h2> : <>
            <h2 style={{ textAlign: "center", background: "black" }}><u>Audit Log Reports</u></h2>
            {allAuditReports?.filter(report => report).reverse().map(report => {
   
              return (<AuditReports report={report} trigger={trigger} setTrigger={setTrigger} />)
            })}
          </>}</>
        : ""}

      {/* all user accounts */}
      {changeContent === "accounts" ?
        <>{allUsers.filter(user => user._id !== authId).length === 0 ? <h2 style={{ textAlign: "center", background: "black" }}>No Other Users To View</h2> : <h2 style={{ textAlign: "center", background: "black" }}>All Users</h2>}

          <>{allUsers.filter(user => user._id !== authId).reverse().map(user => <AllUsersCard user={user} trigger={trigger} setTrigger={setTrigger} />)}</>
        </> : ""}


      {/* See Q/A Reports */}
      {changeContent === "QA" ?
        <>
          {allAuditReports?.filter(report => report).length === 0 ? <h2 style={{ textAlign: "center", background: "black" }}>No Messages To View</h2> : <>
            <h2 style={{ textAlign: "center", background: "black" }}><u>Questions & Answers</u></h2>
            <h6 style={{ textAlign: "center", color: "yellow", background: "black" }}>Q&A Is Visible To All Users That Visits Website.</h6>
            <div style={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "center" }}>
            {allAuditReports?.filter(report => report?.serviceProvided?.startsWith("Message:") && !report?.msgNotFAQ).reverse().map(report => {
        
              return (<QAReport report={report} trigger={trigger} setTrigger={setTrigger} />)
            })}
            </div>
          </>}</>
        : ""}

      {/* ADD New Website */}
      {changeContent === "newWebsite" ? <AddAWebsite allWebsites={allWebsites} trigger={trigger} setTrigger={setTrigger} /> : ""}


      {/* ADD A New User */}
      {changeContent === "newUser" ? <AddAUser trigger={trigger} setTrigger={setTrigger} /> : ""}

      {/* Make Admin To Admin Message */}
      {changeContent === "newAdminMsg" ? <AdminMsgAdmin /> : ""}

      {/* Make a Meme */}
      {changeContent === "newMeme" ? <AddMeme trigger={trigger} setTrigger={setTrigger} /> : ""}

      {/* All meme */}
      {changeContent === "allMeme" ? <AllMemes trigger={trigger} setTrigger={setTrigger} /> : ""}

    </div>
  )
}

export default Content
