import React, { useEffect, useState } from "react";
import styles from "./Reserva.module.css";
import Header from "../../components/header/Header";
import { quadraConsultar } from "../../services/QuadraService";
import { useNavigate } from "react-router-dom";
import { criarReserva } from "../../services/ReservaService";
import { getDecodedToken } from "../conta/perfil/perfil";

export default function Agendamento() {
  // Variáveis da quadra
  const [quadras, setQuadras] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const [quadraSelecionada, setQuadraSelecionada] = useState(null);

  const hora = ["19:00", "20:30", "22:00", "23:30"];
  // Modal
  const [modalAberto, setModalAberto] = useState(false);

  // Mensagem
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  // Usuário logado
  const user = getDecodedToken();

  // Variáveis da reserva
  const [quadra_id, setQuadra_id] = useState("");
  const [usuario_id, setUsuario_id] = useState(user.id);
  const [data_hora, setData_hora] = useState("");
  const [duracao_min, setDuracao_min] = useState(90);
  const [valor, setValor] = useState("");

  // Abrir modal
  function abrirModal(quadra) {
    setQuadraSelecionada(quadra);
    setModalAberto(true);
    setValor(quadra.valor_hora);
    setQuadra_id(quadra.id);
  }

  // Fechar modal
  function fecharModal() {
    setQuadraSelecionada(null);
    setModalAberto(false);
  }

  // Criar reserva
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = { quadra_id, usuario_id, data_hora, duracao_min, valor };

    try {
      const resultado = await criarReserva(dados);
      setMensagem("✅ Reservado com sucesso");
      setTipoMensagem("sucesso");
      console.log("Reserva criada:", resultado);
    } catch (err) {
      console.error(err);
      setMensagem("❌ Erro ao reservar quadra");
      setTipoMensagem("erro");
    }
  };

  // Apagar mensagem depois de 3 segundos
  useEffect(() => {
    if (mensagem) {
      const timer = setTimeout(() => {
        setMensagem("");
        setTipoMensagem("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mensagem]);

  // Carregar as quadras ao abrir a página
  useEffect(() => {
    async function carregarQuadras() {
      try {
        const data = await quadraConsultar();
        setQuadras(data);
      } catch (err) {
        setErro("Erro ao carregar quadras.");
        console.error(err);
      }
    }

    carregarQuadras();
  }, []); 

  
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.titulo}>Selecione a quadra!</h1>

        {erro && <p className={styles.erro}>{erro}</p>}

        <div className={styles.cardContainer}>
          {quadras.length === 0 ? (
            <p>Nenhuma quadra encontrada.</p>
          ) : (
            quadras.map((q) => (
              <div key={q.id} className={styles.card}>
                <img
                  src={q.imagem || "/campo3.jpg"}
                  alt={q.nome}
                  className={styles.imagem}
                />
                <h3 className={styles.nome}>{q.nome}</h3>
                <p className={styles.endereco}>{q.localizacao}</p>
                <p className={styles.endereco}>R$ {q.valor_hora}</p>
                <button
                  className={styles.botao}
                  onClick={() => abrirModal(q)}
                >
                  Agendar
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* === MODAL DE RESERVA === */}
      {modalAberto && quadraSelecionada && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Reserva da {quadraSelecionada.nome}</h2>
            <p>
              <strong>ID da quadra:</strong> {quadraSelecionada.id}
            </p>
            <p>
              <strong>Endereço:</strong> {quadraSelecionada.localizacao}
            </p>
            <p>
              <strong>Valor:</strong> R$ {quadraSelecionada.valor_hora}
            </p>
            <p>
              <strong>Valor:</strong> R$ {quadraSelecionada.duracao_min}
            </p>

            <form onSubmit={handleSubmit}>
              <label>Data e Hora:</label>
              <input
                type="datetime-local"
                className={styles.input}
                value={data_hora}
                onChange={(e) => setData_hora(e.target.value)}
              />

              <label>Duração (minutos):</label>
              <input
                type="number"
                className={styles.input}
                value={duracao_min}
                onChange={(e) => setDuracao_min(e.target.value)}
              />

              <div className={styles.modalButtons}>
                <button
                  type="button"
                  onClick={fecharModal}
                  className={styles.botaoFechar}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.botaoConfirmar}>
                  Confirmar
                </button>
              </div>
            </form>

            {mensagem && (
              <p
                className={
                  tipoMensagem === "sucesso"
                    ? styles.sucesso
                    : styles.erro
                }
              >
                {mensagem}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
