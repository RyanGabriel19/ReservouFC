import Header from "../../../components/header/Header";
import Funcionalidade from "../opcoes_nav/Funcionalidade";
import styles from "./config.module.css";
import { AtualizarUsuario } from "../../../services/UsuarioService";
import { getDecodedToken } from "../perfil/perfil";
import { useState } from "react";

function Configuracoes() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");  
  const user = getDecodedToken();

  async function handleAtualizarNome(e) {
    e.preventDefault(); // impede o recarregamento da página

    try {
    console.log(nome)
     const dados = {nome, telefone, email, senha}
      const resultado = await AtualizarUsuario(user.id, dados);

      alert("Dados atualizados com sucesso!");
      console.log("Usuário atualizado:", resultado);
      console.log(user)
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      alert("Erro ao atualizar usuário.");
    }
  }

  return (
    <>
      <Header />
      <Funcionalidade />
            {/* <div>
        <form onSubmit={handleAtualizarNome} className={styles.form}>
            <label>Digite seu novo nome</label>
            <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Novo nome"
            />

            

            <button type="submit" className={styles.btnSalvar}>
            Atualizar dados
            </button>
        </form>
        </div> */}
    </>
  );
}

export default Configuracoes;
