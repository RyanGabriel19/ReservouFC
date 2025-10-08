import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from './Sobre.module.css'; // Importa o arquivo CSS

function Sobre () {
    return (
        <>
            <Header />
            
            <div className={styles.societyBox}>
                <h1>Quem somos nós</h1>
                <p>
                    O futebol society é uma versão do futebol tradicional, jogado em campos menores e com equipes reduzidas.
                    A modalidade é ideal para quem deseja praticar esporte de forma descontraída e dinâmica.
                    O nosso espaço oferece um ambiente confortável e seguro para você e seus amigos,
                    com uma estrutura de qualidade para garantir momentos de lazer e diversão.
</p>

            </div>

            <Footer />
        </>
    );
}

export default Sobre;
