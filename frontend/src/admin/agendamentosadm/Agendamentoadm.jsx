import { useState, useEffect } from 'react';
import styles from './Agendamentoadm.module.css';
import Headeradm from '../../components/header-adm/headeradm';
import { ConsultarReservas, ConfirmarReserva } from '../../services/ReservaService';
import { ConsultarUsuario } from '../../services/UsuarioService';
import { quadraConsultarID } from '../../services/QuadraService';

function Agendamentoadm() {
  const [reservas, setReservas] = useState([]);

  async function handleConfirmarReserva(id) {
    try {
      await ConfirmarReserva(id);
      

      // 🔄 Atualiza a lista após confirmar
      setReservas((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: "Confirmada" } : r
        )
      );
    } catch (error) {
      console.error("Erro ao confirmar reserva:", error);
      alert("Erro ao confirmar reserva");
    }
  }

  useEffect(() => {
    async function carregarReservas() {
      try {
        const data = await ConsultarReservas();
        const reservasComDetalhes = await Promise.all(
          data.map(async (r) => {
            const usuario = await ConsultarUsuario(r.usuario_id);
            const quadra = await quadraConsultarID(r.quadra_id);
            return {
              ...r,
              nome_usuario: usuario.nome,
              nome_quadra: quadra.nome,
            };
          })
        );
        setReservas(reservasComDetalhes);
      } catch (err) {
        console.error("Erro ao consultar reservas:", err);
      }
    }

    carregarReservas();
  }, []);

  return (
    <>
      <Headeradm />
      <div className={styles["containe-agend-adm"]}>
        <h1 className={styles['h1agendamentoadm']}>Agendamentos - Society</h1>

        <div className={styles["tabela-agend-adm"]}>
          <table>
            <thead>
              <tr>
                <th>ID DA QUADRA</th>
                <th>NOME DO USUÁRIO</th>
                <th>NOME DO CAMPO</th>
                <th>Data e hora</th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((r) => (
                <tr key={r.id}>
                  <td>{r.quadra_id}</td>
                  <td>{r.nome_usuario}</td>
                  <td>{r.nome_quadra}</td>
                  <td>{r.criado_em}</td>
                  <td
                    className={
                      r.status === "CONFIRMADO"
                        ? styles.statusVerde
                        : styles.statusLimao
                    }
                  >
                    {r.status}
                  </td>
                    <td>
                     {r.status !== "CONFIRMADO" &&(
                    <button type="button" className={styles.button} onClick={() =>{ console.log("ID da reserva:", r.id); handleConfirmarReserva(r.id)}}>
                      CONFIRMAR
                    </button>
                     )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Agendamentoadm;
