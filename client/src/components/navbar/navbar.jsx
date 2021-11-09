import {Link} from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar(){

    return(
        <div className={styles.background} >
            <div>
                <Link to="/"  className={styles.logo} >
                My <span>Breeds</span>
                </Link>

            </div>
            

            <div className={styles.botonera} >
                <Link to="/home" className={styles.linkNavbar}>
                Home
                </Link>


                <Link to="/add"className={styles.linkNavbar}>
                Add Dogs
                </Link>

                
                <Link to="/about" className={styles.linkNavbar}>
                About API
                </Link>

                <Link to="/henry" className={styles.linkNavbar}>
                Henry
                </Link>
    
            </div>
           
        </div>
    )
}