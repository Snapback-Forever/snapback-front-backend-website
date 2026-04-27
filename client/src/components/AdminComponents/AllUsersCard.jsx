import Card from 'react-bootstrap/Card';

import React from 'react'
import moment from 'moment';
import { deleteUser } from '../../redux/reducers/authreducer';
import { useDispatch } from 'react-redux';

const AllUsersCard = ({ user, trigger, setTrigger }) => {

    const dispatch = useDispatch()

    const deleteThisUser = (userId)=> {
        setTrigger(true)
        dispatch(deleteUser(userId))
    }

  return (

    <Card style={{ width: '99%', margin: "1vh 0" }}>
      <Card.Body>
      <Card.Header style={{ textAlign: "end" }}>Created Date: {moment(user?.createdAt).format("MMM Do YYYY")}</Card.Header>
        <h1 style={{ fontVariant: "all-small-caps", textAlign: "center" }}>{user?.accountName}</h1>
        <div>
            <h6>FirstName: {user?.firstName}</h6>
            <h6>Last Name: {user?.lastName}</h6>
            <h4>Email: {user?.email}</h4>
        </div>
        </Card.Body>
      <h6 style={{ textAlign: "end", margin: "1vh 1vw" }}>Last Login: {moment(user?.lastLogin).format("MMM Do YYYY")}</h6>
      { !user?.creator ? <button style={{ background: "red", color: "white" }} onClick={()=> deleteThisUser(user?._id)}>Delete This User</button> : ""}
    </Card>

  )
}

export default AllUsersCard
