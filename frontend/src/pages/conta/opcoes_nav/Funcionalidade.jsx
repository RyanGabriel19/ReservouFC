import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from "react";
import styles from './funcionalidade.module.css'
import { Logout } from '../../../services/UsuarioService';

function Funcionalidade(){
    const navigate = useNavigate();
    const [open, setOpen] = useState(false); // controla se o dropdown está aberto

    const handleSairClick = (e) => {
        e.preventDefault(); 
        Logout();
        setTimeout(() => {
            navigate('/login');
        }, 500);
    }

    return(
        <div className={styles.container}> 
            
     

            {/* Dropdown visível apenas quando "open" for true */}
            {open && (
              <div className={styles.box}>
                <ul className={styles.menuList}> 
                    <li className={styles.listItem}>
                        <NavLink to="/conta" end>Perfil</NavLink>
                    </li>
                    <li className={styles.listItem}>
                        <NavLink to="/conta/configuracoes">Configurações</NavLink>
                    </li>
                    <li className={styles.listItem}>
                        <NavLink to="/conta/seguranca">Segurança</NavLink>
                    </li>
                    <li className={styles.listItem}>
                        <NavLink to="/conta/historico">Histórico de Reservas</NavLink>
                    </li>
                    <li className={styles.listItem}>
                        <NavLink to="/conta/sorteador">Sorteador de time</NavLink>
                    </li>
                    <li className={styles.listItem}>
                        <NavLink to="#" onClick={handleSairClick}>Sair</NavLink>
                    </li>
                </ul>
              </div>
            )}
        </div>
    );
};

export default Funcionalidade;
