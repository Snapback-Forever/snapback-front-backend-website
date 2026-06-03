import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AllMemeCardAdmin from './AllMemeCardAdmin'
import { getAllMemes } from '../../redux/reducers/authreducer'

const AllMemes = () => {

    const dispatch = useDispatch()

    const [ trigger, setTrigger ] = useState(false)


    const allMemes = useSelector(state => state.auth.memes)

    useEffect(() => {

        dispatch(getAllMemes())
        setTrigger(false)

    }, [ trigger ])

    return (
        <div>

            {allMemes?.length === 0 ? <h2 style={{ textAlign: "center" }} >Currently No Memes to view</h2> :
                <div style={{ height: "100%", width: "100vw", display: "flex", flexDirection: "column", color: "whitesmoke", overflowX: "scroll" }}>
                    <h2 style={{ textAlign: "center" }} >Memes By SnapBack-Forever</h2>
                    <div style={{ display: "flex", flexWrap: "wrap", padding: "1vh 1vw", width: "100vw", height: "93%" }}>
                        {allMemes?.map((meme) => (
                            <AllMemeCardAdmin meme={meme} key={meme?._id} setTrigger={setTrigger} />
                        ))}
                    </div>
                </div>}
        </div>
    )
}

export default AllMemes
