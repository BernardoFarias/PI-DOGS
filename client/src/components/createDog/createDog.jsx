import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemps, postDog } from "../../actions";
import { useNavigate } from "react-router-dom"
import validate from "../validation.js";
import Nav from "../navBar/navBar";
import s from "./createDog.module.css"



export default function DogDetail(){
    const dispatch = useDispatch();
    const temps = useSelector((state) => state.temps);
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: "",
        temps: [],
        lifeMin: "",
        lifeMax: "",
        minWeight: ``,
        maxWeight: ``,
        minHeight: ``,
        maxHeight: ``,
        image: ""
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getTemps())
    }, [dispatch]);

    function resetInput(){
        setInput({
        name: "",
        temps: [],
        lifeMin: "",
        lifeMax: "",
        minWeight: ``,
        maxWeight: ``,
        minHeight: ``,
        maxHeight: ``,
        image: ""
        })
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        
        setErrors(
            validate({
              ...input,
              [e.target.name]: e.target.value,
            })
          );
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postDog(
            {
        name: `${input.name}`,
        temperament: [...input.temps],
        lifeSpan: `${input.lifeMin} - ${input.lifeMax} years`,
        weight:`${input.minWeight} - ${input.maxWeight}`,
        height: `${input.minHeight} - ${input.maxHeight}`,
        image: `${input.image}`
            }
        ))
        alert("Dog created!");
        resetInput();
        navigate("/Dogs");
    }

    function handleCheckbox(e){
        if(e.target.checked && !input.temps.includes(e.target.value)){
            setInput({
                ...input,
                temps: [...input.temps , e.target.value ]
            })
        } else if(!e.target.checked){
            setInput({
                ...input,
                temps: input.temps.filter((t) => t !== e.target.value)
            })
        }
    }

    return(
        <div>
            <Nav></Nav>
            <div className={s.display}>
            <img src="https://previews.123rf.com/images/photodeti/photodeti1802/photodeti180200028/95646477-hund-arbeiter-mit-werkzeugg%C3%BCrtel-h%C3%A4lt-hammer-und-daumen-hoch-getrennt-auf-wei%C3%9Fem-hintergrund.jpg" 
            alt="" className={s.imgContainer}/>
            <form onSubmit={(e) => handleSubmit(e)}>
            <h1 className={s.title}>Build your dog breed</h1>
                <div className={s.divInput}>
                    <label className={s.subtitle}>Name</label>
                    <input 
                    type="text"
                    name="name"
                    value={input.name}
                    placeholder= "Dog's breed name ..."
                    onChange={handleChange}
                    className={s.inputName}
                    />
                    
                </div>
                {errors.name && <p className={s.error}>{errors.name}</p>}
                <div className={s.divInput}>
                    <label className={s.subtitle}>Height</label>
                    <input 
                    type="text"
                    name="minHeight"
                    value={input.minHeight}
                    placeholder= "Dog's minimum height ..."
                    onChange={handleChange}
                    className={s.input}
                    />
                    <input 
                    type="text"
                    name="maxHeight"
                    value={input.maxHeight}
                    placeholder= "Dog's maximum height ..."
                    onChange={handleChange}
                    className={s.input}
                    />
                    
                </div>
                {errors.maxHeight && <p className={s.error}>{errors.maxHeight}</p>}
                <div className={s.divInput}>
                    <label className={s.subtitle}>Weight</label>
                    <input 
                    type="text"
                    name="minWeight"
                    value={input.minWeight}
                    placeholder= "Dog's minimum weight ..."
                    onChange={handleChange}
                    className={s.input}
                    />
                    
                    <input 
                    type="text"
                    name="maxWeight"
                    value={input.maxWeight}
                    placeholder= "Dog's maximum weight ..."
                    onChange={handleChange}
                    className={s.input}
                    />
                    
                </div>
                {errors.maxWeight && <p className={s.error}>{errors.maxWeight}</p>}
                <div className={s.divInput}>
                    <label className={s.subtitle}>Lifespan</label>
                    <input 
                    type="text"
                    name="lifeMin"
                    value={input.lifeMin}
                    placeholder= "Dog's minimum lifespan ..."
                    onChange={handleChange}
                    className={s.input}
                    />
                    
                    <input 
                    type="text"
                    name="lifeMax"
                    value={input.lifeMax}
                    placeholder= "Dog's maximum lifespan ..."
                    onChange={handleChange}
                    className={s.input}
                    />
                    
                </div>
                {errors.lifeMax && <p className={s.error}>{errors.lifeMax}</p>}
                <div className={s.divInput}>
                    <label className={s.subtitle}>Image</label>
                  
                    <input
                    type="url"
                    name="image"
                    value={input.image}
                    placeholder= "Image URL ..."
                    onChange={handleChange}
                    className={s.inputName}
                    />
                    
            
                </div>
                {errors.image && <p className={s.error}>{errors.image}</p>}
            </form>
            
            </div>
            <div className={s.tempsContainer}>
                    <label className={s.subtitle}>Temperaments</label>
                    {temps?.map((e) => (
                        <span className={s.checkbox}>
                        <label key={e.name} className={s.temps}>
                            <input
                            type="checkbox"
                            value={e.name}
                            name={e.name}
                            onChange={(e) => handleCheckbox(e)}
                            />
                            {e.name}
                        </label>
                        </span>
                    ))}
                    
            </div>
            <div className={s.buttonContainer}>
            <button className={s.button}>Create</button>
            </div>
        </div>
    )
}