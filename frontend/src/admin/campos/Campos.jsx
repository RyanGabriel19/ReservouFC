  import { useState, useEffect } from 'react';
  import styles from './Campos.module.css';
  import Headeradm from '../../components/header-adm/headeradm';
  import { quadraConsultar,CadastroQuadra, QuadraAtualizar} from '../../services/QuadraService';
  import { CriarDisponibilidade } from '../../services/Disponibilidade';
  import { getDecodedToken } from '../../pages/conta/perfil/perfil';

  function Campo() {
    const [modalAberto, setModalAberto] = useState(null);

    // CAMPOS PARA CADASTRO DE QUADRA E ATUALIZACAO DE QUADRA
    const [id, setId] = useState(""); 
    const [nome, setNome] = useState("");
    const [valor_hora, setValor_hora] = useState("");
    const [localizacao, setLocalizacao] = useState("");

    // CAMPOS PARA CADASTRO DE HORÁRIO
    const [quadraId, setQuadraId] = useState("");
    const [diaSemana, setDiaSemana] = useState("1");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFim, setHoraFim] = useState("");
    const [duracao, setDuracao] = useState(60);

    //listar quadras

    const [quadras, setQuadras] = useState([]);
    const [erro, setErro] = useState("");
    // ALERTAS
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");

    const user = getDecodedToken();
    const idUsuarioLogado = user ? user.id : null;

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
        await CadastroQuadra({ nome, valor_hora, localizacao, idUsuarioLogado });

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
          duracao_min: duracao,
          idUsuarioLogado
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
    //=============================
    // ATUALIZAR QUADRA
    //=========================
    const handleSubmitQuadraAtualizar = async (e) => {
      e.preventDefault();
      try{
        await QuadraAtualizar (id, {
        nome: nome || undefined,
        localizacao: localizacao || undefined,
        valor_hora: valor_hora === "" ? undefined : valor_hora,
        idUsuarioLogado
        });

        setMensagem("✅ Quadra atualizada com sucesso!");
        setTipoMensagem("sucesso");

        setNome("");
        setValor_hora("");
        setLocalizacao('');

      } catch (err) {
        console.log(err);
        setMensagem("❌ Erro ao atualizar quadra");
        setTipoMensagem("erro");
      }
    }

    //======================
    // LISTAR QUADRA
    //=======================
async function carregarQuadras() {
  try {
    const data = await quadraConsultar();
    setQuadras(data);
    setErro("");
  } catch (err) {
    setErro("Erro ao carregar quadras.");
    console.error(err);
  }
}

    // ===========================
    // CONTROLE DOS MODAIS
    // ===========================
    function ModalAbertoCadastro() {
      setModalAberto("cadastro");
    }

    function ModalFechado() {
      setModalAberto(null);
    }

    function ModalAbertoListarQuadra() {
      setModalAberto("ListarQuadra");
       carregarQuadras()
    };

    function ModalAbertoAtualizar(){
      setModalAberto("atualizar");
    }

    return (
      <>
        <Headeradm />

        {/* MENU FLUTUANTE */}
        <div className={styles.menuFlutuanteNovo}>
          <button className={styles.botaoMenu} onClick={ModalAbertoCadastro}>
            <span>⚡</span> Cadastrar Quadra
          </button>

          <button className={styles.botaoMenu} onClick={ModalAbertoAtualizar}>
            <span>🛠</span> Atualizar Quadra
          </button>

          <button className={styles.botaoMenu}  onClick={ModalAbertoListarQuadra}>
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

              <button className={styles.buttonFechar} onClick={ModalFechado}>
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* ============================================
            MODAL DE CADASTRO DE HORÁRIOS
        ============================================ */}
        


        {/* ========================
        MODAL ATUALIZAR
        =========================== */}
        {modalAberto === "atualizar" && (
          <div className={styles.containercampo}>
            <div className={styles.cadastrocampo}>
              <h2 className={styles.h2campo}>Atualizar Quadra </h2>
              
              <form onSubmit={handleSubmitQuadraAtualizar } className={styles.campoform}>
                <label>Id quadra:</label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                />

            
                <label>Nome da Quadra:</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  
                />

                <label>Localização:</label>
                <input
                  type="text"
                  value={localizacao}
                  onChange={(e) => setLocalizacao(e.target.value)}
                  
                />

                <label>Preço por Hora (R$):</label>
                <input
                  type="number"
                  step="0.01"
                  value={valor_hora}
                  onChange={(e) => setValor_hora(e.target.value)}
                  
                />

                <button type="submit" className={styles.submitbtn}>
                  Atualizar Quadra
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
                <h1 className={styles.info}>*ADICIONE APENAS OS CAMPOS QUE DESEJA ATUALIZAR.</h1>
              <button className={styles.buttonFechar} onClick={ModalFechado}>
                Cancelar
              </button>
            </div>
          </div>
        )}

      {/* ========================
            MODAL LISTAR
        ======================== */}
        {modalAberto === "ListarQuadra" && (
      
            <div className={styles.containercampo}>
              <div className={styles.cadastrocampo}>
              <h2 className={styles.h2campo}>Lista de Quadras</h2>

              {erro && <p className={styles.erro}>{erro}</p>}

              {quadras.length === 0 ? (
                <p>Nenhuma quadra encontrada.</p>
              ) : (
                <ul>
                  {quadras.map((quadra) => (
                   <li key={quadra.id} className={styles.itemQuadra}>
                    <div className={styles.linha}>
                      <strong>ID:</strong> {quadra.id}
                    </div>

                    <div className={styles.linha}>
                      <strong>Nome:</strong> {quadra.nome}
                    </div>

                    <div className={styles.linha}>
                      <strong>Localização:</strong> {quadra.localizacao}
                    </div>

                    <div className={styles.linha}>
                      <strong>Valor por hora:</strong> R$ {quadra.valor_hora}
                    </div>
                  </li>
                  ))}
                </ul>
              )}

              <button className={styles.buttonFechar} onClick={ModalFechado}>
                Fechar
              </button>
            </div>
            </div>
        )}
      </>
    );
  }

  export default Campo;

