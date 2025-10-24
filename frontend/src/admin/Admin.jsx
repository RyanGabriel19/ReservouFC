import styles from './Admin.module.css';
import Btn from '../components/btn-adm/Btn.jsx';
import {useEffect, useState} from 'react';

function Admin () {

    // contagem de usuários cadastrados
    const [count, setCount ] = useState(0);

useEffect(() => {
    fetch("http://localhost:3000/api/users/count")
    .then((res) => res.json())
    .then((data) => setCount(data.total))
    .catch((err) => console.log("Erro ao buscar número de usuários:", err));
}, []);


    return(
    <>
        <div className={styles["painel_controle"]}>
            <h1>Painel de controle - ADM</h1>
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