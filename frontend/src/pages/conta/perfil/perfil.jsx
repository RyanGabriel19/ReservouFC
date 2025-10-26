import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";

import { useState, useEffect } from "react"; 
import styles from './perfil.module.css';
import Funcionalidade from "../opcoes_nav/funcionalidades";
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY_NAME = import.meta.env.VITE_TOKEN_KEY_NAME;


const getDecodedToken = () =>{
    if(!TOKEN_KEY_NAME){
        console.error("TOKEN_KEY_NAME não está definida nas variáveis de ambiente!");
        return null;
    }
    const token = localStorage.getItem(TOKEN_KEY_NAME);

    if(token){
        try{
            const decoded = jwtDecode(token);
            return decoded;
        } catch(error){
            console.error("erro ao decodificar o token", error);
            return null;
        }
    }
    return null
};

const Perfil = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
       
        const data = getDecodedToken(); 
        if (data) {
            setUserData(data);
        }
    }, []);

    return (
        <>
            <Header />
           
            
            <div className={styles.perfilContainer}>
                <Funcionalidade />
                
                <div className={styles.infoArea}>
                    <h2>Informações do Perfil</h2>
                    {userData ? (
                        <div className={styles.userDetails}>
                           
                            <p><strong>Nome:</strong> {userData.name || 'Não definido'}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                        </div>
                    ) : (
                        <p>Token não encontrado ou inválido. Faça login novamente.</p>
                    )}
                </div>
            </div>
            
            <Footer />
        </>
    );
};
export default Perfil;