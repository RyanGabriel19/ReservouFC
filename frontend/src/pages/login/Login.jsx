import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";
import { LoginUsuario } from "../../services/UsuarioService";
import { getDecodedToken } from "../conta/perfil/perfil";

function Login() {
 

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
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
    const dados = { email, senha };

    try {
      const resultado = await LoginUsuario({email, senha});
      
      
      
 
      const TOKEN_KEY_NAME = import.meta.env.VITE_TOKEN_KEY_NAME;
      localStorage.setItem(TOKEN_KEY_NAME, resultado.token);

      setMensagem("✅ Login realizado com sucesso!");
      setTipoMensagem("sucesso");


      const user = getDecodedToken();

      if(user.tipo === "c"){
        setTimeout(() => navigate("/home"), 1000);
      }if(user.tipo === "a"){
      setTimeout(() => navigate("/admin/agendamento"), 1000);
      }

    } catch (err) {
      setMensagem("❌ erro ao fazer login" );
      setTipoMensagem("erro");
    }
  };

  return (
    <div className={styles['loginContainer']}>
      <div className={styles['loginBox']}>
        <h1 className={styles['titlelogin']}>Login</h1>
        <form className={styles['formlogin']} onSubmit={handleSubmit}>
          <div className={styles['inputGrouplogin']}>
            <label htmlFor="user">E-mail</label>
            <input
              type="email"
              id="user"
              name="user"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles['inputGrouplogin']}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button className={styles['btnLogin']}>Entrar</button>
        </form>

        {mensagem && (
          <div
            className={`${styles['alerta']} ${
              tipoMensagem === "sucesso" ? styles.sucesso : styles.erro
            }`}
          >
            {mensagem}
          </div>
        )}

        <Link to="/cadastro" className={styles['linklogin']}>
          <i>Não tem conta? Cadastre-se</i>
        </Link>
      </div>
    </div>
  );
}

export default Login;
