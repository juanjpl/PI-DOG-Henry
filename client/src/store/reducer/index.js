import { FETCH_DOGS , SEARCH_DOGS , SORT } from "../actions";
import { ASCENDENTE } from "../../constantes/sort";


const initialState = {
    dogs:[],
    filtroDogs:[],
    temperamentos:[]
}


const paginate = (pagiDog) => {
    const itemsPerPage = 8
    const numberOfPages = Math.ceil(pagiDog.length / itemsPerPage)
  
    const newDogs = Array.from({ length: numberOfPages }, (_, index) => {
      const start = index * itemsPerPage
      return pagiDog.slice(start, start + itemsPerPage)
    })
  
    return newDogs
  }



export default function reducer(state= initialState , action) {
    switch(action.type){
        case FETCH_DOGS:
            return{
                ...state,
                dogs: action.payload,
                filtroDogs: action.payload
            }
        case SEARCH_DOGS:
            return{
                ...state,
                filtroDogs: paginate(action.payload)
            }  
            
        case SORT:
            let ordenamiento = [...state.dogs]
            
            ordenamiento = ordenamiento.sort((a, b) => {
                if (a.name < b.name) {
                    return action.payload === ASCENDENTE ? -1 : 1;
                }
                if (a.name > b.name) {
                    return action.payload === ASCENDENTE ? 1 : -1;
                }
                return 0;
            })
            return{
                ...state,
                filtroDogs : ordenamiento
            } 
            


        default :
            return state
    }
}