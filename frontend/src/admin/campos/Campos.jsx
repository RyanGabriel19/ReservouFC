import { useState, useEffect } from 'react';
import styles from './Campos.module.css';
import Headeradm from '../../components/header-adm/headeradm';
import { CadastroQuadra } from '../../services/QuadraSerivce';

function Campo() {
  const [nome, setNome] = useState("");
  const [valor_hora, setValor_hora] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

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
    const dados = {nome, valor_hora, localizacao};
    try{
      const resultado = await CadastroQuadra({nome, valor_hora, localizacao});
      setMensagem("✅ Quadra cadastrada com sucesso" );
      setTipoMensagem("sucesso");
      Navigate("/admin")
      console.log("sucesso");
    }catch(err){
      setMensagem("❌ erro ao cadastrar quadra" );
      setTipoMensagem("erro");
    }
    }

  const handleToggle = (index) => {
    const atualizadas = [...quadras];
    atualizadas[index].ativa = !atualizadas[index].ativa;
    setQuadras(atualizadas);
  };

  const handleImageUpload = (e, index) => {
    const atualizadas = [...quadras];
    atualizadas[index].imagem = URL.createObjectURL(e.target.files[0]);
    setQuadras(atualizadas);
  };

  return (
    <>
    <Headeradm />
    <div className={styles.containercampo}>
      <div className={styles.cadastrocampo}>
        <h2 className={styles['h2campo']}>Cadastrar nova quadra</h2>
        <form onSubmit={handleSubmit} className={styles.campoform}>
          <label htmlFor="nome">Nome da Quadra:</label>
          <input
            type="text"
            id="nomecampo"
            name="nomecampo"
            value={nome}
            onChange={(e) => setNome( e.target.value )}
            required
          />

          <label htmlFor="localizacao">Localização:</label>
          <input
            type="text"
            id="localizacao"
            name="localizacao"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value )}
            required
          />

          
          

          <label htmlFor="preco">Preço por Hora (R$):</label>
          <input
            type="number"
            id="preco"
            name="preco"
            step="0.01"
            value={valor_hora}
            onChange={(e) => setValor_hora(e.target.value )}
            required
          />

          <button type="submit" className={styles.submitbtn}>Cadastrar Quadra</button>
           {mensagem && (
                    <div className={`${styles['alerta']}
                     ${tipoMensagem === "sucesso" ? styles.sucesso : styles.erro}`}>
                      {mensagem}
                      </div> 
                      )}
        </form>
      </div>
          </div>
    </>
  );
}

export default Campo;

      {/* 🏟️ Lista de quadras cadastradas
      <div className={styles.listaQuadras}>
        {quadras.map((quadra, index) => (
          <div key={index} className={styles.quadraCard}>
            <h3>{quadra.nome}</h3>
            <p><strong>Localização:</strong> {quadra.localizacao}</p>
            <p><strong>Tipo:</strong> {quadra.tipo}</p>
            <p><strong>Preço:</strong> R$ {quadra.preco}</p>
            <p><strong>Status:</strong> {quadra.ativa ? 'Disponível para usuários' : 'Indisponível / Ocupada'}</p>

            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, index)} />
            {quadra.imagem && <img src={quadra.imagem} alt="Foto da quadra" className={styles.imagemQuadra} />}

            <button onClick={() => handleToggle(index)} className={styles.togglebtn}>
              {quadra.ativa ? 'Desativar' : 'Ativar'}
            </button>
          </div>
        ))}
      </div> */}




/**
 * Componente CadastroQuadra
 * 
 * Este componente permite ao usuário cadastrar novas quadras esportivas e exibir uma lista das quadras cadastradas.
 * 
 * Funcionalidades:
 * 1. Formulário de cadastro:
 *    - Campos: nome, localização, tipo de quadra, preço por hora.
 *    - Ao enviar o formulário, os dados são adicionados à lista de quadras.
 * 
 * 2. Lista de quadras cadastradas:
 *    - Exibe os dados de cada quadra cadastrada.
 *    - Permite fazer upload de uma imagem para cada quadra.
 *    - Possui um botão de "Ativar/Desativar":
 *        - Quando ativado, a quadra é exibida como "Disponível para usuários".
 *        - Quando desativado, aparece como "Indisponível / Ocupada", simulando que não está visível no site.
 * 
 * Observações:
 * - As imagens são armazenadas localmente via URL temporária (não persistem após recarregar a página).
 * - O estado das quadras é mantido em memória usando useState.
 * - Ideal para protótipos ou para ser integrado com backend futuramente (ex: Firebase, Supabase).
 */
