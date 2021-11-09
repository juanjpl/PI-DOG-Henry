import styles from './card.module.css'


export default function Card({id, name, life_span, temperaments,weight, height , image_url, createDB}){



    return(
        <div className={styles.contenedorCard}>
            <h1>{id} </h1>
            <h1>{name} </h1>
            <img src={image_url} alt={name}/>
            <h1>{life_span} </h1>
            <h1>{height} </h1>
            <h1>{weight} </h1>
            <h1>{temperaments} </h1>
            {   (createDB)
                ?
                <h1>creado en la base de datos</h1>
                :null
            }

        </div>
    )
}