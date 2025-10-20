import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Cadastro.module.css";
import { cadastroUsuario } from "../../services/UsuarioService";

function Cadastro() {
 
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();
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
  // Função que lida com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = { nome, telefone, email, senha };

    try {
      await cadastroUsuario(dados); 
      setMensagem("✅ Usuário cadastrado com sucesso!");
      setTipoMensagem("sucesso")
      setNome("");
      setTelefone("");
      setEmail("");
      setSenha("");

      setTimeout(()=>{
      navigate("/login");
    }, 1000);

    } catch (err) {
      setMensagem("❌ Erro: " + err.message);
      setTipoMensagem("error") 
    }
  };

  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.cadastroBox}>
        <h1 className={styles.titlecadastro}>Cadastro do usuário</h1>

      
        <form className={styles.formcadastro} onSubmit={handleSubmit}>
          <div className={styles.inputGroupcadastro}>
            <label htmlFor="name">Nome completo</label>
            <input
              type="text"
              id="name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroupcadastro}>
            <label htmlFor="telefone">Telefone</label>
            <input
              type="number"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroupcadastro}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroupcadastro}>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.btnSubmitcadastro}>
            Enviar
          </button>
        </form>

        
         {mensagem && (
          <div className={`${styles.alerta}
           ${tipoMensagem === "sucesso" ? styles.sucesso : styles.erro}`}>
            {mensagem}
            </div> 
            )}

        <Link to="/login" className={styles.linkcadastro}>
          <i>Faça seu login</i>
        </Link>
      </div>
    </div>
  );
}

export default Cadastro;