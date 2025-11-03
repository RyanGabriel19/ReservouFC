import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from "react";
import styles from './funcionalidade.module.css'
import { Logout } from '../../../services/UsuarioService';
import { getDecodedToken } from '../perfil/perfil';


function Funcionalidade(){
    // hook 'useNavigate' para pegar a função de navegação
    const navigate = useNavigate();
    const [active, setActive] = useState("/conta"); 
    
    // função local para lidar com o clique no botão Sair
    const handleSairClick = (e) => {
        e.preventDefault(); 
        Logout();

        setTimeout(() => {
            navigate('/login');
        }, 500);
    }

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
                            onClick = {handleSairClick}
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