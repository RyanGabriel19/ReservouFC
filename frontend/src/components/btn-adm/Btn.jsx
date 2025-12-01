import styles from './Btn.module.css'
import { NavLink } from "react-router-dom";

function Btn () {
    return (
    <>
        <div className={styles["btn-painel"]}>
            
            <NavLink to="/admin/agendamento" className={styles["agendamento_adm_btn"]}>Reservas</NavLink>
            <NavLink to="/admin/campo" className={styles["campos_adm_btn"]}>Quadras</NavLink>
            
        </div>
        
    </>
    )
}

export default Btn;