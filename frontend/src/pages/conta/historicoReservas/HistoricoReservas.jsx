import Header from "../../../components/header/Header";
import Funcionalidade from "../opcoes_nav/Funcionalidade";
import styles from "./Historico.module.css";
import { getDecodedToken } from "../perfil/perfil";
import { useEffect, useState } from "react";
import { formatarData, UsuarioReserva, HoraCorreta } from "../../../services/ReservaService"; 
import { quadraConsultarID } from "../../../services/QuadraService";

function HistoricoReservas() {
  const user = getDecodedToken();
  const [reservas, setReservas] = useState([]);
  const [erro, setErro] = useState("");
  const [mostrarTodas, setMostrarTodas] = useState(false);

  useEffect(() => {
    async function carregarReservas() {
      try {
        // 🔹 Carrega normalmente, sem ordenar
        const data = await UsuarioReserva(user.id);

        // 🔹 Busca os dados das quadras
        const reservasComDetalhes = await Promise.all(
          data.map(async (r) => {
            const quadra = await quadraConsultarID(r.quadra_id);
            return {
              ...r,
              nome_quadra: quadra ? quadra.nome : "Quadra Desconhecida",
            };
          })
        );

        setReservas(reservasComDetalhes);
      } catch (err) {
        console.error(err);
        setErro("Erro ao consultar reserva");
      }
    }

    carregarReservas();
  }, [user.id]);

  const StatusLabel = ({ status }) => {
    const classes = {
      CONFIRMADO: styles.confirmado,
      CANCELADO: styles.cancelado,
      PENDENTE: styles.pendente,
    };
    return <span className={classes[status] || styles.status}>{status}</span>;
  };

  const reservasExibidas = mostrarTodas ? reservas : reservas.slice(0, 5);
  const deveMostrarBotao = reservas.length > 5;

  return (
    <>
      <Header />
      <Funcionalidade />

      <div className={styles.container}>
        <h2 className={styles.titulo}>Seu Histórico de Reservas</h2>

        {erro && <p className={styles.erro}>{erro}</p>}

        {reservas.length === 0 ? (
          <p className={styles.aviso}>Nenhuma reserva encontrada. Faça a sua primeira!</p>
        ) : (
          <>
            {deveMostrarBotao && (
              <button
                className={styles.botaoMostrar}
                onClick={() => setMostrarTodas(!mostrarTodas)}
              >
                {mostrarTodas
                  ? "Mostrar menos"
                  : `Mostrar todas as ${reservas.length} reservas`}
              </button>
            )}

            {reservasExibidas.reverse().map((r) => (
              <div key={r.id} className={styles.card}>
                <h3>Reserva da: {r.nome_quadra}</h3>

                <p className={styles.info}>Data e Hora: {formatarData(r.data_hora)}</p>

                <p className={styles.info}>
                  Status: <StatusLabel status={r.status} />
                </p>

                <p className={styles.detalhe}>ID da Reserva: {r.id}</p>
                <p className={styles.detalhe}>Criada em: {HoraCorreta(r.criado_em)}</p>
              </div>
            ))}
          </>
        )}  
      </div>
    </>
  );
}

export default HistoricoReservas;
