import { useState , useEffect} from 'react'
import { useDispatch , useSelector } from "react-redux";
import {postDog, getTemperaments } from "../../store/actions";
import { useHistory} from 'react-router-dom'

import styles from './addDog.module.css'
//import axios from 'axios'

//funcion validadora


export default function AddDog(){

    const temperaments = useSelector((state) => state.temperamentos)
    let dispatch = useDispatch()


    const history = useHistory();

    const [input , setInput] = useState({
        name:"",
        weight:"",
        height:"",
        life_span:"",
        image_url:"",
        temperaments:[]
    })

    const [errors , setErrors] = useState({})

    
    function validate(input){
        let errors = {};

        if(!input.name){
            errors.name = "Se require un nombre";
        }else if(!input.nickname){
            errors.nickname = "Nickname debe ser completado"
        }

        return errors;
    }
 

    function handleChange(e){

        e.preventDefault()

        setInput({ 
            ...input,
            [e.target.name] : e.target.value
         })

         
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        

         console.log(input)
    }

    function handleSubmit(e){

        e.preventDefault()
        console.log(input)     

        dispatch(postDog(input))

        alert("Dog Created!")

        setInput({
            name:"",
            weight:"",
            height:"",
            life_span:"",
            image_url:"",
            temperaments:[]
        })

        history.push('/')
        
    }



    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch])

    //console.log(temperaments)

    function handleSelect(e){

        e.preventDefault()
        setInput({
            ...input,
            temperaments:[...input.temperaments, e.target.value]
        })
        console.log(input)
    }

    function handleDelete(el){
       
        setInput({
            ...input,
            temperaments:input.temperaments.filter(occ => occ !== el)
        })
    }

    return(

            <div className={styles.contenedorHenry} >

                    <form onSubmit={handleSubmit} className={styles.formulario} >
                        <h1>Complete the form and click to send!</h1>
                     
                        <label htmlFor="" > Nombre:</label>
                        <input type="text" onChange={(e)=>handleChange(e)} name="name" placeholder="Breed" value={input.name} />
                        
                        {
                            errors.name && ( 
                                <p className="error">{errors.name} </p>
                            )
                        }
                        
                        <label htmlFor="" > Imagen:</label>
                        <input type="text" name="image_url" onChange={(e)=>handleChange(e)} placeholder="https://image-url.com/image-dog" value={input.image_url} />
                        <label htmlFor=""  > Life_span :</label>
                        <input type="text"name="life_span" onChange={(e)=>handleChange(e)} placeholder="Life_span" value={input.life_span} />
                        <label htmlFor=""  > Weight :</label>
                        <input type="text" name="weight" onChange={(e)=>handleChange(e)} placeholder="Weight" value={input.weight} />
                        <label htmlFor="" > Height :</label>
                        <input type="text"  name="height" onChange={(e)=>handleChange(e)} placeholder="Height" value={input.height} />
                        <label htmlFor="" > Temperamentos:</label>
                      

                        <select onChange={(e)=>handleSelect(e)}>
                            {temperaments.map( (temp) =>( 
                                <option value={temp.name}  >{temp.name} </option>
                            ))}
                        </select>

                                {
                                    input.temperaments.map(el =>
                                        <div>
                                            <p>{el} </p>
                                            <button className="botonX" onClick={()=> handleDelete(el)} >x</button>
                                        </div>
                                        )
                                }

                        <ul>
                            <li>
                                {input.temperaments.map(el =>el+ " , ")}
                            </li>
                        </ul>

                        <input type="submit" placeholder="imput 1" value="Enviar" />

                    </form>
            </div>
  

    )
}