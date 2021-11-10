import styles from './about.module.css'


export default function About(){


    return(
        <div className={styles.contenedorHenry} >
        <div className={styles.contenedorImgHenry}>
            
        </div>
        <div className={styles.contenedorTextoHenry}>
            <h1 className={styles.titulo}>The internet's biggest collection of open source dog pictures.</h1>
            <h2 className={styles.subtitulo} >Read our documentation to find out more or try it out for yourself below.</h2>
            <h3 className={styles.texto} >Want to add your dog to the collection? Submit your photos as a pull request here.</h3>
            <h3 className={styles.texto} >Need more dog in your life? Get issue 1 of Dog CEO Zine - a quarterly business and lifestyle magazine for the modern dog. Featuring an exclusive interview with Scottie the Monopoly dog. Order your copy from Side Orders Publishing. Ships worldwide.</h3>

            
            
            <a href="https://dog.ceo/dog-api/" className={styles.vinculo} >go dog api</a>
        </div>
    </div>
    )
}