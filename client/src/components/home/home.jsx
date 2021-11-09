import styles from './home.module.css'

import SearchBar from '../searchBar/searchBar'
import Dogs from '../dogs/dogs'


export default function Home(){


    return(
        <div className={styles.contenedorHome} >
            <SearchBar/>
            <Dogs/>

        </div>
    )
}