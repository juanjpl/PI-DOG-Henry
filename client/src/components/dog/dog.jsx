
import {Link} from 'react-router-dom'
import styles from './dog.module.css'

export default function Dog({image_url ,id , name ,temperament, life_span, weight, height }){


    return(
        <div className={styles.contenedorCard}>

<div>
        <Link to={`/${name}`} className={styles.nombre} >{name}</Link>
            
            <img src={image_url} alt={name}  className={styles.imagen} />
            {
                
                (typeof(id) === "number")
                ?
                <h2 className={styles.dogApi} >API DOG</h2>
                :
                <h2 className={styles.dogDb} >DB DOG</h2>
            }
            <h2 className={styles.texto} >weight: {weight} kg</h2>
            <h2 className={styles.texto} >Height: {height} mts</h2>
            <h2 className={styles.texto} >Life Span: {life_span} years</h2>
            <h2 className={styles.texto} >Temperamento: {temperament}</h2>
</div>

          

        </div>
    )
}