import {  useState , useEffect } from "react";
import {  useSelector  } from "react-redux"

import styles from './dogs.module.css'
import Loading from '../loading/loading'
import Dog from '../dog/dog'


export default function Dogs(){

    let perros = useSelector((state)=> state.filtroDogs)

    
    const [page , setPage] = useState(2)
    const [dogs , setDogs] = useState([])

    
    
   useEffect(()=>{

    setDogs(perros)
    console.log("hola USEEFFECT")
   },[setDogs , perros])


  
    console.log(dogs)

    if(!dogs){
      return( 
        <Loading/>
      )
    }else{

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
          if (nextPage > nuevosPerros.length - 1) {
            nextPage = 0
          }
          return nextPage
        })
      }
  
      const prevPage = () => {
        setPage((oldPage) => {
          let prevPage = oldPage - 1
          if (prevPage < 0) {
            prevPage = nuevosPerros.length - 1
          }
          return prevPage
        })
      }
  
      const handlePage = (index) => {
        setPage(index)
      }



    let nuevosPerros = paginate(perros)


    //------------------ 
    //modularizar el paginado
    // y sus funciones auxiliares 
  

    //-----------------



    return(
        <div className={styles.contenedorDogs} >
         
          
          { 
                <div className={styles.contenedorPaginador}>
                  <div className={styles.botoneraPaginador} >
                  <button className={styles.prevbtn} onClick={prevPage}>
                      prev
                    </button>
                    {nuevosPerros.map((item, index) => {
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
           
            }
          
         
         

            { 
                
               nuevosPerros[page].map((dogs, index) =>{

                    return(
                        <Dog key={index} {...dogs} />
                    )
                })
             
            }

        
        </div>
    )
  }

}