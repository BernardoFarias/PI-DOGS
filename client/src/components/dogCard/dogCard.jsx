import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFavorite } from "../../actions";
import s from "./dogCard.module.css"

export default function DogCard({name, temperament, weight, image, id}){
    const dispatch = useDispatch()
    const currentFavorites = useSelector((state) => state.dogsFavorites)

    const dogsFavoritesFind = currentFavorites && currentFavorites.find((d) => d.id === id)

    const handleOnClick = (e) => {
        e.preventDefault()
        dispatch(addFavorite(id))
    }

    return(
        <>  
            <div className={s.outterCard}>
            <Link to={`/dogs/${id}`} >
            <div className={s.titleContainer}>
            <label className={s.name}>{name[0]?.toUpperCase() + name.slice(1)}</label>
            </div>
            <div className={s.imgContainer}>
            <img src={image} alt="" className={s.dogImage}/>
            </div>
            <div className={s.height}>Height: {weight} kgs</div>
            </Link>
            <div className={s.tempsContainer}>
            {temperament?.map((e) => (
                <label key={e} className={s.temps}>
                    {" "}{e[0].toUpperCase() + e.slice(1)}
                </label>
            )) || <p className={s.temps}>Unknown  temperaments</p>}
            </div>
            <div className={s.buttonContainer}>
            {dogsFavoritesFind?<button className={s.buttonFaved}>
                <h1 className={s.favFont} onClick={(e) => handleOnClick(e)}>
                    ♥
                </h1>
            </button>:<button className={s.buttonFav}>
                <h1 className={s.favFont} onClick={(e) => handleOnClick(e)}>
                    ♥
                </h1>
            </button>}
            
            </div>
            
            
            </div>
        </>
    )
}