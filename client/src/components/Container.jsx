import React, { useEffect, useRef, useState } from "react";
import Body from './Body'

import DOMPurify from 'dompurify';
import StarsBackground from './Stars';

const Container = ({ snapped, setSnapped, health }) => {

    const mistyped = 'The Errors ';
    const correct = `Your Mistakes `;

    const [display, setDisplay] = useState(mistyped);
    const [phase, setPhase] = useState('wait'); // 'wait' | 'erasing' | 'typing'

    useEffect(() => {
        if (phase === 'wait') {
            const timer = setTimeout(() => setPhase('erasing'), 2000);
            return () => clearTimeout(timer);
        }
    }, [phase]);
 
    // Typewriter erase one by one
    useEffect(() => {
        if (phase === 'erasing' && display.length > 0) {
            const timer = setTimeout(() => {
                setDisplay(display.slice(0, -1));
            }, 60);
            if (display.length === 1) {
                setTimeout(() => setPhase('typing'), 60);
            }
            return () => clearTimeout(timer);
        }
    }, [phase, display]);

    // Typewriter correct word one by one
    useEffect(() => {
        if (phase === 'typing' && display.length < correct.length) {
            const timer = setTimeout(() => {
                setDisplay(correct.slice(0, display.length + 1));
            }, 90);
            return () => clearTimeout(timer);
        }
    }, [phase, display]);

    // Add these lines at the top of your component where other useState/useRef hooks are:
    const word = "Persevere";
    const [activeIndex, setActiveIndex] = useState(-1);
    const [cycles, setCycles] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (cycles < 3) {
            intervalRef.current = setInterval(() => {
                setActiveIndex((prev) => {
                    if (prev + 1 === word.length) {
                        setCycles((c) => c + 1);
                        return -1; // all letters white between cycles
                    }
                    return prev + 1;
                });
            }, 200);
        } else {
            setActiveIndex(-1); // Reset to white at end
        }
        return () => clearInterval(intervalRef.current);
    }, [ cycles, word.length ]);


    return (
        <div id="container">

            <StarsBackground>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // optional: to center horizontally

                }}>

                    <h1 className="Modo">Set New Ambitions, Persist, Boldly Achieve Constant Knack</h1>

                    <h5 style={{ color: "antiquewhite", textAlign: "center", width: "90%" }}>SNAPBACK Is A Call To NEVER Give Up, Even When Everything Seems Against You. {" "}
                        <a href="https://perseverenow.org/" target="_blank" style={{ textDecoration: 'none', fontWeight: "bold", fontSize: "larger", fontVariant: "all-petite-caps", color: "whitesmoke" }}>{word.split("").map((letter, index) => (<span key={index} style={{ color: index === activeIndex ? "maroon" : "whitesmoke", transition: "color 0.2s" }} >{letter}</span>))}</a> With Unwavering Courage Against All Odds, Pursue Your Dreams Fearlessly and Without Self-Doubt, Trust In Your Abilities To Overcome Anything You Put Your Mind Into Doing, Believe In Your Strengths, Embrace <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(display) }} /> In Life—Without Allowing Them To Define Who You Are, Overcome What Others Deem Impossible, Prove Those Who Doubt You Wrong, Set An Example That NOTHING Is Beyond Your Reach, and Always Be Willing To Grow Your Exceptional Skills.</h5>
                    <h2 style={{ textAlign: "center", color: "red", width: "95%" }} className="Modo"><u>Show The World How You SnapBack!</u></h2>


                    <Body health={health} />
                </div>
            </StarsBackground>

        </div>
    )
}

export default Container
