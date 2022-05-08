import axios from "axios";

export function getTemps(){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/temperament");
        return dispatch({
            type: "GET_TEMPS",
            payload: json.data
        })
    }
}

export function getDogs(){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/dogs");
        return dispatch({
            type: "GET_DOGS",
            payload: json.data
        })
    }
}

export function searchName(name){
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({
            type: "SEARCH_NAME",
            payload: json.data
        })
    }    
}

export function dogDetail(id){
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/dogs/${id}`);
        return dispatch({
            type: "DOG_DETAIL",
            payload: json.data
        })
    }  
}

export function postDog(payload){
    return async(dispatch) => {
        try {
            const json = await axios.post("http://localhost:3001/dog", payload);
            return dispatch({ 
                type: "POST_RECIPE", 
                payload: json 
            });
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterByTemps(payload){
    return {
        type: "FILTER_BY_TEMPS",
        payload
    }
}

export function filterByOrigin(payload){
    return {
        type: "FILTER_BY_ORIGIN",
        payload
    }
}

export function sortName(payload){
    return {
        type: "SORT_BY_NAME",
        payload
    }
}

export function sortWeight(payload){
    return {
        type: "SORT_BY_WEIGHT",
        payload
    }
}