import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import { FaUser, FaEnvelope, FaPhone, FaIdBadge,FaPencilAlt, FaLock  } from "react-icons/fa";
import { MdLock } from 'react-icons/md'; 
import { MdEdit } from 'react-icons/md'; 
import { useState, useEffect } from "react"; 
import styles from './perfil.module.css';
import Funcionalidade from "../opcoes_nav/Funcionalidade";
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY_NAME = import.meta.env.VITE_TOKEN_KEY_NAME;


export const getDecodedToken = () =>{
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
    

    let TipoUsuario;
    if(userData){
        if(userData.tipo === "c"){
            TipoUsuario = "Cliente"
        }
        if(userData.tipo === "a"){
            TipoUsuario = "Administrador"
        }
    }



    return (
        <>
           <Header />
            <Funcionalidade />
            
            <div className={styles.infoArea}>
                <h2>Informações do Perfil</h2>
                {userData ? (
                    <div className={styles.userDetails}>
                        
                        {/* APLICAÇÃO DO FLEXBOX PARA ALINHAR ÍCONE E TEXTO */}
                        <div className={styles.infoLinha}>
                            <FaUser style={{ marginRight: "8px", color: "#fff" }} />
                            <p><strong>Nome: </strong>{userData.nome || 'Não definido'}</p>
                        </div>
                        
                        <div className={styles.infoLinha}>
                            <FaEnvelope style={{ marginRight: "8px", color: "#fff" }} />
                            <p><strong>Email: </strong>{userData.email}</p>
                        </div>
                        
                        <div className={styles.infoLinha}>
                            <FaPhone style={{ marginRight: "8px", color: "#fff" }} />
                            <p><strong>Telefone: </strong>{userData.telefone}</p>
                        </div>
                        
                        <div className={styles.infoLinha}>
                            <FaIdBadge style={{ marginRight: "8px", color: "#fff" }} />
                            <p><strong>Tipo da Conta: </strong>{TipoUsuario}</p>
                        </div>
                        
                    </div>
                ) : (
                    <p>Token não encontrado ou inválido. Faça login novamente.</p>
                )}
                
                {/* O container dos botões já existia, mas vamos garantir o alinhamento vertical dos ícones nos botões */}
                <div className={styles.botoesAcao}> 
                    <button className={`${styles.btnAcao} ${styles.senha}`}> 
                         <MdLock size={18} style={{marginRight: "5px", color: "#03045E" }} />
                        <strong> ALTERAR SENHA</strong>
                    </button>
                        
                    <button className={`${styles.btnAcao} ${styles.edit}`}> 
                        <MdEdit size={18} style={{ marginRight: "5px", color: "#03045E" }} />
                        <strong>EDITAR PERFIL</strong>
                    </button>
                </div>
            </div>
            
            
        </>
    );
};
export default Perfil;