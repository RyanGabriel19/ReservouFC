import { Link } from "react-router-dom";
import styles from "../inicio/inicio.module.css";
import Footer from "../../components/footer/Footer";

function Inicio() {
  return (
    <>
    <section className={styles.inicioContainer}>
      <div className={styles.inicioBox}>
        <h1 className={styles.titulo}>Bem-vindo ao <span>ReservouFC</span></h1>
        <p className={styles.subtitulo}>
         Chega de improviso — aqui você reserva o campo,  chama o time e faz o jogo acontecer. ⚽
        </p>

        <div className={styles.botoes}>
          <Link to="/login" className={`${styles.btn} ${styles.entrar}`}>
            Entrar
          </Link>
          <Link to="/cadastro" className={`${styles.btn} ${styles.cadastrar}`}>
            Cadastrar
          </Link>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
}

export default Inicio;
