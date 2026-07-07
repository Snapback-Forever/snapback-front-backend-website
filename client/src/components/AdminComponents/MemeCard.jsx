import React, { useState } from 'react'

const MemeCard = ({ meme }) => {
    const [onHover, setOnHover] = useState(false)
    const [showShareOptions, setShowShareOptions] = useState(false)
 
    const imageUrl = `https://snapbackforever-website-api.onrender.com/upload/image/${meme.profilePicFileId}?bucketName=${meme.profilePicBucketName}`

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: "Funny Meme",
                    text: "Check out this meme!",
                    url: imageUrl
                })
                return
            }

            setShowShareOptions(prev => !prev)
        } catch (error) {
            console.error("Share failed:", error)
        }
    }

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(imageUrl)
            alert("Link copied!")
        } catch (error) {
            console.error("Copy failed:", error)
        }
    }

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this meme! ${imageUrl}`)}`
    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this meme! ${imageUrl}`)}`
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(imageUrl)}`

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", background: "rgba(245, 245, 245, 0.342)", margin: "1vh 1vw", height: "60vh", padding: "1vh 1vw", justifyContent: "center", width: "30vw" }} className='responsiveMeme'>

            <div style={{ height: "100%" }}>

                <img
                    src={imageUrl}
                    alt="meme"
                    style={{ width: "100%", height: "50vh" }}
                    onClick={() => setOnHover(prev => !prev)}
                    className={onHover ? 'drawHover' : ""}
                />

            </div>

            <button
                onClick={handleShare}
                style={{ padding: "0.7vh 1vw", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "0.9rem", marginBottom: "1vh", background: "goldenRod", color: "black", width: "90%", margin: "1vh 0" }}
            >
                Share
            </button>

            {showShareOptions && (
                <div style={{ display: "flex", gap: "0.5vw", flexWrap: "wrap", justifyContent: "center", width: "20vw", marginBottom: "2vh" }}>
                    <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", padding: "0.5vh 0.8vw", borderRadius: "8px", border: "1px solid #ccc" }}>
                        Facebook
                    </a>

                    <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", padding: "0.5vh 0.8vw", borderRadius: "8px", border: "1px solid #ccc" }}>
                        Twitter/X
                    </a>

                    <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", padding: "0.5vh 0.8vw", borderRadius: "8px", border: "1px solid #ccc" }}>
                        WhatsApp
                    </a>

                    <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", padding: "0.5vh 0.8vw", borderRadius: "8px", border: "1px solid #ccc" }}>
                        LinkedIn
                    </a>

                    <button
                        onClick={copyLink}
                        style={{ padding: "0.5vh 0.8vw", borderRadius: "8px", border: "1px solid #ccc", cursor: "pointer" }}
                    >
                        Copy Link
                    </button>
                </div>
            )}
        </div>
    )
}

export default MemeCard