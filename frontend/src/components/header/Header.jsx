import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { Logout } from '../../services/UsuarioService';
function Header() {

  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const handleSairClick = async (e) => {
    e.preventDefault();
    await Logout();
    navigate('/login');
};

  return (
    <>
      <header className={styles.header}>
        <NavLink to="/home">
          <img src="/fc.png" alt="Reservou FC Logo" className={styles.logo} />
        </NavLink>

        {/* Botão hambúrguer só no celular */}
        <button 
          className={styles.menuToggle} 
          onClick={() => setMenuAberto(!menuAberto)}
        >
          ☰
        </button>

        {/* Navegação */}
        <nav className={`${styles.navegacao} ${menuAberto ? styles.aberto : ''}`}>
          <NavLink to="/home" className={({ isActive }) => (isActive ? styles.active : "")}>
            Home
          </NavLink>
          <NavLink to="/reserva" className={({ isActive }) => (isActive ? styles.active : "")}>
            Reserva
          </NavLink>

          {/* Conta com dropdown */}
          <div className={styles.dropdown}>
            <NavLink to="/conta" className={({ isActive }) => (isActive ? styles.active : "")}>
              Conta
            </NavLink>
            <div className={styles.dropdownMenu}>
              <NavLink to="/conta" end>Perfil</NavLink>
              
              <NavLink to="/conta/historico">Histórico de Reservas</NavLink>
              <NavLink to="/conta/sorteador">Sorteador de time</NavLink>
              
              <button 
                  type="button"
                  onClick={handleSairClick}
                  className={styles.linkButton}
              >
                  Sair
              </button>

            </div>
          </div>
        </nav>
      </header>
      <div className={styles.linhaDecorativa}><hr /></div>
    </>
  );
}

export default Header;
