import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Campos.module.css';
import Headeradm from '../../components/header-adm/headeradm';
import { CadastroQuadra } from '../../services/QuadraService';

function Campo() {
  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [valor_hora, setValor_hora] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (mensagem) {
      const timer = setTimeout(() => {
        setMensagem("");
        setTipoMensagem("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mensagem]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await CadastroQuadra({ nome, valor_hora, localizacao });
      setMensagem("✅ Quadra cadastrada com sucesso!");
      setTipoMensagem("sucesso");

      navigate("/admin");
    } catch (err) {
      console.log(err);
      setMensagem("❌ Erro ao cadastrar quadra");
      setTipoMensagem("erro");
    }
  };

  function ModalAbertoCadastro() {
    setModalAberto("cadastro");
    setNome("");
    setValor_hora("");
    setLocalizacao("");
  }

  function ModalFechadoCadastro() {
    setModalAberto(null);
  }
  
  function ModalAbertoData(){
     setModalAberto(true);
  }
  function ModalFechadoData(){
     setModalAberto(false);
  }

  return (
    <>
     <Headeradm />      {/* <Headeradm />
      {!modalAberto && (
        <button
          className={styles.buttoncadastro}
          onClick={ModalAbertoCadastro}
        >
          CADASTRAR NOVA QUADRA
        </button>
      )} */}
<div className={styles.menuFlutuanteNovo}>
  <button 
    className={styles.botaoMenu}
    onClick={ModalAbertoCadastro}
  >
    <span>⚡</span> Cadastrar Quadra
  </button>

  <button className={styles.botaoMenu}
  onClick={ModalAbertoData}
  >
    <span>📅</span> Gerenciar Datas
  </button>

  <button className={styles.botaoMenu}>
    <span>🛠</span> Atualizar Quadra
  </button>

  <button className={styles.botaoMenu}>
    <span>🏟</span> Ver Quadras
  </button>
</div>


      {/* === MODAL === */}
      {modalAberto === "cadastro" && (
        <div className={styles.containercampo}>
          <div className={styles.cadastrocampo}>
            <h2 className={styles.h2campo}>Cadastrar nova quadra</h2>

            <form onSubmit={handleSubmit} className={styles.campoform}>
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

            <button
              className={styles.buttonFechar}
              onClick={ModalFechadoCadastro}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Campo;
