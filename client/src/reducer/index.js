const initialState = {
    dogs: [],
    dogsShowed: [],
    temps: [],
    detail: [],
    filtroTemp: "All",
    filtroCrea: "All",
    dogsFavorites: []
}
function rootReducer(state= initialState, action){
    switch (action.type) {
        case "GET_TEMPS":
            return{
                ...state,
                temps: action.payload
            }
        case "GET_DOGS":
            return{
                ...state,
                dogs: action.payload,
                dogsShowed: action.payload,
            }
        case "SEARCH_NAME":
            return{
                ...state,
                dogsShowed: action.payload
            }
        case "DOG_DETAIL":
            return{
                ...state,
                detail: action.payload
            }
        case "POST_DOG":
            return{
                ...state,
            }
        case "FILTER_BY_TEMPS":
            const allDogs = state.dogsShowed;
            const dogTemps = action.payload === "All" 
                ? allDogs
                : allDogs.filter((e) => e.temperament?.includes(action.payload))
            return {
                ...state,
                dogsShowed: dogTemps,
                filtroTemp: action.payload
            }

        case "FILTER_BY_ORIGIN":
            const allDogs2 = state.dogs
            const dogsOrigin = action.payload === "All" 
                ? allDogs2
                : action.payload === "Cre"
                ? allDogs2.filter((e) => e.created) 
                : allDogs2.filter((e) => !e.created)
            return {
                ...state,
                dogsShowed: dogsOrigin,
                filtroCrea: action.payload
            } 

        case "SORT_BY_NAME":
            const sortedName = action.payload === "All" ? state.dogsShowed :
            action.payload === "Asc" ? state.dogsShowed.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
              }) :
              state.dogsShowed.sort(function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                return 0;
              }) 
            return{
                ...state,
                dogsShowed: sortedName,
                sortFilter: {
                    ...state.sortFilter,
                    sortName: action.payload 
                }
            }
        case "SORT_BY_WEIGHT":
            const weightDogs = state.dogsShowed;

            const sortedWeight = action.payload === "All" ? state.dogsShowed :
            action.payload === "Low" ?
            weightDogs.sort(function(a, b) {
                return a.weight.split(" - ")[0] - b.weight.split(" - ")[0];
                }) :
            weightDogs.sort(function(a, b) {
                return b.weight.split(" - ")[0] - a.weight.split(" - ")[0];
                })
           
            return{
                ...state,
                dogsShowed: sortedWeight,
                sortFilter: {
                    ...state.sortFilter,
                    sortWeight: action.payload
                }
            }
        case "ADD_FAVORITE":
            const currentFavorites = state.dogsFavorites
            const dogsFavoritesFind = currentFavorites && currentFavorites.find((d) => d.id === action.payload.id)
            const dogsFavorites = dogsFavoritesFind 
            ? currentFavorites.filter((d) => d.id !== action.payload.id) 
            : [...state.dogsFavorites, action.payload]
            return {
                ...state,
                dogsFavorites: dogsFavorites
            }
        default:
            return state;
    }
}
export default rootReducer