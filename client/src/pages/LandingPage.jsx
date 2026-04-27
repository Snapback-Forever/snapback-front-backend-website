
import React, { useEffect, useState } from "react";



import logo from "../images/wave.gif"
import forever from "../images/foreverNeededGIftsLOGO.png"
import health from "../images/snapBackHealthy.png"

import Container from "../components/Container";
import Logo from "../components/Logo";
import Login from "../components/Login";


const LandingPage = () => {

    const [ snapped, setSnapped ] = useState(false);
    const [ loginModal, setLoginModal ] = useState(false)

    useEffect(() => {
        
        // Start with the B normal, then snap back after 1 second
        setTimeout(() => setSnapped(true), 1000);
        // Setup interval to reset then snap again every 30 seconds
        const interval = setInterval(() => {
            setSnapped(false); // Reset to normal
            setTimeout(() => setSnapped(true), 1000); // Snap back after 1 second
        }, 30000);

        return () => clearInterval(interval);

    }, []);

  

    return (

        <div style={{ background: "black", padding: "4vh 2vw 0 2vw", width: "100vw", height: '94vh', overflowY: "scroll" }}>
            

            <Logo logo={logo} snapped={snapped} setLoginModal={setLoginModal} />

            <Container snapped={snapped} setSnapped={setSnapped} health={health} forever={forever} />

            <dialog open={loginModal}> 
                <Login loginModal={loginModal} setLoginModal={setLoginModal} />
            </dialog>

        </div>

    );
};


export default LandingPage
