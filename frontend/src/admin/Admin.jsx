import styles from './Admin.module.css';
import Btn from '../components/btn-adm/Btn.jsx';
import {useEffect, useState} from 'react';
import Headeradm from '../components/header-adm/headeradm.jsx';

function Admin () {

    // contagem de usuários cadastrados
    const [count, setCount ] = useState(0);

useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users/count`)
    .then((res) => res.json())
    .then((data) => setCount(data.total))
    .catch((err) => console.log("Erro ao buscar número de usuários:", err));
}, []);


    return(
    <>
    <Headeradm />
        <div className={styles["painel_controle"]}>
            <h1 className={styles['h1adm']}>Painel de controle - ADM</h1>
                        {/* estrutura de front para contagem de usuários */}
            <div className={styles["usercount"]}>
                <h2 className={styles["numberuser"]}>{count}</h2>
                <p className={styles["textuser"]}>Usuários cadastrados</p>
            </div>
            <nav className={styles["option_painel"]}>
                <Btn />
            </nav>
        </div>
    </>
    )
}
export default Admin;