
import React, { useEffect, useRef, useState } from "react";

const Logo = ({ logo, snapped, setLoginModal }) => {
  const [clicks, setClicks] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (clicks === 3) {
      setLoginModal(true);
      setClicks(0);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      return;
    }

    if (clicks > 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setClicks(0);
      }, 500);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [clicks, setLoginModal]);

  const handleCopyrightClick = () => {
    setClicks((currentClicks) => currentClicks + 1);
  };

  return (
    <div className="responsive-container">
      <div
        className="logo-div"
        style={{
          backgroundImage: `url(${logo})`,
        }}
        role="img"
        aria-label="Snapback Forever logo"
      />

      <section className="text-section">
        <div
          className="snapback-title-wrapper"
          style={{
            transform: snapped ? "rotate(-10deg)" : "rotate(10deg)",
          }}
        >
          <h1 id="snapback" className="snapback-title">
            <span>SNAP</span>

            <span
              id="backwards-b"
              style={{
                transform: snapped ? "scaleX(-1)" : "scaleX(1)",
              }}
            >
              B
            </span>

            <span>ACK</span>

            <button
              type="button"
              className="spin copyright-button"
              onClick={handleCopyrightClick}
              aria-label="Open administrator login"
            >
              ©
            </button>
          </h1>
        </div>
      </section>
    </div>
  );
};

export default Logo;

