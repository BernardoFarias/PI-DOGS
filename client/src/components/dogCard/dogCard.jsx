import React from "react";
import { Link } from "react-router-dom";
import s from "./dogCard.module.css"

export default function DogCard({name, temperament, weight, image, id}){
    return(
        <>
            <Link to={`/dogs/${id}`} className={s.outterCard}>
            <div className={s.titleContainer}>
            <label className={s.name}>{name[0].toUpperCase() + name.slice(1)}</label>
            </div>
            <div className={s.imgContainer}>
            <img src={image} alt="" className={s.dogImage}/>
            </div>
            <div className={s.height}>Height: {weight} kgs</div>
            <div className={s.tempsContainer}>
            {temperament?.map((e) => (
                <label key={e} className={s.temps}>
                    {" "}{e[0].toUpperCase() + e.slice(1)}
                </label>
            )) || <p className={s.temps}>Unknown  temperaments</p>}
            </div>
            
            </Link>
        </>
    )
}