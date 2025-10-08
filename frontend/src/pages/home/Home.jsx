import styles from './Home.module.css'
import Header from "../../components/header/Header";
import Footer from '../../components/footer/Footer';

function Home () {
    return(
        <>
         <Header />
        <div className={styles.boxhome}>
            <img src="campo.png" alt="" className={styles.campo}/><br /><br />
            
            <h2>CONHEÇA</h2>
            <div className={styles.society}>
                <span><strong>NOSSO</strong></span>
                <span><strong>SOCIETY</strong></span>
            </div>
            <div className={styles.info}>
                <p className={styles.p1}>
                Aqui você pode ter a
             </p>
             <p className={styles.p2}>melhor experiência</p>
             <p className="p3">em jogo</p>
            </div>
            <div className={styles.caixa}></div>
        </div>
        <button onClick="">Já faça sua reserva  </button>
        <Footer/>
        </>
    )
}
export default Home