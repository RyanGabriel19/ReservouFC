import { NavLink } from 'react-router-dom';
import { useState } from "react";
import styles from './funcionalidade.module.css'
import { Logout } from '../../../services/UsuarioService';
import { getDecodedToken } from '../perfil/Perfil';

const user = getDecodedToken();
function Funcionalidade(){

    
    const user = getDecodedToken();
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

                    {user.tipo === "a" &&(
                        <li className={styles.listItem}>
                        <NavLink 
                            to="/conta/admin" // Rota preenchida
                            className={({ isActive }) => (isActive ? styles.active : "")}
                            end={true}
                        >
                            Painel Admin
                        </NavLink>
                        </li>
                        
                    )}
                    
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