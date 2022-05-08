import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByOrigin, filterByTemps, getDogs, getTemps, searchName, sortName, sortWeight } from "../../actions";
import DogCard from "../dogCard/dogCard";
import Pagination from "../pagination/pagination";
import s from "./home.module.css"
import Nav from "../navBar/navBar";

export default function Home(){
    const temps = useSelector(state => state.temps)
    const allDogs = useSelector(state => state.dogsShowed)
    const filterTemp = useSelector(state => state.filtroTemp)
    const filterCrea = useSelector(state => state.filtroCrea)
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1)
    const indexOfLast = currentPage * 8 ;
    const indexOfFirst = indexOfLast - 8 ;
    const currentDogs = allDogs?.slice(indexOfFirst, indexOfLast)
    const [, setSort] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true)

    const paginated = (page) => {
        setCurrentPage(page)
    }

    const totalPages = Math.ceil(allDogs.length / 8);
    const firstPage = () => {
        setCurrentPage(1)
    }
    const lastPage = () => {
        setCurrentPage(totalPages)
    }

    useEffect(()=> {
        const getData = async () => {
        await dispatch(getDogs())
        await dispatch(getTemps());
        setLoading(false)
        }
        getData()
    }, [dispatch])

    function handleFilterTemp(e){
        e.preventDefault()
        dispatch(filterByOrigin(filterCrea))
        dispatch(filterByTemps(e.target.value))
        setCurrentPage(1);
    }

    function handleFilterOrigin(e){
        e.preventDefault()
        dispatch(filterByOrigin(e.target.value))
        dispatch(filterByTemps(filterTemp))
        setCurrentPage(1)
    }

    function handleSortName(e){
        e.preventDefault();
        dispatch(sortName(e.target.value));
        setSort(`Sorted by name: ${e.target.value}`);
        setCurrentPage(1);
    }

    function handleSortWeight(e){
        e.preventDefault();
        dispatch(sortWeight(e.target.value));
        setSort(`Sorted by weight: ${e.target.value}`);
        setCurrentPage(1)
    }

    function handleInput(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSearch(e){
        e.preventDefault();
        dispatch(searchName(name));
        setCurrentPage(1);
    }

    return(  
        <>
            <div>
                <Nav/>
            <div className={s.home}>
            <form className={s.filterContainer}>
                <fieldset className={s.fieldSet}>
                    <legend>Sort</legend>
                    <select onChange={(e) => handleSortName(e)} className={s.filter}>
                        <option value="All">  Name </option>
                        <option value="Asc">  A - Z</option>
                        <option value="Des">  Z - A </option>
                    </select>
                    <select onChange={(e) => handleSortWeight(e)} className={s.filter}>
                        <option value="All">  Weight </option>
                        <option value="Low">  Lowest  </option>
                        <option value="Hig">  Highest  </option>
                    </select>
                </fieldset>
            </form>

            <form onSubmit={(e) => handleSearch(e)} className={s.filterContainer} > 
                <input
                type="text"
                placeholder="Search dog"
                onChange={(e) => handleInput(e)}
                className={s.searchContainer}
                />
            </form>

            <form className={s.filterContainer}>
                <fieldset className={s.fieldSet}>
                    <legend>Filter</legend>
                    <select defaultValue={"All"} onChange={(e) => handleFilterOrigin(e)} className={s.filter}>
                        <option value="All">  Origin </option>
                        <option value="Exi">  Existing Dogs</option>
                        <option value="Cre">  Created </option>
                    </select>
                    <select defaultValue={"All"} onChange={(e) => handleFilterTemp(e)} className={s.filter}>
                        <option value="All">  Temperament </option>
                        {temps?.map((e) => (
                            <option key={e.name} value={e.name}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </fieldset>
            </form>
            
            </div>
            </div>
            <div className={s.display}>
                <Pagination
                paginated={paginated}
                currentPage={currentPage}
                firstPage={firstPage}
                lastPage={lastPage}
                totalPages={totalPages}
                />
            
            
            {loading ? (
                <>
                <p className={s.title}>Calling the pack of dogs...</p>
                <iframe src="https://giphy.com/embed/ONip6r6SCtpZu" width="480" height="365" 
                frameBorder="0" title="giphy-embed" allowFullScreen></iframe>
                
                </>
            ) : (
            <div className={s.dogsContainer}>
                {currentDogs.length > 0 ? 
                (currentDogs?.map((e) => {
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
                <p className={s.title}>No dog found</p>
                )}
            </div>
            )}
            </div>
        </>
    )
}