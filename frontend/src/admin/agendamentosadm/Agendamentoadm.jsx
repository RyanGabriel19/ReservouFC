import { useState, useEffect } from 'react';
import styles from './Agendamentoadm.module.css';
import Headeradm from '../../components/header-adm/headeradm';
import { ConsultarReservas, ConfirmarReserva, formatarData, CancelarReserva } from '../../services/ReservaService';
import { ConsultarUsuario } from '../../services/UsuarioService';
import { quadraConsultarID } from '../../services/QuadraService';
import { getDecodedToken } from '../../pages/conta/perfil/perfil';


function Agendamentoadm() {
  const [reservas, setReservas] = useState([]);

  const user = getDecodedToken();
  const idAdminLogado = user ? user.id : null;
  
  async function handleConfirmarReserva(id) {
    try {
      await ConfirmarReserva(id, idAdminLogado);

      setReservas((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: "CONFIRMADO" } : r
        )
      );
    } catch (error) {
      console.error("Erro ao confirmar reserva:", error);
      alert("Erro ao confirmar reserva");
    }
  }

  
  async function handleCancelarReserva(id) {
  try {
    await CancelarReserva(id, idAdminLogado);

    setReservas((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "CANCELADO" } : r
      )
    );
  } catch (error) {
    console.error("Erro ao cancelar reserva:", error);
    alert("Erro ao cancelar reserva");
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
              telefone_usuario: usuario.telefone,
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

  // 🔹 Função que gera o botão e envia mensagem
  function ButaoPagamento({ dados }) {
    const dataFormatada = formatarData(dados.data_hora);

    const mensagem = `Olá ${dados.nome_usuario}, tudo bem? 
    Estamos entrando em contato sobre o pagamento da sua reserva da quadra ${dados.nome_quadra}, 
    agendada para o dia ${dataFormatada}.  
    O valor é de R$${dados.valor}.`;

    const url = `https://wa.me/55${dados.telefone_usuario}?text=${encodeURIComponent(mensagem)}`;

    const enviarWhatsApp = () => {
      window.open(url, "_blank");
    };

    return (
      <button className={styles.buttonPaymente} onClick={enviarWhatsApp}>
        Falar com o cliente 
      </button>
    );
  }

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
                <th>TELEFONE</th>
                <th>NOME DO CAMPO</th>
                <th>Data e hora</th>
                <th>Status</th>
                
              </tr>
            </thead>
            <tbody>
              {reservas.map((r) => (
                <tr key={r.id}>
                  <td>{r.quadra_id}</td>
                  <td>{r.nome_usuario}</td>
                  <td>{r.telefone_usuario}</td>
                  <td>{r.nome_quadra}</td>
                  <td>{formatarData(r.data_hora)}</td>
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
                      {r.status !== "CONFIRMADO" && r.status !== "CANCELADO" && (
                        <button
                          type="button"
                          className={styles.buttonConfirm}
                          onClick={() => handleConfirmarReserva(r.id)}
                        >
                          CONFIRMAR
                        </button>
                      )}

                      <ButaoPagamento dados={r} />

                      {r.status !== "CANCELADO" && (
                        <button
                          className={styles.ButtonCancelar}
                          onClick={() => handleCancelarReserva(r.id)}
                        >
                          Cancelar
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
