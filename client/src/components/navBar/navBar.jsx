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
        <div className={s.divButtons}>
        <Link to="/Favorites" className={s.Link1}>
          <button className={s.button}><span>Favorites</span></button>

        </Link>
        <Link to="/Create">
        <button className={s.button}><span>Create Dog Breed</span></button>
       
            
        </Link>
        </div>
        
      </div>
    </>
    )
}