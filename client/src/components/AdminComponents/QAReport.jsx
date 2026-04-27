import Card from 'react-bootstrap/Card';

import moment from 'moment';
import DOMPurify from 'dompurify';
import { useDispatch } from 'react-redux';
import { deleteAuditLog } from "../../redux/reducers/userMsgReducer"

const QAReport = ({ report, trigger, setTrigger }) => {


    const dispatch = useDispatch()

    const auditDate = moment(report?.createdAt);
    const today = moment();

    const deleteThisAuditLog = () => {
        setTrigger(true)
        dispatch(deleteAuditLog(report?._id))
    }

    return (
        <Card border="dark" style={{ width: '99%', margin: "1vh 0", background: "lightGrey" }}>
            <Card.Header style={{ textAlign: "end" }}>{moment(report?.createdAt).format("MMM Do YYYY")}</Card.Header>
            <Card.Body>

                <h6 style={{ textAlign: "end", display: "flex" }}>Report Type: {!report?.msgNotFAQ ? <p style={{ color: "green", marginLeft: "0.5vw" }}> FAQ</p> : <p style={{ color: "red", marginLeft: "0.5vw" }}>Not A FAQ</p>}</h6>
                <h3>{report?.serviceProvided}</h3>
                <div style={{ border: 'solid black', margin: "2vh 0" }}></div>
                <div style={{ fontSize: "larger" }}><b>Admin Response:</b> <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(report?.answer) }} /></div>
            </Card.Body>

            <div style={{ width: "100%", display: "flex", justifyContent: "end", margin: "1vh 0" }}>
                <button style={{ background: "red", color: 'whitesmoke', padding: "0 2vw", margin: "0 1vw" }} className='rounded' onClick={() => deleteThisAuditLog(report?._id)}>Delete Q/A</button>
            </div>
        </Card>
    )
}

export default QAReport
