import styles from './headeradm.module.css';
// 1. Importe o 'useNavigate' junto com o 'NavLink'
import { NavLink, useNavigate } from 'react-router-dom';
import { Logout } from '../../services/UsuarioService';

function Headeradm() {
  const navigate = useNavigate();

  const handleSairClick = () => {
    Logout();

    setTimeout(() => {
        navigate('/login');
    }, 500);
  }

  return (
    <header className={styles["header"]}>
        <div className={styles["logo"]}>
        {/* <img src="/fc.png" alt="Reservou FC Logo" className={styles.img} />   */}
        <NavLink 
        to="/admin">
          <img src="/fc.png" alt="Reservou FC Logo" className={styles.logo} />
        </NavLink>
        
      </div>
      <nav className={styles["navegacao"]}>
        {/* <NavLink to="/home" className={({ isActive }) => isActive ? styles.active : ''}>Home-ADM</NavLink> */}
       
        <NavLink to="/admin/agendamento" className={({ isActive }) => isActive ? styles.active : ''}>Gerenciar Reservas</NavLink>
        <NavLink to="/admin/campo" className={({ isActive }) => isActive ? styles.active : ''}>Gerenciar Quadras</NavLink>
       {/* O botão agora chama a nova função 'handleSairClick' */}
       <button className={styles.sair} onClick={handleSairClick}>Sair</button>
      </nav>
    </header>
  );
}

export default Headeradm;


// function Headeradm() {
//   return (
//     <header className={styles["header"]}>
//       <div className={styles["logo"]}>
//         <img src="/fc.png" alt="Reservou FC Logo" className={styles.img} />  
        
//       </div>
//       <nav className={styles["navegacao"]}>
//         {/* <NavLink to="/home" className={({ isActive }) => isActive ? styles.active : ''}>Home-ADM</NavLink> */}
//         <NavLink to="/admin" className={({ isActive }) => isActive ? styles.active : ''} end= {true}>Painel de Controle</NavLink>
//         <NavLink to="/admin/agendamento" className={({ isActive }) => isActive ? styles.active : ''}>Gerenciar Reservas</NavLink>
//         <NavLink to="/admin/campo" className={({ isActive }) => isActive ? styles.active : ''}>Gerenciar Quadras</NavLink>
//        <button className={styles.sair} onClick={Logout}>Sair</button>
//       </nav>
//     </header>
//   );
// }

// export default Headeradm;
