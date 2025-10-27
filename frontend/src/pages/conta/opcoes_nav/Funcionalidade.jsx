import { NavLink } from 'react-router-dom';
import { useState } from "react";
import styles from './funcionalidade.module.css'

function Funcionalidade(){

    const [active, setActive] = useState("/conta"); 
    
    return(
        <div className={styles.container}> 
        
            <div className={styles.box}>
                
              
                <ul className={styles.menuList}> 
                    
                   
                    <li className={styles.listItem}>
                        <NavLink 
                            to="/conta" 
                            className={({ isActive }) => (isActive ? styles.active : "")}
                            end={true}
                        >
                            Perfil
                        </NavLink>
                    </li>
                        
                    <li className={styles.listItem}>
                        <NavLink 
                            to="/conta/configuracoes" // Rota preenchida
                            className={({ isActive }) => (isActive ? styles.active :"")}
                            end={true}
                        >
                            Configurações
                        </NavLink>
                    </li>
                        
                    <li className={styles.listItem}>
                        <NavLink 
                            to="/conta/seguranca" // Rota preenchida
                            className={({ isActive }) => (isActive ? styles.active : "")}
                            end={true}
                        >
                            Segurança
                        </NavLink>
                    </li>

                    <li className={styles.listItem}>
                        <NavLink
                            to="/conta/notificacoes" 
                            className={({ isActive }) => (isActive ? styles.active :"")}
                            end={true}
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