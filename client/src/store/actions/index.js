import axios from 'axios'

export const FETCH_DOGS = "FETCH_DOGS";
export const SEARCH_DOGS = "SEARCH_DOGS";
export const SORT= "SORT";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const ADD_DOG = "ADD_DOG"
export const DELETE_DOG = "DELETE_DOG"


export function getTemperaments(){
    
    return async function(dispatch){
        try{
            var temps = await axios.get("http://localhost:3001/temperament");

            return dispatch({
                type:GET_TEMPERAMENTS,
                payload: temps.data
            })
        }catch(error){
            console.log(error)
        }
        
           
        
    }
}

export function deleteDog(payload){

    return async function( dispatch){
        //console.log(payload)
       
        const response = await axios.delete(`http://localhost:3001/dogs/${payload}`);

        
        //console.log(response)
        
        return response;

        
        
    
}

}


export function postDog(payload){
    
    return async function( dispatch){
        
            const response = await axios.post("http://localhost:3001/dogs" , payload);

            //console.log(response)
            
            return response;
            
        
    }
}

export function fetchDogs(){
    return function(dispatch){
        axios.get('http://localhost:3001/dogs')
        .then((dogs)=>{
            dispatch({
                type:FETCH_DOGS,
                payload:dogs.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

export function searchDogs(search){
    return function(dispatch){
       
        axios.get('http://localhost:3001/dogs?name=' + search)
        .then((dogs)=>{
            dispatch({
                type:SEARCH_DOGS,
                payload:dogs.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

export function sort(order){
    return{
        type: SORT,
        payload:order
    }
}