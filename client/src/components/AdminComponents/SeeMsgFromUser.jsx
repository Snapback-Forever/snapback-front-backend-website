import Card from 'react-bootstrap/Card';

import moment from 'moment';
import DOMPurify from 'dompurify';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { changeUserMsgStatus } from '../../redux/reducers/userMsgReducer';

const SeeMsgFromUser = ({ msg, trigger, setTrigger }) => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);

    const [state, setState] = useState({
        answer: "",
        msgNotFAQ: false
    });

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        setState({
            ...state,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const changeMesResponded = ({ e, msgId }) => {
        e.preventDefault();
        e.stopPropagation();

        const payload = {
            newStatus: 'userEmailed',
            msgId: msgId,
            userId: user._id
        };
        setTrigger(true)
        dispatch(changeUserMsgStatus(payload));

    };

    const sendAnswer = (e) => {
        e.preventDefault();
        const payload = {
            msgId: msg._id,
            answer: state.answer,
            msgNotFAQ: state.msgNotFAQ,
            newStatus: 'msgCompleted',
            userId: user._id,
        };
        setTrigger(true)
        dispatch(changeUserMsgStatus(payload));

        setState({
            answer: "",
            msgNotFAQ: false
        });
    };


    return (
        <Card border="light" style={{ width: '99%', margin: "1vh 0" }}>
            <Card.Header style={{ textAlign: "end" }}>{moment(msg?.createdAt).format("MMM Do YYYY")}</Card.Header>
            <Card.Body>
                <h6>First Name : {msg?.firstName}</h6>
                <h6>Last Name : {msg?.lastName}</h6>
                <h5>Email: {msg?.email}</h5>
                <h5 style={{ fontSize: "larger", textAlign: "center" }}><b>Question:</b> <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg?.msgBody) }} /></h5>
                <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                    <h6>Msg Status: {msg?.status}</h6>
                </div>
                <div style={{ width: "100%" }}>

                    {msg.status === 'msgReviewed' ? <button style={{ background: "lightBlue", padding: "0 1vw" }} className='rounded' onClick={e => changeMesResponded({ e, msgId: msg._id })}>Responded To Message</button> : ""}

                    {msg.status === "userEmailed" && msg?.statusChangedBy === user?._id ?
                        <>

                            <form
                                onSubmit={sendAnswer}
                                className="response-form"
                                style={{ display: "flex", gap: "10px", alignItems: "center", flexDirection: "column" }}
                            >

                                <div style={{ width: "100%", height: "30vh" }}>
                                    <textarea
                                        name="answer"
                                        placeholder="Paste Your Response To This Message Here..."
                                        value={state.answer}
                                        onChange={handleInput}
                                        required
                                        style={{ padding: "0.5em", flex: 1, background: "black", color: "white", width: "98%", height: "100%" }}
                                    />
                                </div>

                                <h6 style={{ textAlign: "center" }}>The Question & Answer Will Be Sent To The FAQ Section for All Viewers To See, So Remember All Questions & Answers Are Visible To The Public!!! If The Message Is Not Valid For The FAQ Page Then Please Check The Box Below & It Will Not Go To The FAQ Page. </h6>


                                <div style={{ width: "80%", border: "solid red", display: "flex", justifyContent: "center", alignItems: "center", background: "black", color: "whitesmoke", padding: "1vh 1vw" }}>
                                    <input
                                        type="checkbox"
                                        name="msgNotFAQ"
                                        checked={state.msgNotFAQ}
                                        onChange={handleInput}
                                        style={{ transform: "scale(2)", margin: "0 3vw" }}
                                    />
                                    <h5 style={{ textAlign: "center" }}>
                                        <b>{" "}<span style={{ fontSize: "large", color: "yellow" }}><u>NOT FOR FAQ</u></span> --- CHECK BOX IF THIS MESSAGE IS  </b>
                                    </h5>
                                </div>

                                <button type="submit" style={{ background: "green", padding: "0 1vw", width: "90%", color: "white" }} className="rounded" >
                                    Send Answer & Complete Msg
                                </button>

                            </form>

                        </> : <></>}

                    {msg.status === 'userEmailed' && msg?.statusChangedBy !== user?._id ? <div style={{ background: "maroon", padding: "0 1vw", width: "100%", color: "white", textAlign: "center" }} className="rounded" >( {msg?.statusChangedByAccountName} ) Conducting Response</div> : ""}


                </div>
            </Card.Body>
        </Card >
    )
}

export default SeeMsgFromUser
