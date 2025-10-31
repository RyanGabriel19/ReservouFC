import styles from './Btn.module.css'
import { NavLink } from "react-router-dom";

function Btn () {
    return (
    <>
        <div className={styles["btn-painel"]}>
            <NavLink to="/gerenciarUsuarios" className={styles["gerenciar_adm_btn"]}>Gerenciar Usuários</NavLink>
            <NavLink to="/agendamentoadm" className={styles["agendamento_adm_btn"]}>Agendamentos</NavLink>
            <NavLink to="/conta/admin/campo" className={styles["campos_adm_btn"]}>Campos</NavLink>
            
        </div>
        
    </>
    )
}

export default Btn;