import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './Header.module.css';

function Header() {
  const [hideHeader, setHideHeader] = useState(false);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setHideHeader(true); // rolando para baixo
      } else {
        setHideHeader(false); // rolando para cima
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${hideHeader ? styles.hide : ""}`}>
        <img src="fc.png" alt="Reservou FC Logo" className={styles.logo} />
        <nav className={styles.navegacao}>
          <Link to="/home">Home</Link>
          <Link to="/agendamento">Agendamento</Link>
          <Link to="/conta">Conta</Link>
          <Link to="/sobre">Sobre</Link>
        </nav>
      </header>
      <div className={styles.linhaDecorativa}><hr /></div>
    </>
  );
}

export default Header;
