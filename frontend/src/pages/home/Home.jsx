import styles from './Home.module.css'
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";
import Footer from '../../components/footer/Footer';
import ImageSlider from '../../components/imageslider/ImageSlider';


function Home () {
    return(
        <>
        <Header />
        

        <div className={styles.homebox}>
        <h1 className={styles.h1home}>CONHEÇA<br />NOSSO SOCIETY</h1>
        <div className={styles.imghome}>
       <ImageSlider/>
        </div>
        <div className={styles.ahome}>
         <div className={styles.linkhome}><Link to="/Agendamento">Faça sua reserva</Link></div> 
        </div>
      </div>
<div className={styles.sobrehome}>
  <h2 className={styles.h2home}>QUEM SOMOS NÓS</h2>
  <div className={styles.textobox}>
    <p className={styles.phome}>
      O futebol society é uma versão moderna do futebol tradicional, jogado em campos menores e com equipes reduzidas. É a escolha perfeita para quem busca praticar esporte de forma descontraída, dinâmica e divertida.
      <br /><br />
      Nosso espaço foi pensado para oferecer conforto, segurança e qualidade. Aqui, você e seus amigos encontram uma estrutura completa para viver momentos inesquecíveis — seja em partidas casuais ou torneios mais sérios.
      <br /><br />
      <strong>Reservou FC — sempre com você!</strong>
    </p>
  </div>
</div>


      
 
        <Footer/>
        </>
    )
}
export default Home