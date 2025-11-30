
import Header from "../../../components/header/Header";
import { FaUser, FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";
import { MdLock, MdEdit } from 'react-icons/md'; 
import { BsStars, BsFillPersonFill, BsChatLeftDotsFill, BsX, BsReception4 } from "react-icons/bs";
import { useState, useEffect } from "react"; 
import styles from './perfil.module.css';
import Funcionalidade from "../opcoes_nav/Funcionalidade";
import { jwtDecode } from 'jwt-decode';
import { deletarUsuario, AtualizarUsuario } from "../../../services/UsuarioService";
import { UsuarioReserva } from "../../../services/ReservaService";

const TOKEN_KEY_NAME = import.meta.env.VITE_TOKEN_KEY_NAME;

export const getDecodedToken = () => {
    const token = localStorage.getItem(TOKEN_KEY_NAME);

    if (!token) {
        console.warn("Nenhum token encontrado no localStorage");
        return null;
    }

    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error("Erro ao decodificar o token", error);
        return null;
    }
};


const Perfil = () => {
    const [userData, setUserData] = useState(null);
    const [modalAberto, setModalAberto] = useState("");
    const [modalDadosAberto, setModalDadosAberto] = useState(false);
    const [modalSenhaAberto, setModalSenhaAberto] = useState(false);

    // Estados dos formulários
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    useEffect(() => {
        const data = getDecodedToken(); 
        if (data) {
            setUserData(data);
            setNome(data.nome || "");
            setEmail(data.email || "");
            setTelefone(data.telefone || "");
        }
    }, []);

    let TipoUsuario;
    if(userData){
        if(userData.tipo === "c"){
            TipoUsuario = "Cliente";
        }
        if(userData.tipo === "a"){
            TipoUsuario = "Administrador";
        }
    }

    // ---------------- FUNÇÕES ----------------

    function enviarAjudaWhatsApp() {
        const mensagem = "Olá, estou enfrentando um problema no sistema e preciso de suporte.";
        const url = `https://wa.me/5581999999?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
    }

    function abrirModalDeletar(){
        setModalAberto("deletar");
    }

    function fecharModal(){
        setModalAberto(null);
    }

    async function confirmarDelete() {
        try {
            await deletarUsuario(userData.id);
            localStorage.removeItem(TOKEN_KEY_NAME);
            window.location.href = "/login";
        } catch (error) {
            alert("Erro ao excluir a conta.");
            console.error(error);
        }
    }

    // ----------- SUBMITS CORRIGIDOS ------------

    const handleSubmitDados = async (e) => {
        e.preventDefault();

        try {
            const dados = { nome: nome || undefined, telefone: telefone  || undefined, email: email  || undefined, senha: novaSenha };
            await AtualizarUsuario(userData.id, { dados });
            
            alert("Dados atualizados com sucesso!");
            setModalDadosAberto(false);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSubmitSenha = async (e) => {
        e.preventDefault();

        if (novaSenha !== confirmarSenha) {
            return alert("As senhas não coincidem");
        }

        try {
           const dados = { nome: nome || undefined, telefone: telefone  || undefined, email: email  || undefined, senha: novaSenha };
            await AtualizarUsuario(userData.id,  { dados});

            getDecodedToken(); 
            alert("Senha atualizada com sucesso!");
            setModalSenhaAberto(false);
            setNovaSenha("");
            setConfirmarSenha("");
        } catch (err) {
            alert(err.message);
        }
    };
    
    //-------------carregar reservas
    useEffect(() => {
  async function carregarReservas() {
    try {
      const data = await UsuarioReserva(userData.id);

      const reservasComDetalhes = await Promise.all(
        data.map(async (r) => {
          const quadra = await quadraConsultarID(r.quadra_id);

          return {
            ...r,
            nome_quadra: quadra.nome,
          };
        })
      );

      const total = reservasComDetalhes.length;
      const pendentes = reservasComDetalhes.filter(r => r.status === "pendente").length;
      const confirmadas = reservasComDetalhes.filter(r => r.status === "confirmada").length;
      const canceladas = reservasComDetalhes.filter(r => r.status === "cancelada").length;

      setContadores({
        total,
        pendentes,
        confirmadas,
        canceladas
      });

      setReservas(reservasComDetalhes);
    } catch (err) {
      console.error(err);
      setErro("Erro ao consultar reserva");
    }
  }

  carregarReservas();
}, [user.id]);
    
    // ---------------- JSX ----------------

    return (
        <>
            <Header />
            <Funcionalidade />

            <div className={styles.infoArea}>
                <h2>
                    <BsFillPersonFill style={{marginRight: "5px", color:" #898989", fontSize: "35px",verticalAlign: "top"}}/>
                    Informações do Perfil
                </h2>

                {userData ? (
                    <div className={styles.userDetails}>
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

                <div className={styles.botoesAcao}> 
                    <button 
                        className={`${styles.btnAcao} ${styles.senha}`}
                        onClick={() => setModalSenhaAberto(true)}
                    >
                        <MdLock size={18} style={{marginRight: "5px", color: "#03045E" }} />
                        <strong>ALTERAR SENHA</strong>
                    </button>
                    
                    <button 
                        className={`${styles.btnAcao} ${styles.edit}`}
                        onClick={() => setModalDadosAberto(true)}
                    >
                        <MdEdit size={18} style={{ marginRight: "5px", color: "#03045E" }} />
                        <strong>EDITAR PERFIL</strong>
                    </button>
                </div>
            </div>

            <div className={styles.opcoes}>
                <h2>
                    <BsStars style={{marginRight: "5px", color:" #898989" }} />
                    Mais Opções
                </h2>

                <p className={styles.Help}>
                    <BsChatLeftDotsFill style={{ marginRight: "10px", color: "#898989" }} />
                    <button 
                        style={{ backgroundColor: "transparent", border: "none", cursor: "pointer", verticalAlign: "middle"}}
                        onClick={enviarAjudaWhatsApp}
                    >
                        <strong className={styles.opcoesp}>Ajuda e Suporte</strong>
                    </button>
                </p>

                <p className={styles.deletar}>
                    <BsX style={{marginRight: "5px", color:" #898989", verticalAlign: "top" }} size={35} />
                    <button 
                        style={{ backgroundColor: "transparent", border: "none", cursor: "pointer",  verticalAlign: "middle"}}
                        onClick={abrirModalDeletar}
                    >
                        <strong className={styles.opcoesp}>Excluir Conta</strong>
                    </button>
                </p>
            </div>
            <div className={styles.estatisticas}>
                <h2><BsReception4 size={35} style={{marginRight: "15px", color:" #898989",  verticalAlign: "middle" }} />Suas estatística</h2>
                <div className={styles.topicos}>
                    <h3>reservas feitas</h3>
                </div>
            </div>

            {/* MODAL DELETAR */}
            {modalAberto === "deletar" && (
                <div className={styles.modalOverlay} onClick={fecharModal}>
                    <div
                        className={styles.modalBox}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>Deseja deletar a conta?</h2>

                        <p className={styles.modalDescricao}>
                            Esta ação é irreversível. Confirme se deseja continuar.
                        </p>

                        <div className={styles.modalBotoes}>
                            <button onClick={confirmarDelete} type="submit">
                                Confirmar
                            </button>

                            <button onClick={fecharModal}  type="button">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL EDITAR DADOS */}
            {modalDadosAberto && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalBox}>
                        <h2>Editar Dados</h2>

                        <form onSubmit={handleSubmitDados}>
                            <input
                                type="text"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Telefone"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                            />

                            <div className={styles.modalBotoes}>
                                <button type="submit">Salvar</button>
                                <button type="button" onClick={() => setModalDadosAberto(false)}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL ALTERAR SENHA */}
            {modalSenhaAberto && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalBox}>
                        <h2>Alterar Senha</h2>

                        <form onSubmit={handleSubmitSenha}>
                            <input
                                type="password"
                                placeholder="Nova senha"
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                            />

                            <input
                                type="password"
                                placeholder="Confirmar senha"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                            />

                            <div className={styles.modalBotoes}>
                                <button type="submit">Salvar</button>
                                <button type="button" onClick={() => setModalSenhaAberto(false)}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

          
        </>
    );
};

export default Perfil;
