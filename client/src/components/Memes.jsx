import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllMemes } from '../redux/reducers/authreducer'
import MemeCard from './AdminComponents/MemeCard'

const Memes = () => {

  const dispatch = useDispatch()



  const allMemes = useSelector(state => state.auth.memes)

  useEffect(() => {

    dispatch(getAllMemes())

  }, [])

  return (

    <div style={{ background: "black" }}>
      <Link to={"/"}>
        <button style={{ fontSize: "4vh" }}>⬅️</button>
      </Link>
      <div className="faqResponsive" style={{ height: "88vh", width: "100vw" }}>

        {allMemes?.length === 0 ? <h2 style={{ textAlign: "center" }} >Currently No Memes to view</h2> :
          <div style={{ height: "100%", width: "100vw", display: "flex", flexDirection: "column", color: "whitesmoke", overflowX: "scroll" }}>
            <h2 style={{ textAlign: "center" }} >Memes By SnapBack-Forever</h2>
            <div style={{ display: "flex", flexWrap: "wrap", padding: "1vh 1vw", width: "98vw", height: "93%" }}>
              {allMemes?.map((meme) => (
             <MemeCard  meme={meme} key={meme?._id} />
              ))}
            </div>
          </div>}

      </div>



    </div>

  )
}

export default Memes
