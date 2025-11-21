import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

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
              <NavLink to="/conta/configuracoes">Configurações</NavLink>
              <NavLink to="/conta/seguranca">Segurança</NavLink>
              <NavLink to="/conta/historico">Histórico de Reservas</NavLink>
              <NavLink to="/conta/sorteador">Sorteador de time</NavLink>
              <NavLink to="/logout">Sair</NavLink>
            </div>
          </div>
        </nav>
      </header>
      <div className={styles.linhaDecorativa}><hr /></div>
    </>
  );
}

export default Header;
