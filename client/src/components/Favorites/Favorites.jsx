import { useSelector } from "react-redux"
import DogCard from "../dogCard/dogCard"
import Nav from "../navBar/navBar"
import s from "./favorites.module.css"


export default function Favorites() {
    const dogsFavorites = useSelector((state) => state.dogsFavorites)
    return(
        <>
        <Nav/>
        <div className={s.dogsContainer}>
            {console.log(dogsFavorites)}
                {(dogsFavorites && dogsFavorites.length > 0 )? 
                (dogsFavorites?.map((e) => {
                    return (
                    <DogCard
                    temperament={e.temperament}
                    id={e.id}
                    weight={e.weight} 
                    image={e.image} 
                    name={e.name} 
                    key={e.id}
                    />
                    )
                })
                ) : (
                <p className={s.title}>There are no dogs in favorites</p>
                )}
            </div>
        </>
    )
}