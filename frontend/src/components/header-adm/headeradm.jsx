import styles from './headeradm.module.css';
import { NavLink } from 'react-router-dom';
import { Logout } from '../../services/UsuarioService';
function Headeradm() {
  return (
    <header className={styles["header"]}>
      <div className={styles["logo"]}>
        <h1 className={['h1headeradm']}>ReservouFC <span>- Admin</span></h1>
      </div>
      <nav className={styles["navegacao"]}>
        {/* <NavLink to="/home" className={({ isActive }) => isActive ? styles.active : ''}>Home-ADM</NavLink> */}
        <NavLink to="/admin" className={({ isActive }) => isActive ? styles.active : ''}>Painel de Controle</NavLink>
        <NavLink to="/admin/agendamento" className={({ isActive }) => isActive ? styles.active : ''}>Gerenciar Reservas</NavLink>
        <NavLink to="/admin/campo" className={({ isActive }) => isActive ? styles.active : ''}>Gerenciar Quadras</NavLink>
        <NavLink> <button onClick={Logout}>Sair</button></NavLink>
      </nav>
    </header>
  );
}

export default Headeradm;
