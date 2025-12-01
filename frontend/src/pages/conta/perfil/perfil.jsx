import Header from "../../../components/header/Header";
import { Navigate, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";
import { MdLock, MdEdit } from 'react-icons/md'; 
import { BsStars, BsFillPersonFill, BsChatLeftDotsFill, BsX, BsReception4, BsFillCalendarWeekFill, BsFillCartPlusFill,BsList } from "react-icons/bs";
import { useState, useEffect } from "react"; 
import styles from './perfil.module.css';
import Funcionalidade from "../opcoes_nav/Funcionalidade";
// A importação correta de 'jwt-decode' é geralmente assim:
import { jwtDecode } from 'jwt-decode'; 
import {quadraConsultarID} from "../../../services/QuadraService";
import { deletarUsuario, AtualizarUsuario } from "../../../services/UsuarioService";
import { HoraCorreta, UsuarioReserva, formatarData, } from "../../../services/ReservaService";


const TOKEN_KEY_NAME = import.meta.env.VITE_TOKEN_KEY_NAME;

// --- FUNÇÕES AUXILIARES FALTANTES OU MELHORADAS ---

/**
 * Define um componente simples para exibir o status da reserva com cores/estilos.
 * Você pode expandir o CSS no módulo de estilos.
 */
const StatusLabel = ({ status }) => {
    let style = {};
    let text = status;

    switch (status) {
        case "CONFIRMADO":
            style = { color: 'green', fontWeight: 'bold' };
            break;
        case "PENDENTE":
            style = { color: 'orange', fontWeight: 'bold' };
            break;
        case "CANCELADO":
            style = { color: 'red', fontWeight: 'bold' };
            break;
        default:
            style = { color: 'gray' };
            text = "INDEFINIDO";
    }

    return <span style={style}>{text}</span>;
};

/**
 * Função utilitária para formatar datas (e.g., para data e hora de criação)
 */
const formatarDataCriacao = (isoString) => {
    if (!isoString) return 'N/A';
    try {
        const date = new Date(isoString);
        return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
        return 'Data inválida';
    }
};

/**
 * Função utilitária para formatar a data/hora da reserva
 */
const formatarDataReserva = (isoString) => {
    if (!isoString) return 'N/A';
    try {
        const date = new new Date(isoString);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' }) + ' - ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
        return 'Data inválida';
    }
};


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
    const [erro, setErro] = useState(null);
    const [reservas, setReservas] = useState([]); // Inicializado como array vazio para evitar .length em null
    const [contadores, setContadores] = useState({
        total: 0,
        pendentes: 0,
        confirmadas: 0,
        canceladas: 0
    });

    // Estados dos formulários
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const navigate = useNavigate(); 
    
    // Efeito para carregar o token na montagem
    useEffect(() => {
        const data = getDecodedToken(); 
        if (data) {
            setUserData(data);
            setNome(data.nome || "");
            setEmail(data.email || "");
            setTelefone(data.telefone || "");
        } else {
            // Opcional: Redirecionar para o login se o token for inválido/ausente
            // navigate('/login'); 
        }
    }, []);

    // Determina o tipo de usuário para exibição
    let TipoUsuario = "Carregando...";
    if(userData){
        if(userData.tipo === "c"){
            TipoUsuario = "Cliente";
        } else if(userData.tipo === "a"){
            TipoUsuario = "Administrador";
        }
    }

    // ---------------- FUNÇÕES ----------------

    function enviarAjudaWhatsApp() {
        const mensagem = "Olá, estou enfrentando um problema no sistema e preciso de suporte.";
        // Número de telefone deve ser no formato internacional (55 81 99999-9999)
        const url = `https://wa.me/5581999999999?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
    }

    function abrirModalDeletar(){
        setModalAberto("deletar");
    }

    function fecharModal(){
        setModalAberto(null);
    }

    async function confirmarDelete() {
        if (!userData || !userData.id) {
            alert("Erro: ID de usuário não encontrado.");
            return;
        }
        try {
            await deletarUsuario(userData.id);
            localStorage.removeItem(TOKEN_KEY_NAME);
            window.location.href = "/login"; // Redireciona de forma forçada para garantir a limpeza
        } catch (error) {
            alert("Erro ao excluir a conta.");
            console.error(error);
        }
    }

    // ----------- SUBMITS CORRIGIDOS ------------

    const handleSubmitDados = async (e) => {
        e.preventDefault();

        if (!userData || !userData.id) {
             alert("Erro: ID de usuário não encontrado.");
            return;
        }

        try {
            // A API espera um objeto com os campos a serem atualizados, não um objeto 'dados' aninhado.
            // Aqui, enviamos apenas os campos que podem ser atualizados.
            const dadosParaAtualizar = { 
                nome: nome, 
                telefone: telefone, 
                email: email
            };
            
            const response = await AtualizarUsuario(userData.id, dadosParaAtualizar);
            
            alert("Dados atualizados com sucesso! Você precisará logar novamente.");
            setModalDadosAberto(false);
            
            // Para garantir que o token seja atualizado com os novos dados:
            localStorage.removeItem(TOKEN_KEY_NAME);
            navigate('/login'); // Redireciona para forçar novo login com dados atualizados

        } catch (err) {
            // Em caso de erro de email já cadastrado, etc.
            alert(`Erro ao atualizar dados: ${err.message || "Tente novamente."}`);
        }
    };

    const handleSubmitSenha = async (e) => {
        e.preventDefault();

        if (novaSenha !== confirmarSenha) {
            return alert("As senhas não coincidem");
        }
        
        if (!userData || !userData.id) {
             return alert("Erro: ID de usuário não encontrado.");
        }

        try {
            // A API de atualização de senha provavelmente espera o campo 'senha'.
            const dadosParaAtualizar = { senha: novaSenha };
            
            await AtualizarUsuario(userData.id, dadosParaAtualizar);

            alert("Senha atualizada com sucesso! Você será desconectado para logar com a nova senha.");
            setModalSenhaAberto(false);
            setNovaSenha("");
            setConfirmarSenha("");

            // Após a troca de senha, o usuário deve ser forçado a logar novamente.
            localStorage.removeItem(TOKEN_KEY_NAME);
            navigate('/login');

        } catch (err) {
            alert(`Erro ao atualizar senha: ${err.message || "Tente novamente."}`);
        }
    };
    
    //-------------carregar reservas
    useEffect(() => {
    if (!userData || !userData.id) return;

    async function carregarReservas() {
        try {
        const data = await UsuarioReserva(userData.id);

        const reservasComDetalhes = await Promise.all(
            data.map(async (r) => {
            let nome_quadra = "Quadra Desconhecida";
            try {
                const quadra = await quadraConsultarID(r.quadra_id);
                nome_quadra = quadra.nome;
            } catch(e) {
                console.error("Erro ao buscar detalhes da quadra:", r.quadra_id, e);
            }

            return {
                ...r,
                nome_quadra: nome_quadra,
            };
            })
        );

        const total = reservasComDetalhes.length;
        const pendentes = reservasComDetalhes.filter(r => r.status === "PENDENTE").length;
        const confirmadas = reservasComDetalhes.filter(r => r.status === "CONFIRMADO").length;
        const canceladas = reservasComDetalhes.filter(r => r.status === "CANCELADO").length;

        setContadores({
            total,
            pendentes,
            confirmadas,
            canceladas
        });

        setReservas(reservasComDetalhes);
        } catch (err) {
        console.error("Erro ao carregar reservas:", err);
        setErro("Erro ao consultar reservas");
        }
    } 

    carregarReservas();
    // Dependência de userData.id garante que carrega apenas após o token ser decodificado
    }, [userData]); 
    
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
                        style={{ backgroundColor: "transparent", border: "none", cursor: "pointer",  verticalAlign: "middle"}}
                        onClick={abrirModalDeletar}
                    >
                        <strong className={styles.opcoesp}>Excluir Conta</strong>
                    </button>
                </p>
            </div>

            <div className={styles.estatisticas}>
                <h2><BsReception4 size={35} style={{marginRight: "15px", color:" #898989",  verticalAlign: "middle" }} />
                Suas estatísticas</h2>
                <div className={styles.topicos}>

                    <div className={styles.totalReservas}>
                    <p className={styles.numeros}><strong>{contadores.total}</strong></p>
                    <h3>Total de Reservas</h3>
                    </div>

                    <div className={styles.ReservasCanceladas}>
                    <p className={styles.numeros}><strong>{contadores.canceladas}</strong></p>
                    <h3>Reservas Canceladas</h3>
                    </div>

                    <div className={styles.ReservasConfirmadas}>
                    <p className={styles.numeros}><strong>{contadores.confirmadas}</strong></p>
                    <h3>Reservas Confirmadas</h3>
                    </div>

                    <div className={styles.ReservasPendentes}>
                    <p className={styles.numeros}><strong>{contadores.pendentes}</strong></p>
                    <h3>Reservas Pendentes</h3>
                    </div>
                </div>
            </div>

            <div className={styles.HistoricoReserva}>

                <h2>
                    <BsFillCalendarWeekFill 
                        size={30} 
                        style={{ marginRight: "15px", color: "#898989", verticalAlign: "middle" }} 
                    />
                    Ultima Reserva
                </h2>

                <p className={styles.ProximaReservas}>
                    <button onClick={() => navigate('/reserva')} className={styles.botaoReserva}>
                        <BsFillCartPlusFill size={25} style={{ marginRight: "10px",verticalAlign: "middle"   }} />
                        <strong>Nova Reserva</strong> 
                    </button>

                    <button onClick={() => navigate('/conta/historico')} className={styles.botaoHistorico}>
                        <BsList size={25} style={{ marginRight: "10px",verticalAlign: "middle"   }} />
                        <strong>Ver Histórico</strong> 
                    </button>
                </p>

                <div className={styles.ListReserva}>
                    {reservas.length === 0 ? (
                            <p className={styles.erro}>Nenhuma reserva encontrada</p>
                        ) : (
                            reservas
                            .slice(-1)
                            .reverse()
                            .map((r) => (
                                <div key={r.id} className={styles.card}>
                                <h3 className={styles.cardH3}>Reserva da: {r.nome_quadra}</h3>

                                <p className={styles.data}>RESERVA CRIADA EM: {HoraCorreta(r.criado_em)}</p>
                                <p className={styles.data}>DATA E HORA DA RESERVA: {formatarData(r.data_hora)}</p>

                                <p className={styles.data}>
                                    STATUS DA RESERVA:  < StatusLabel status= {r.status}/>
                                </p>
                                </div>
                            ))
                        )}
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
                            <button onClick={confirmarDelete} type="button">
                                Confirmar
                            </button>

                            <button onClick={fecharModal}  type="button">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL EDITAR DADOS */}
            {modalDadosAberto && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
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
                    <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
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