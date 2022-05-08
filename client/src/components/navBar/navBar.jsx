import React from "react";
import {Link} from "react-router-dom";
import s from "./navBar.module.css"

export default function Nav(){
    return (
    <>
      <div className={s.nav}>
        <Link to="/Dogs" >
        <img  className={s.logoNav} id="logoNav" src="https://i.pinimg.com/564x/1e/ec/21/1eec210496dfa2127da662e857d6bb86.jpg" alt="Dogo logo"/>
        </Link>
        <Link to="/Create" className={s.buttons}>
            Create Dog Breed
        </Link>
      </div>
    </>
    )
}