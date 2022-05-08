import React from "react";
import {Link} from "react-router-dom"
import s from "./landingPage.module.css"
import covervideo from "./video.mp4"


export default function LandingPage(){
    return(
        <div>
            <h1 className={s.h1}>Welcome! Find here your perfect dog</h1>
            <div className={s.display}>
            <Link to="/Dogs">
                <button className={s.buttons}>Woof!</button>
            </Link>
            </div>
            <video className={s.background} autoPlay loop muted poster={covervideo}>
            <source src={covervideo} type="video/mp4"/>
            </video>
        </div>
    )
}