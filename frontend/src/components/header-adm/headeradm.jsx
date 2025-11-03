import styles from './headeradm.module.css';
import { NavLink } from 'react-router-dom';
import { Logout } from '../../services/UsuarioService';
function Headeradm() {
  return (
    <header className={styles["header"]}>
      <div className={styles["logo"]}>
        <img src="/fc.png" alt="Reservou FC Logo" className={styles.img} />  
        
      </div>
      <nav className={styles["navegacao"]}>
        {/* <NavLink to="/home" className={({ isActive }) => isActive ? styles.active : ''}>Home-ADM</NavLink> */}
        <NavLink to="/admin" className={({ isActive }) => isActive ? styles.active : ''} end= {true}>Painel de Controle</NavLink>
        <NavLink to="/admin/agendamento" className={({ isActive }) => isActive ? styles.active : ''}>Gerenciar Reservas</NavLink>
        <NavLink to="/admin/campo" className={({ isActive }) => isActive ? styles.active : ''}>Gerenciar Quadras</NavLink>
       <button className={styles.sair} onClick={Logout}>Sair</button>
      </nav>
    </header>
  );
}

export default Headeradm;
