import { NavLink } from 'react-router-dom';
import { useState } from "react";
import styles from './funcionalidade.module.css'

function Funcionalidade(){

    const [active, setActive] = useState("perfil"); 
    
    return(
        <div className={styles.container}> 
        
            <div className={styles.box}>
                
              
                <ul className={styles.menuList}> 
                    
                   
                    <li className={styles.listItem}>
                        <NavLink 
                            to="/perfil" 
                            className={({ isActive }) => (isActive ? styles.active : "")}
                        >
                            Perfil
                        </NavLink>
                    </li>
                        
                    <li className={styles.listItem}>
                        <NavLink 
                            to="/configuracoes" // Rota preenchida
                            className={({ isActive }) => (isActive ? styles.active :"")}
                        >
                            Configurações
                        </NavLink>
                    </li>
                        
                    <li className={styles.listItem}>
                        <NavLink 
                            to="/seguranca" // Rota preenchida
                            className={({ isActive }) => (isActive ? styles.active : "")}
                        >
                            Segurança
                        </NavLink>
                    </li>

                    <li className={styles.listItem}>
                        <NavLink
                            to="/notificacoes" 
                            className={({ isActive }) => (isActive ? styles.active :"")}
                        >
                            Notificações
                        </NavLink>
                    </li>
                </ul>

            </div>
        
        </div>
    );
};

export default Funcionalidade;