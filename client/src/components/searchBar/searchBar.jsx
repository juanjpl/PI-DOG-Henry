import {useState} from 'react'
import styles from './searchBar.module.css'
//import axios from 'axios'
import { searchDogs } from '../../store/actions'
import { useDispatch } from 'react-redux'

import Order from '../order/order'

export default function SearchBar(){

    const [search , setSearch] = useState('')
    let dispatch = useDispatch()

    function onSubmit(e){
        e.preventDefault()
        dispatch(searchDogs(search))
    }

    function onInputChange(e){
        e.preventDefault()
        setSearch(e.target.value)
        console.log(search);
    }
    return(
        <div className={styles.contenedorSearch} >
             <div className={styles.contenedorOrder} >
            <Order/>
            <Order/>
            <Order/>
        </div>
        
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onInputChange} value={search } />
                <input type="submit" value="Buscar"/>
            </form>

       
           
        </div>
    )
}

