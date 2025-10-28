import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';

function Header() {
 

  return (
    <>
      <header className={styles.header}>
        <NavLink 
        to="/home">
          <img src="/fc.png" alt="Reservou FC Logo" className={styles.logo} />
        </NavLink>
        
        <nav className={styles.navegacao}>
          
          
          <NavLink 
            to="/home" 
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/agendamento" 
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Agendamento
          </NavLink>
          
          <NavLink 
            to="/conta" 
            className={({ isActive }) => (isActive ? styles.active : "")}
            end={false}
          >
            Conta
          </NavLink>
          
        </nav>
      </header>
      <div className={styles.linhaDecorativa}><hr /></div>
    </>
  );
}

export default Header;