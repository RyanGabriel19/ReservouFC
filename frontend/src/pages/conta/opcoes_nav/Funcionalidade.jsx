import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from "react";
import styles from './funcionalidade.module.css'
import { Logout } from '../../../services/UsuarioService';
import { FaUser, FaCog, FaLock, FaHistory, FaRandom } from "react-icons/fa";

function Funcionalidade(){
    const navigate = useNavigate();
    const [open, setOpen] = useState(false); // controla se o dropdown está aberto

  const handleSairClick = async (e) => {
    e.preventDefault();
    await Logout();
    navigate('/login');
};

    return(
        <div className={styles.container}> 
            
     

            {/* Dropdown visível apenas quando "open" for true */}
            {open && (
              <div className={styles.box}>
                <ul className={styles.menuList}> 
                    <li className={styles.listItem}>  
                        <NavLink to="/conta" end><FaUser  style={{ marginRight: "8px", color: "#fff" }} />Perfil</NavLink>
                    </li>
                    <li className={styles.listItem}>
                        <NavLink to="/conta/configuracoes"><FaCog  style={{ marginRight: "8px", color: "#fff" }} />Configurações</NavLink>
                    </li>
                    <li className={styles.listItem}>
                        <NavLink to="/conta/seguranca">Segurança</NavLink>
                    </li>
                    <li className={styles.listItem}>  
                        <NavLink to="/conta/historico"><FaHistory  style={{ marginRight: "8px", color: "#fff" }} />Histórico de Reservas</NavLink>
                    </li>
                    <li className={styles.listItem}>
                        <NavLink to="/conta/sorteador"><FaRandom  style={{ marginRight: "8px", color: "#fff" }} />Sorteador de time</NavLink>
                    </li>
                 <li className={styles.listItem}>
                    <button 
                        type="button"
                        onClick={handleSairClick}
                        className={styles.linkButton}
                    >
                        Sair
                    </button>
                </li>
                </ul>
              </div>
            )}
        </div>
    );
};

export default Funcionalidade;
