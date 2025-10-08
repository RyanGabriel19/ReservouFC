import { Link } from "react-router-dom";
import styles from "./Cadastro.module.css";

function Cadastro() {
  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.cadastroBox}>
        <h1 className={styles.titlecadastro}>Cadastro do usuário</h1>
        <form className={styles.formcadastro}>
          <div className={styles.inputGroupcadastro}>
            <label htmlFor="name">Nome completo</label>
            <input type="text" id="name" name="name" />
          </div>

          <div className={styles.inputGroupcadastro}>
            <label htmlFor="telefone">Telefone</label>
            <input type="number" id="telefone" name="telefone" />
          </div>

          <div className={styles.inputGroupcadastro}>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" name="email" />
          </div>

          <div className={styles.inputGroupcadastro}>
            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" name="senha" />
          </div>

          <button className={styles.btnSubmitcadastro}>Enviar</button>
        </form>
        <Link to="/login" className={styles.linkcadastro}><i>Faça seu login</i></Link>
      </div>
    </div>
  );
}

export default Cadastro;
