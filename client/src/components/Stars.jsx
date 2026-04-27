import React, { useEffect, useState } from "react";

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// Individual blinking star
function Star() {
  const style = {
    left: `${getRandom(0, 100)}vw`,
    top: `${getRandom(0, 100)}vh`,
    animationDuration: `${getRandom(1, 3)}s`,
  };
  return <div className="star" style={style}></div>;
}

// Shooting star
function ShootingStar() {
    const style = {
      left: `${Math.random() * 80}vw`, // random horizontal start, keep within viewport
      top: `${Math.random() * 80}vh`,  // random vertical start
      animationDuration: "10s",
    };
    return <div className="shooting-star" style={style}></div>;
  }

export default function StarsBackground({ snapped, children }) {
  const [shootingStars, setShootingStars] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setShootingStars((prev) => [
        ...prev,
        { id: Math.random().toString(16).slice(2) },
      ]);
      // Remove shooting star after animation
      setTimeout(() => {
        setShootingStars((prev) => prev.slice(1));
      }, 1500);
    }, getRandom(5000, 20000));
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="star-background">
      {[...Array(100)].map((_, i) => (
        <Star key={i} />
      ))}
      {shootingStars.map((s) => (
        <ShootingStar key={s.id} keyProp={s.id} />
      ))}
      <section className="text-section">{children}</section>
    </div>
  );
}