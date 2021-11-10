import {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router'
import Loading from '../loading/loading'
import Dog from '../dog/dog'
import Card from '../card/card'

import styles from './dogCard.module.css'

export default function DogCard(){

    const [ perro , setPerro] = useState(null)


    let {name} = useParams()

    console.log(name)

    useEffect(()=>{

        axios.get('http://localhost:3001/dogs?name=' + name)
        .then((response)=>{
            setPerro(response.data[0])
        })
        .catch(error => console.log(error) )
        
    },[name ])

    //console.log(perro)
    return( 
        <div className={styles.contenedor} >
            {
                perro 
                ?
                <div   className={styles.contenedorCard} >
                   
                    <Card {...perro} />

               

                    <div className={styles.contenerodBotonera} > 

                      
                      {
                
                (perro.createDB)
                ?
                <button className={styles.buttonM} >MODIFICAR</button>
                :
                <button className={styles.buttonA} >GUARDAR</button>
            }
                     
                        <button className={styles.buttonE} >ELIMINAR</button>
                    </div>
                 


                </div>
                  
                :
                <Loading/>
            }
        </div>
    )
}