import { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux"

//import { NavLink } from "react-router-dom";
//import SearchBar from '../searchBar/searchBar'

import styles from './dogs.module.css'
import Loading from '../loading/loading'
import Dog from '../dog/dog'

import { fetchDogs } from "../../store/actions";


export default function Dogs(){

    let perros = useSelector((state)=> state.filtroDogs)

    const [loading , setLoading] = useState(true)
    const [page , setPage] = useState(2)
    const [dogs , setDogs] = useState([])

    /* 
    
    
    pasar el useEffect a la página principal.. así 
    intentamos que no se refresque en cada cambio del componente 
    la petición a la 

    pero si necesitamos que se recargue la copia del state
    en cada proceso para tener siempre el tema ordenamiento
    
    
    
    
    
    
    
    
    
    
    */
    

    let dispatch = useDispatch();

    useEffect(()=>{

       if(!loading){
         return
       } else{
        dispatch(fetchDogs())
        setDogs(paginate(perros))
        console.log("Desde el primer useEffect")
        console.log(dogs)
        setLoading(false)
        
       }

    },[dispatch , loading,dogs,perros ])

    
    useEffect(()=>{

      if(loading)
      setDogs(paginate(perros))
      console.log("Desde el segundo useEffect")
      console.log(dogs)
      setLoading(false)
    },[loading,dogs,setDogs,perros])

    


    const paginate = (pagiDog) => {
      const itemsPerPage = 8
      const numberOfPages = Math.ceil(pagiDog.length / itemsPerPage)
    
      const newDogs = Array.from({ length: numberOfPages }, (_, index) => {
        const start = index * itemsPerPage
        return pagiDog.slice(start, start + itemsPerPage)
      })
    
      return newDogs
    }

  

    const nextPage = () => {
      setPage((oldPage) => {
        let nextPage = oldPage + 1
        if (nextPage > dogs.length - 1) {
          nextPage = 0
        }
        return nextPage
      })
    }

    const prevPage = () => {
      setPage((oldPage) => {
        let prevPage = oldPage - 1
        if (prevPage < 0) {
          prevPage = dogs.length - 1
        }
        return prevPage
      })
    }

    const handlePage = (index) => {
      setPage(index)
    }

    //------------------ 
    //modularizar el paginado
    
  

    //-----------------
      if (loading === true) {
        return (
           <Loading/>
        )
    }



    return(
        <div className={styles.contenedorDogs} >
         
          
          {!loading && (
                <div className={styles.contenedorPaginador}>
                  <div className={styles.botoneraPaginador} >
                  <button className={styles.prevbtn} onClick={prevPage}>
                      prev
                    </button>
                    {dogs.map((item, index) => {
                      return (
                        <button
                          key={index}
                          className={`${index === page ? styles.pagebtn : styles.activebtn }`}
                          onClick={() => handlePage(index)}
                        >
                          {index + 1}
                        </button>
                      )
                    })}
                    <button className={styles.nextbtn } onClick={nextPage}>
                      next
                    </button>
                  </div>
                  
                </div>
           
          )}
          
         
         

            {
                
                dogs[page].map((dogs, index) =>{

                    return(
                        <Dog key={index} {...dogs} />
                    )
                })
            }

        
        </div>
    )
}