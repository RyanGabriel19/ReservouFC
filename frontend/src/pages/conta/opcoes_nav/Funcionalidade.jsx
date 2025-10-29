import { NavLink } from 'react-router-dom';
import { useState } from "react";
import styles from './funcionalidade.module.css'
import { Logout } from '../../../services/UsuarioService';



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
                            to="#" 
                            onClick = {(e) =>{
                                e.preventDefault;
                                Logout();
                               
                            } 

                            }
                        >
                            Sair
                        </NavLink>
                    </li>
                </ul>

            </div>
        
        </div>
    );
};

export default Funcionalidade;