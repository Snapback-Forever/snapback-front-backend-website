import Card from 'react-bootstrap/Card';

import moment from 'moment';
import DOMPurify from 'dompurify';
import { useDispatch } from 'react-redux';
import { deleteUserMsg } from '../../redux/reducers/userMsgReducer';

const SeeAdminMsgs = ({ msg, trigger, setTrigger  }) => {

    const dispatch = useDispatch()

    const deleteThisUserMsg = (id)=> {
        setTrigger(true)
        dispatch(deleteUserMsg(id))
    }


    return (
        <Card border="light" style={{ width: '99%', margin: "1vh 0" }}>
            <Card.Header style={{ textAlign: "end" }}>{moment(msg?.createdAt).format("MMM Do YYYY")}</Card.Header>
            <Card.Body>
                <h3>Msg From : {msg?.firstName}</h3>
                <h5>Email: {msg?.email}</h5>
                <h5 style={{ fontSize: "larger", textAlign: "center" }}><b>Admin Response:</b> <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg?.msgBody) }} /></h5>
            </Card.Body>
            <button style={{ background: "red", color: "whitesmoke" }} className='rounded' onClick={()=> deleteThisUserMsg(msg?._id)}>Delete Admin Message</button>
        </Card>
    )
}

export default SeeAdminMsgs
