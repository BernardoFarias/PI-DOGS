import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { dogDetail } from "../../actions";
import { useParams} from "react-router-dom";
import Nav from "../navBar/navBar";
import s from "./dogDetail.module.css"

export default function DogDetail(){
    const dispatch = useDispatch();
    const currentDog = useSelector((state) => state.detail)
    let { id } = useParams();

    useEffect(() => {
        dispatch(dogDetail(id))
    },[id, dispatch])

    
    
    return (
        <div>
            <Nav />
            <div className={s.display}>
                
                <div className={s.imgContainer}>
                <img src={currentDog.image} alt="" className={s.detailImage}/>
                </div>
                <div className={s.detailsContainer}>
                <div className={s.name}>
                    {currentDog.name}
                </div>
                <div className={s.title}>Life Span : {currentDog.lifeSpan}</div>
                <div className={s.title}>Height : {currentDog.height} cm</div>
                <div className={s.title}>Weight : {currentDog.weight} kg</div>
                <div>
                {currentDog.temperament?.map((e) => (
                            <div key={e} value={e} className={s.temps}>
                                {e}
                            </div>
                        )) || <p className={s.temps}>Unknown  temperaments</p>}    
                </div>
                </div>
            </div>
        </div>
    )
}