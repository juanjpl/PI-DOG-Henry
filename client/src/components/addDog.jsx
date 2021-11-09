import { useState } from 'react'
import axios from 'axios'
 
export default function AddDog(){

    const [dog , setDog] =  useState({})

    function onInputChange(e){
        e.preventDefault()
        setDog({
            ...dog,
            [e.target.name]: e.target.value
        })
    }

    function onSubmit(e){
        e.preventDefault()
        //le paso por body lo que acumulé en el formulario
         axios.get('' , dog)
         .then(()=>{

         })
    }

    return(


        <form onSubmit={onSubmit} >
            <label htmlFor="" > Nombre:</label>
            <input type="text" onChange={onInputChange} name="name" placeholder="imput 1" value={dog.name} />
            <label htmlFor="" > Imagen:</label>
            <input type="text" onChange={onInputChange} placeholder="imput 1" value={dog.image_url} />
            <label htmlFor="" name="raza" > id:</label>
            <input type="text" onChange={onInputChange} placeholder="imput 1" value={dog.id} />
            <label htmlFor="" > Temperamento:</label>
            <input type="text" name="temperamento" value={dog.temperaments} placeholder="imput 1" />

            <input type="submit" placeholder="imput 1" value="Enviar" />

        </form>

    )
}