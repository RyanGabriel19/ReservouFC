import { Link } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.titlelogin}>Login</h1>
        <form className={styles.formlogin}>
          <div className={styles.inputGrouplogin}>
            <label htmlFor="user">E-mail</label>
            <input type="email" id="user" name="user" />
          </div>
          <div className={styles.inputGrouplogin}>
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" name="password" />
          </div>
          <button className={styles.btnLogin}>Entrar</button>
        </form>
        <Link to="/cadastro" className={styles.linklogin}><i>Faça seu cadastro</i></Link>
      </div>
    </div>
  );
}

export default Login;
