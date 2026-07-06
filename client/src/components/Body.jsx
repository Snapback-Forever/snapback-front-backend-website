import Card from 'react-bootstrap/Card';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import StarsBackground from './Stars'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllWebsites } from '../redux/reducers/websiteReducer'

const Body = ({ health, login, setLogin }) => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState(false)
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [foreverShit, setForeverShit] = useState(false)

    const allWebsites = useSelector(state => state.web.allWebsite)


    const onHoverEmail = () => {
        setEmail(true)
    }

    const onHoverEmailOut = () => {
        setEmail(false)
    }

    useEffect(() => {
        dispatch(getAllWebsites())
    }, [])
  

    return (

        <div style={{ width: "100%", color: "whitesmoke", textAlign: "center", marginTop: "2vh" }}>

            <Link to={"/msgForm"} className='imgButton'>
                <button className="rounded msgButton" style={{ width: "80%", margin: "1vh" }}>Send A Message To Admin</button>
            </Link>

            <Link to={"/quest"} className='imgButton'>
                <button className="rounded msgButton" style={{ width: "80%", margin: "2vh 0" }}>Frequently Asked Questions</button>
            </Link>

            <Link to={"/memes"} className='imgButton'>
                <button className="rounded msgButton" style={{ width: "80%", margin: "2vh 0" }}>Snapback Coding Memes</button>
            </Link>

            {!email ?
                <h2 ><div style={{ display: "flex", justifyContent: "center" }} className='Modo'> <span className='Modo'>Email Us Directly:</span></div>
                    <a href="mailto:snapbackforever2026@proton.me" style={{ cursor: "grab" }} onMouseEnter={onHoverEmail} id='snapBack'>snapbackforever2026@proton.me</a></h2>
                :
                <h2 ><div style={{ display: "flex", justifyContent: "center" }}><div className='run'>📨</div> <span className='Modo'>Email Us Directly:</span></div>
                    <a href="mailto:snapbackforever2026@proton.me" style={{ cursor: "grab" }} onMouseLeave={onHoverEmailOut} id='snapBack'>snapbackforever2026@proton.me</a></h2>
            }

            {allWebsites.filter(web => web).length !== 0 ? <div style={{ border: "solid white", width: "96vw", margin: "3vh 0" }}></div> : ""}

            {allWebsites.filter(web => web).length !== 0 ? <h1 style={{ textAlign: "center", color: "antiqueWhite" }} className='Modo'>Check Out The Website's Produced By SnapBack:</h1> : ""}

            <StarsBackground>
                <div className='cardResponse'>

                    {allWebsites.filter(web => web).reverse().map((web, index) => (
                        <div key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} style={{ display: "flex", alignItems: "center" }}>

                            {hoveredIndex === index && <span style={{ fontSize: "5vh" }}>➡️</span>}

                            <a href={web?.websiteHttp} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }} >
                                <div className='cardResponding'>
                                    <img src={web?.webSiteImageLink} className='cardRespondingTextImage'/>
                                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", color: "black" }}>
                                        <div className='cardRespondingText' style={{ height: "30vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                            <h1>{web?.websiteName}</h1>
                                            <h6>{web?.websiteHttp}</h6>
                                        </div>
                                        <div style={{ textAlign: "end", margin: "0 2vw" }} className='cardRespondingTextDate'>Created Date: {moment(web?.createdAt).format("MMM Do YYYY")}</div>
                                    </div>
                                </div>
                            </a>
                            {hoveredIndex === index && <span style={{ fontSize: "5vh" }}>⬅️</span>}

                        </div>
                    ))}
                </div>

            </StarsBackground>



        </div>
    )
}

export default Body
