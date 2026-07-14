import React, { useEffect, useRef, useState } from 'react'

const Logo = ({ logo, snapped, setLoginModal }) => {

  const [clicks, setClicks] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {

    if (clicks === 3) {
      setLoginModal(true);
      setClicks(0);
      clearTimeout(timeoutRef.current);
    } else if (clicks > 0) {
      // Reset clicks if no third click occurs within 500ms
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setClicks(0), 500);
    }

  }, [ clicks ]);

  return (

    <div className="responsive-container">
      <div
        className="logo-div"
        style={{
          backgroundImage: `url(${logo})`,
        }}
      ></div>

      <section style={{ display: "flex" }}>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: snapped ? "rotate(-10deg)" : "rotate(10deg)",
            transition: "transform 0.5s cubic-bezier(0.68,-0.55,0.27,1.55)"
          }}
        >

          <h1
            id="snapback"
            style={{
              fontSize: "9.5vh",
              fontFamily: "ui-serif",
              margin: "6vh 0",
              zIndex: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            SNAP
            <span
              id="backwards-b"
              style={{
                display: "inline-block",
                transform: snapped ? "scaleX(-1)" : "scaleX(1)",
                transition: "transform 0.5s cubic-bezier(0.68,-0.55,0.27,1.55)",
                // Option 1: Remove color to preserve gradient.
                // Option 2: Use 'color: whitesmoke' but DO NOT use webkit-text-fill-color: transparent on parent.
              }}
            >
              B
            </span>
            ACK

        <p onClick={() => setClicks(c => c + 1)} style={{ fontSize: "0.5em" }} className='spin'>©</p>
          </h1>

        </div>
      </section>

    </div>

  )
}

export default Logo
