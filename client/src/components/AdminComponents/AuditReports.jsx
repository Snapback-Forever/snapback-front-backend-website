import Card from 'react-bootstrap/Card';

import moment from 'moment';
import DOMPurify from 'dompurify';
import { useDispatch } from 'react-redux';
import { deleteAuditLog } from "../../redux/reducers/userMsgReducer"

const AuditReports = ({ report, trigger, setTrigger }) => {


    const dispatch = useDispatch()

    const auditDate = moment(report?.createdAt);
    const today = moment();

    const deleteThisAuditLog = ()=> {
        setTrigger(true)
        dispatch(deleteAuditLog(report?._id))
    }

    return (
        <Card border="light" style={{ width: '99%', margin: "1vh 0" }}>
            <Card.Header style={{ textAlign: "end" }}>{moment(report?.createdAt).format("MMM Do YYYY")}</Card.Header>
            <Card.Body>
                <h3 style={{ textAlign: "center" }}>Report Made By: {report?.performedByAccountName}</h3>
                <h3 style={{ textAlign: "end" }}>User Email: {report?.userEmail}</h3>
                <h6 style={{ textAlign: "end", display: "flex" }}>Report Type: {report?.msgNotFAQ ? <p style={{ color: "green", marginLeft: "0.5vw" }}> FAQ</p> : <p style={{ color: "red", marginLeft: "0.5vw" }}>Not A FAQ</p>}</h6>
                <h3>{report?.serviceProvided}</h3>
                <div style={{ border: 'solid black', margin: "2vh 0" }}></div>
                <div style={{ fontSize: "larger" }}><b>Admin Response:</b> <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(report?.answer) }} /></div>
            </Card.Body>

            { today.diff(auditDate, 'days') > 30 ? 
            <button style={{ background: "red", color: 'whitesmoke' }} onClick={()=> deleteThisAuditLog(report?._id)}>Delete Audit Log</button> 
            : <div style={{ background: "lightBlue", color: 'black', textAlign: "center", margin: "1vh 0" }}>Audit Log Is Deletable After 30 Days</div>}
            
        </Card>
    )
}

export default AuditReports
