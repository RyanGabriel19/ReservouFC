import Header from "../../../components/header/Header";
import Funcionalidade from "../opcoes_nav/Funcionalidade";
import styles from "./Historico.module.css"
import { getDecodedToken } from "../perfil/perfil";
import { useEffect, useState } from "react";
import { formatarData, UsuarioReserva } from "../../../services/ReservaService";
import { quadraConsultarID } from "../../../services/QuadraService";


function HistoricoReservas(){

const user = getDecodedToken();
const [reservas, setReservas] = useState([]);
const [erro, setErro] = useState("");

useEffect(() => {
  async function carregarReservas() {
    try {
      const data = await UsuarioReserva(user.id);

      const reservasComDetalhes = await Promise.all(
        data.map(async (r) => {
          const quadra = await quadraConsultarID(r.quadra_id);

          return {
            ...r,
            nome_quadra: quadra.nome,
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
        return(
        <>
      <Header />
      <Funcionalidade />
      <div className={styles.container}>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        {reservas.length === 0 ? (
          <p>Nenhuma reserva encontrada</p>
        ) : (
          reservas.map((r) => (
            <div key={r.id} className={styles.card}>
              <h3>Reserva da: {r.nome_quadra}</h3>
              <p className={styles.data}>ID DA RESERVA: {r.id}</p>
              <p className={styles.data}>DATA E HORA DA RESERVA: {formatarData(r.criado_em)}</p>
              <p className={styles.status}>STATUS DA RESERVA: {r.status}</p>
            </div>
          ))
        )}
      </div>
    </>
    )
}

export default HistoricoReservas;