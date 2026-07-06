
import snapBack from "../images/snapback.gif"

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllWebsites } from "../redux/reducers/websiteReducer";


const Footer = () => {

  const dispatch = useDispatch()

  const allWebsites = useSelector(state => state.web.allWebsite)

  const texts = [ "Help", "Keep SnapBack", "Websites", "Add Free", "Donate Today" ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % texts.length);
    }, 2000); // Change every 2 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleDonate = () => {
    // Redirect to your donation page or integrate a payment gateway here
    window.open('https://your-project.vercel.app/', '_blank', 'noopener,noreferrer');
  };

  const websiteUrl = encodeURIComponent('https://snapback.com');
  const message = encodeURIComponent('SNAPBACK: Set New Ambitions, Persist, Boldly Achieve Constant Knack - ') + websiteUrl;

  // WhatsApp
  const whatsappShareUrl = `https://wa.me/?text=${message}`;
  // Discord (no direct share link; you can generate a prefilled message to copy, but not a direct link)

  // LinkedIn
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${websiteUrl}`;
  // Twitter
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${message}`;
  // Facebook
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${websiteUrl}`;

  useEffect(() => {
    dispatch(getAllWebsites())
  }, [])


  return (
    <div style={{ width: "97.5vw", maxHeight: "6vh", display: "flex" }}>

<div style={{ display: "flex", width: "20vw", height: "6vh", justifyContent: "center", alignItems:"center" }}>
          <a style={{ display: "flex", textDecoration: "none" }} href='#' target="_blank" rel="noopener noreferrer" title='SnapBack Website'>
            <img src={snapBack} style={{ height: "4vh" }} />
            
          </a>
</div>    


          <div style={{ display: "flex", width: "80vw", height: "6vh", justifyContent: "end", alignItems:"center" }}>

            {/* facebook */}
            <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" title='Share Us On Facebook'>
              <svg style={{ margin: "0 0.5vw", minHeight: "5vh", minWidth: "4vh", maxHeight: "5vh", maxWidth: "4vw" }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd" />
              </svg>
            </a>

            {/* Twitter */}
            <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" title='Share Us On X'>
              <svg style={{ margin: "0 0.5vw", minHeight: "5vh", minWidth: "4vh", maxHeight: "5vh", maxWidth: "4vw" }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" title='Share Us On LinkedIn'>
              <svg style={{ margin: "0 0.5vw", minHeight: "5vh", minWidth: "4vh", maxHeight: "5vh", maxWidth: "4vw" }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clipRule="evenodd" />
                <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer" title='Share Us On WhatsApp'>
              <svg style={{ margin: "0 0.5vw", minHeight: "5vh", minWidth: "4vh", maxHeight: "5vh", maxWidth: "4vw" }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" fillRule="evenodd" d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z" clipRule="evenodd" />
                <path fill="currentColor" d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z" />
              </svg>
            </a>

            {/* Donate */}
            {/* {allWebsites.filter(web => web).length !== 0 ?
              <button title="Keep Our Websites Free Of Adds" style={{ display: "flex", border: "solid black", background:"white", padding: "0 0.5vw", color: "black", minWidth: "13vw", justifyContent: "center", alignItems: "center" }} className="rounded smallDonate" onClick={handleDonate}>
                <svg className="w-6 h-6" style={{ margin: "0 0.5vw", minHeight: "5vh", minWidth: "4vh", maxHeight: "5vh", maxWidth: "4vw", color: "red" }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                  <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                </svg> {texts[index]} </button> : ""} */}

          </div>



    </div>
  )
}

export default Footer