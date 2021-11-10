import styles from './henry.module.css'

export default function Henry(){


    return(
        <div className={styles.contenedorHenry} >
            <div className={styles.contenedorImgHenry}>
                
            </div>
            <div className={styles.contenedorTextoHenry}>
                <h1 className={styles.titulo}>Invertimos en tu educación</h1>
                <h2 className={styles.subtitulo} >Comienza a estudiar programación</h2>
                <h3 className={styles.texto} >Conviértete en un Desarrollador Web Full Stack en 4 meses a remoto. Y lo mejor, solo nos pagas cuando consigues un trabajo.</h3>
                <a href="https://www.soyhenry.com/" className={styles.vinculo} >Aplica</a>
            </div>
        </div>
    )
}