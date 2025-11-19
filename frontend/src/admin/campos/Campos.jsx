import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Campos.module.css';
import Headeradm from '../../components/header-adm/headeradm';
import { CadastroQuadra, quadraConsultar} from '../../services/QuadraService';
import { CriarDisponibilidade } from '../../services/Disponibilidade';

function Campo() {
  const [modalAberto, setModalAberto] = useState(null);

  // CAMPOS PARA CADASTRO DE QUADRA
  const [nome, setNome] = useState("");
  const [valor_hora, setValor_hora] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  // CAMPOS PARA CADASTRO DE HORÁRIO
  const [quadraId, setQuadraId] = useState("");
  const [diaSemana, setDiaSemana] = useState("1");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [duracao, setDuracao] = useState(60);

  // ALERTAS
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  const navigate = useNavigate();

  // TIMER PARA SUMIR ALERTA
  useEffect(() => {
    if (mensagem) {
      const timer = setTimeout(() => {
        setMensagem("");
        setTipoMensagem("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mensagem]);

  // ===========================
  // CADASTRAR QUADRA
  // ===========================
  const handleSubmitQuadra = async (e) => {
    e.preventDefault();

    try {
      await CadastroQuadra({ nome, valor_hora, localizacao });

      setMensagem("✅ Quadra cadastrada com sucesso!");
      setTipoMensagem("sucesso");

      setNome("");
      setValor_hora("");
      setLocalizacao("");

    } catch (err) {
      console.log(err);
      setMensagem("❌ Erro ao cadastrar quadra");
      setTipoMensagem("erro");
    }
  };

  // ===========================
  // CADASTRAR HORÁRIO
  // ===========================
  const handleSubmitHorario = async (e) => {
    e.preventDefault();

    try {
      await CriarDisponibilidade({
        quadra_id: quadraId,
        dia_semana: diaSemana,
        hora_inicio: horaInicio,
        hora_fim: horaFim,
        duracao_min: duracao
      });

      setMensagem("✅ Horário cadastrado com sucesso!");
      setTipoMensagem("sucesso");

      // limpa campos
      setQuadraId("");
      setHoraInicio("");
      setHoraFim("");
      setDuracao(60);

    } catch (err) {
      console.log(err);
      setMensagem("❌ Erro ao cadastrar horário");
      setTipoMensagem("erro");
    }
  };

  // ===========================
  // CONTROLE DOS MODAIS
  // ===========================
  function ModalAbertoCadastro() {
    setModalAberto("cadastro");
  }

  function ModalFechadoCadastro() {
    setModalAberto(null);
  }

  function ModalAbertoData() {
    setModalAberto("horario");
  }

  function ModalFechadoData() {
    setModalAberto(null);
  }

  return (
    <>
      <Headeradm />

      {/* MENU FLUTUANTE */}
      <div className={styles.menuFlutuanteNovo}>
        <button className={styles.botaoMenu} onClick={ModalAbertoCadastro}>
          <span>⚡</span> Cadastrar Quadra
        </button>

        <button className={styles.botaoMenu} onClick={ModalAbertoData}>
          <span>📅</span> Gerenciar Datas
        </button>

        <button className={styles.botaoMenu}>
          <span>🛠</span> Atualizar Quadra
        </button>

        <button className={styles.botaoMenu}>
          <span>🏟</span> Ver Quadras
        </button>
      </div>

      {/* ============================================
          MODAL DE CADASTRO DE QUADRA
      ============================================ */}
      {modalAberto === "cadastro" && (
        <div className={styles.containercampo}>
          <div className={styles.cadastrocampo}>
            <h2 className={styles.h2campo}>Cadastrar nova quadra</h2>

            <form onSubmit={handleSubmitQuadra} className={styles.campoform}>
              <label>Nome da Quadra:</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />

              <label>Localização:</label>
              <input
                type="text"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
                required
              />

              <label>Preço por Hora (R$):</label>
              <input
                type="number"
                step="0.01"
                value={valor_hora}
                onChange={(e) => setValor_hora(e.target.value)}
                required
              />

              <button type="submit" className={styles.submitbtn}>
                Cadastrar Quadra
              </button>

              {mensagem && (
                <div
                  className={`${styles.alerta} ${
                    tipoMensagem === "sucesso"
                      ? styles.sucesso
                      : styles.erro
                  }`}
                >
                  {mensagem}
                </div>
              )}
            </form>

            <button className={styles.buttonFechar} onClick={ModalFechadoCadastro}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* ============================================
          MODAL DE CADASTRO DE HORÁRIOS
      ============================================ */}
      {modalAberto === "horario" && (
        <div className={styles.containercampo}>
          <div className={styles.cadastrocampo}>
            <h2 className={styles.h2campo}>Cadastrar Horário</h2>

            <form onSubmit={handleSubmitHorario} className={styles.campoform}>

              <label>ID da Quadra:</label>
              <input
                type="number"
                value={quadraId}
                onChange={(e) => setQuadraId(e.target.value)}
                required
              />

              <label>Dia da Semana:</label>
              <select
                value={diaSemana}
                onChange={(e) => setDiaSemana(e.target.value)}
                required
              >
                <option value="1">Domingo</option>
                <option value="2">Segunda</option>
                <option value="3">Terça</option>
                <option value="4">Quarta</option>
                <option value="5">Quinta</option>
                <option value="6">Sexta</option>
                <option value="7">Sábado</option>
              </select>

              <label>Hora Início:</label>
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                required
              />

              <label>Hora Fim:</label>
              <input
                type="time"
                value={horaFim}
                onChange={(e) => setHoraFim(e.target.value)}
                required
              />

              <label>Duração (min):</label>
              <input
                type="number"
                value={duracao}
                onChange={(e) => setDuracao(e.target.value)}
                required
              />

              <button type="submit" className={styles.submitbtn}>
                Salvar Horário
              </button>

              {mensagem && (
                <div
                  className={`${styles.alerta} ${
                    tipoMensagem === "sucesso"
                      ? styles.sucesso
                      : styles.erro
                  }`}
                >
                  {mensagem}
                </div>
              )}
            </form>

            <button className={styles.buttonFechar} onClick={ModalFechadoData}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Campo;

