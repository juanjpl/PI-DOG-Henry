import styles from './card.module.css'


export default function Card({id, name, life_span, temperament,weight, height , image_url, createDB}){



    return(
        <div className={styles.contenedorCard}>
            
            <h1 className={styles.nombre} >{name} </h1>
            <img src={image_url} alt={name} className={styles.imagen} />
            <h1 className={styles.description} >Life Span:  {life_span} </h1>
            <h1 className={styles.description}>Height: {height} </h1>
            <h1 className={styles.description}>Weight: {weight} </h1>
            <h1 className={styles.description}>Temperaments: {temperament} </h1>
          

            {
                
                (typeof(id) === "number")
                ?
                <h2 className={styles.dogApi} >API DOG</h2>
                :
                <h2 className={styles.dogDb} >DB DOG</h2>
            }

      

        </div>
    )
}