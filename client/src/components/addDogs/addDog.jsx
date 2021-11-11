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

    const [errors , setErrors] = useState({
        name:"",
        weight:"",
        height:"",
        life_span:"",
        image_url:"",
        temperaments:""
    })

    const [habilitado , setHabilitado] = useState(false)


    function validarForm(errors){
        let valid = true;

        Object.values(errors).forEach((val) => val.length >0 && (valid =false))
        if(valid){
            setHabilitado(true)
        }else{
            setHabilitado(false)
        }
    }


       function handleChange(e){

        const { name , value} =e.target;

        switch (name){
            case "name":
                errors.name = value.length < 5 ? "NAME requerido": ""
                break;
                case "image_url":
                    errors.image_url = value.length < 10 ? "URL requerido": ""
                    break;
                    case "weight":
                        errors.weight = value.length < 2 ? "WEIGHT requerido": ""
                        break;
                        case "life_span":
                            errors.life_span = value.length < 2 ? "LIFE SPAN requerido": ""
                            break;
                        case "height":
                            errors.height = value.length < 2 ? "HEIGHT requerido": ""
                            break;
                            case "temperaments":
                                errors.temperaments = value.length = 0 ? "TEMPERAMENTOS requeridos": ""
                                break;
            default:
                break;
        }

        setInput({ 
            ...input,
            [e.target.name] : e.target.value
         })

         console.log(input)
        
        validarForm(errors)
        console.log(habilitado)
    }

    console.log(habilitado)
  

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

                    <form onSubmit={handleSubmit}  className={styles.formulario} >
                        <h1 className={styles.titulo} >Complete the form and click to send!</h1>
                     
                        {!errors.name ? null : <p className={styles.error}>{errors.name} </p>}
                        <label className={styles.labels} htmlFor="" > Nombre:</label>
                        <input className={styles.input} type="text" onChange={handleChange} name="name" placeholder="Breed" value={input.name} />
                        
                        {!errors.image_url ? null : <p className={styles.error}>{errors.image_url} </p>}
                        <label className={styles.labels} htmlFor="" > Imagen:</label>
                        <input className={styles.input} type="text" name="image_url" onChange={handleChange} placeholder="https://image-url.com/image-dog" value={input.image_url} />
                        
                        {!errors.life_span ? null : <p className={styles.error}>{errors.life_span} </p>}
                        <label className={styles.labels} htmlFor=""  > Life_span :</label>
                        <input className={styles.input} type="number" min="0" max="100" name="life_span" onChange={handleChange} placeholder="Life_span" value={input.life_span} />
                        
                        {!errors.weight ? null : <p className={styles.error}>{errors.weight} </p>}
                        <label className={styles.labels} htmlFor=""  > Weight :</label>
                        <input className={styles.input} type="number" min="0" max="100" name="weight" onChange={handleChange} placeholder="Weight" value={input.weight} />
                        
                        {!errors.height ? null : <p className={styles.error}>{errors.height} </p>}
                        <label className={styles.labels} htmlFor="" > Height :</label>
                        <input className={styles.input} type="number" min="0" max="100"  name="height" onChange={handleChange} placeholder="Height" value={input.height} />
                        
                        {!errors.temperaments ? null : <p className="error">{errors.temperaments} </p>}
                        <label className={styles.labels} htmlFor="" > Temperamentos:</label>
                        <select className={styles.input} onChange={(e)=>handleSelect(e)}>
                            {temperaments.map( (temp) =>( 
                                <option value={temp.name}  >{temp.name} </option>
                            ))}
                        </select>

                                {
                                    input.temperaments.map(el =>
                                        <div className={styles.strings} >
                                            <p>{el} </p>
                                            <button className="botonX" onClick={()=> handleDelete(el)} >x</button>
                                        </div>
                                        )
                                }

                        <ul className={styles.listaTemp}>
                            <li>
                                {input.temperaments.map(el =>el+ " , ")}
                            </li>
                        </ul>
                                
                        
                       {
                           (habilitado)
                           ?
                           <input className={styles.button}  type="submit" placeholder="imput 1" value="Enviar" />
                           :
                           <h2>Habilitame</h2>

                       }
                               
                           
                           
                        
                       
                        

                    </form>
            </div>
  

    )
}