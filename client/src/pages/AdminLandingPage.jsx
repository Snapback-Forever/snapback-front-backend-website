import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../components/AdminComponents/NavBar';
import Content from '../components/AdminComponents/Content';
import { getAllUsers } from '../redux/reducers/authreducer';
import { getAllAuditReports, getAllUserMsg } from '../redux/reducers/userMsgReducer';
import { getAllWebsites } from '../redux/reducers/websiteReducer';

const AdminLandingPage = () => { 

  const [ changeContent, setChangeContent ] = useState("")
  const [ trigger, setTrigger ] = useState(false)
  const [ menuOpen, setMenuOpen ] = useState(false);

  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user)
  const allAdminMsg = useSelector(state => state.userMsg.userMessages)
  const allAuditReports = useSelector(state => state.userMsg.auditReports)
  const allUsers = useSelector(state => state.auth.allUsers)
  const allWebsites = useSelector(state => state.web.allWebsite)


  useEffect(() => {

    dispatch(getAllUsers())
    dispatch(getAllUserMsg())
    dispatch(getAllWebsites())
    dispatch(getAllAuditReports())
    setTrigger(false)

  }, [ changeContent, trigger, menuOpen ])

  return (

    <div style={{ background: "black", padding: "4vh 2vw 0 2vw", width: "100vw", height: '94vh', overflowY: "scroll" }}>

      <NavBar changeContent={changeContent} setChangeContent={setChangeContent} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Content changeContent={changeContent} setChangeContent={setChangeContent} allAdminMsg={allAdminMsg} trigger={trigger} setTrigger={setTrigger} allAuditReports={allAuditReports} allUsers={allUsers} allWebsites={allWebsites} />

    </div>

  )
}

export default AdminLandingPage
