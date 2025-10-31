import { useState } from 'react';
import styles from './Campos.module.css';
import Headeradm from '../../components/header-adm/headeradm';

function Campo() {
  const [quadras, setQuadras] = useState([]);
  const [novaQuadra, setNovaQuadra] = useState({
    nome: '',
    localizacao: '',
    tipo: '',
    preco: '',
    ativa: true,
    imagem: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuadras([...quadras, novaQuadra]);
    setNovaQuadra({
      nome: '',
      localizacao: '',
      tipo: '',
      preco: '',
      ativa: true,
      imagem: null,
    });
  };

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
            value={novaQuadra.nome}
            onChange={(e) => setNovaQuadra({ ...novaQuadra, nome: e.target.value })}
            required
          />

          <label htmlFor="localizacao">Localização:</label>
          <input
            type="text"
            id="localizacao"
            name="localizacao"
            value={novaQuadra.localizacao}
            onChange={(e) => setNovaQuadra({ ...novaQuadra, localizacao: e.target.value })}
            required
          />

          <label htmlFor="tipo">Tipo de Quadra:</label>
          <select
            id="tipo"
            name="tipo"
            value={novaQuadra.tipo}
            onChange={(e) => setNovaQuadra({ ...novaQuadra, tipo: e.target.value })}
            required
          >
            <option value="">Selecione</option>
            <option value="society">Society</option>
            <option value="futsal">Futsal</option>
          </select>

          <label htmlFor="preco">Preço por Hora (R$):</label>
          <input
            type="number"
            id="preco"
            name="preco"
            step="0.01"
            value={novaQuadra.preco}
            onChange={(e) => setNovaQuadra({ ...novaQuadra, preco: e.target.value })}
            required
          />

          <button type="submit" className={styles.submitbtn}>Cadastrar Quadra</button>
        </form>
      </div>

      {/* 🏟️ Lista de quadras cadastradas */}
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
      </div>
    </div>
    </>
  );
}

export default Campo;



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
