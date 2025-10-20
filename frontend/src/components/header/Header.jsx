
import { Link, useLocation } from "react-router-dom";

import styles from './Header.module.css';



function Header() {

  const location = useLocation();


  return (
    <>
      <header className={styles.header}>
        <img src="fc.png" alt="Reservou FC Logo" className={styles.logo} />
        <nav className={styles.navegacao}>
          <Link to="/home" className={location.pathname === "/home" ? styles.active : ""}>Home</Link>
          <Link to="/agendamento" className={location.pathname === "/agendamento" ? styles.active : ""}>Agendamento</Link>
          <Link to="/conta"  className={location.pathname === "/conta" ? styles.active : ""}>Conta</Link>
         
        </nav>
      </header>
      <div className={styles.linhaDecorativa}><hr /></div>
    </>
  );
}

export default Header;
