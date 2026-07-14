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
    fontSize: "clamp(2.5rem, 15vw, 6rem)",
    fontFamily: "ui-serif",
    margin: "clamp(1rem, 4vh, 3rem) 0",
    zIndex: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",
    textAlign: "center",
    lineHeight: 1,
    width: "100%",
  }}
>
  SNAP
  <span
    id="backwards-b"
    style={{
      display: "inline-block",
      transform: snapped ? "scaleX(-1)" : "scaleX(1)",
      transition: "transform 0.5s cubic-bezier(0.68,-0.55,0.27,1.55)",
    }}
  >
    B
  </span>
  ACK

  <p
    onClick={() => setClicks(c => c + 1)}
    className="spin"
    style={{
      fontSize: "0.4em",
      margin: 0,
      marginLeft: "0.15em",
      alignSelf: "flex-start",
      cursor: "pointer",
      userSelect: "none",
    }}
  >
    ©
  </p>
</h1>

        </div>
      </section>

    </div>

  )
}

export default Logo
