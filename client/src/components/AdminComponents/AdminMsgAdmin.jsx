import React, { useState } from 'react'
import DOMPurify from 'dompurify';
import { useDispatch, useSelector } from 'react-redux'
import { addUserMsg } from '../../redux/reducers/userMsgReducer'

const AdminMsgAdmin = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)

    const [state, setState] = useState({
        firstName: user.accountName,
        email: user.email,
        msgBody: "",
        status: 'msgReviewed',
        msgType: 'adminToAdmin'
    })


    const handleInput = (e) => {
        const { name, value } = e.target
        setState({
            ...state,
            [name]: value
        })
    }

    const handleRegisterSubmit = (e) => {

        e.preventDefault();
        e.stopPropagation();

        const cleanMsgBody = DOMPurify.sanitize(state.msgBody, { USE_PROFILES: { html: true } });
        dispatch(addUserMsg({
            ...state,
            msgBody: cleanMsgBody
        }));

        setState({
            firstName: user?.accountName,
            email: user?.email,
            msgBody: "",
            status: 'msgReviewed',
            msgType: 'adminToAdmin'
        });

    };

    return (
        <div style={{ height: "94vh", width: "100vw", display: "flex", alignItems: "center", background: "black", color: "whitesmoke", overflowY: "scroll" }} className='responsiveThisDiv'>

            <div className='msgQuestionAdmin' style={{ padding: "0 1vw" }}>
                <div style={{ width: "100%", height: "40%" }}></div>

                <h4 style={{  width: "100%", height: "40%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "fangsong", textAlign: "center" }}>Write All Other Admin's A Message:</h4>
            </div>

            <form onSubmit={handleRegisterSubmit} style={{ width: "75%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>

                <h4 style={{ textAlign: "center" }}>Message To Other Admin</h4>
                <textarea
                    name="msgBody"
                    value={state.msgBody}
                    onChange={handleInput}
                    required
                    style={{ background: "white", width: "90%", height: "65vh", color: "black" }}

                    placeholder='Yall Are Doing A Great Job. :))'
                />

                <button className="rounded msgButton" type="submit" style={{ width: "90%", margin: "1vh" }}>Send Message</button>

            </form>
        </div>
    )
}

export default AdminMsgAdmin
