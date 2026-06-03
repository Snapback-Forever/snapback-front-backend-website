import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeMemeImage } from '../../redux/reducers/authreducer'


const AllMemeCardAdmin = ({ meme, setTrigger }) => {
    const dispatch = useDispatch()

    const [onHover, setOnHover] = useState(false)

    const tapCountRef = useRef(0)
    const lastTapRef = useRef(0)

    const imageUrl = `http://127.0.0.1:8080/upload/image/${meme.profilePicFileId}?bucketName=${meme.profilePicBucketName}`

    const deleteTheMemeImage = () => {
        const now = Date.now()
        const delay = 400

        if (now - lastTapRef.current < delay) {
            tapCountRef.current += 1
        } else {
            tapCountRef.current = 1
        }

        lastTapRef.current = now

        if (tapCountRef.current === 3) {
            const payload = {
                id: meme._id,
                imageFileId: meme.profilePicFileId,
                imageBucketName: meme.profilePicBucketName
            }

            dispatch(removeMemeImage(payload))
            setTrigger(true)

            // reset count after delete
            tapCountRef.current = 0
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", background: "white", margin: "1vh 1vw", height: "65vh", padding: "1vh 1vw", justifyContent: "center", borderRadius: "12px" }}>

            <div style={{ height: "90%", display: "flex", flexDirection: "column", alignItems: "center" }}>

                <img
                    src={imageUrl}
                    alt="meme"
                    style={{ width: "20vw", height: "50vh", cursor: "pointer" }}
                  
                />

                <button
                    onClick={deleteTheMemeImage}
                    style={{ marginTop: "1vh", padding: "1vh 1vw", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: ".9rem", background: "red" }}
                >
                    Triple Click To Delete Meme
                </button>

            </div>

        </div>
    )
}

export default AllMemeCardAdmin