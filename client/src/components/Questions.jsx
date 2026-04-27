import Card from 'react-bootstrap/Card';

import React, { useEffect } from 'react'
import moment from 'moment';
import DOMPurify from 'dompurify';
import { useDispatch, useSelector } from 'react-redux'
import { getAllAuditReports } from '../redux/reducers/userMsgReducer'
import { Link } from 'react-router-dom'

const Questions = () => {

    const dispatch = useDispatch()
    const auditLogs = useSelector(state => state.userMsg.auditReports)


    useEffect(() => {
        dispatch(getAllAuditReports())
    }, [])

    return (

        <div style={{ background: "black" }}>
        <Link to={"/"}>
          <button style={{ fontSize: "4vh" }}>⬅️</button>
        </Link>
      
        <div className="faqResponsive" style={{ height: "94vh", width: "100vw", display: "flex", alignItems: "center", color: "whitesmoke" }}>
          <div className="faqSidePanel" style={{ width: "25%", height: "100%", display: "flex", flexDirection: "column", background: "black", padding: "2vh 1vw" }}>
            {auditLogs.filter(msg => msg.serviceProvided.startsWith("Message:")).length === 0 ? (
              <div className="question" style={{ width: "20vw", height: "40%", display: "flex" }}></div>
            ) : (
              <div className="snapQuest" style={{ width: "20vw", height: "40%", display: "flex" }}></div>
            )}
      
            <h4 style={{ textAlign: "center" }}>
              If You Have A Question Feel Free To <Link to={"/msgForm"}>Send Admin A Message.</Link>
            </h4>
          </div>
      
          <div className="faqMainPanel" style={{ width: "100%", height: "94vh", background: "black", display: "flex", flexDirection: "column", alignItems: "center", overflowY: "scroll" }}>
            <h1 style={{ color: "white", background: "rgba(0, 0, 0, 0.600)", padding: "1vh 1vw", textAlign: "center" }}>
              <u>Commonly Asked Questions:</u>
            </h1>
      
            {auditLogs.filter(msg => msg.serviceProvided.startsWith("Message:")).length === 0 ? (
              <h2>Currently No Questions Or Answers To View</h2>
            ) : (
              <>
                {auditLogs
                  .filter(msg => msg.serviceProvided.startsWith("Message:") && !msg?.msgNotFAQ)
                  .reverse()
                  .map(msg => {
                    return (
                      <Card border="light" style={{ width: "90%", margin: "1vh 0" }}>
                        <Card.Header style={{ textAlign: "end" }}>
                          {moment(msg?.createdAt).format("MMM Do YYYY")}
                        </Card.Header>
                        <Card.Body>
                          <h3>{msg?.serviceProvided}</h3>
                          <div style={{ border: "solid black", margin: "2vh 0" }}></div>
                          <div style={{ fontSize: "larger" }}>
                            <b>Admin Response:</b>{" "}
                            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg?.answer) }} />
                          </div>
                        </Card.Body>
                      </Card>
                    );
                  })}
              </>
            )}
          </div>
        </div>
      </div>
      

    )
}

export default Questions
