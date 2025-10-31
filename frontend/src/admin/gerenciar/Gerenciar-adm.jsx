import { useEffect, useState } from "react";
import styles from "./Gerenciar.module.css";
import Headeradm from "../../components/header-adm/headeradm";

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroTipo, setFiltroTipo] = useState("todos");

  useEffect(() => {
    async function carregarUsuarios() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios`);
      const data = await res.json();
      setUsuarios(data);
    }
    carregarUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter((u) => {
    const nomeOuEmail = u.nome.toLowerCase().includes(busca.toLowerCase()) || u.email.toLowerCase().includes(busca.toLowerCase());
    const statusOk = filtroStatus === "todos" || u.status === filtroStatus;
    const tipoOk = filtroTipo === "todos" || u.tipo === filtroTipo;
    return nomeOuEmail && statusOk && tipoOk;
  });

  return (
    <>
    <Headeradm/>
    <div className={styles.container}>
      <h1 className={styles["h1gerenciar"]}>Gerenciamento de Usuários</h1>

      {/* Dashboard resumido */}
      <div className={styles.dashboard}>
        <p>Total: {usuarios.length}</p>
        <p>Ativos: {usuarios.filter(u => u.status === "ativo").length}</p>
        <p>Inativos: {usuarios.filter(u => u.status === "inativo").length}</p>
        <p>Últimos: {usuarios.slice(-3).map(u => u.nome).join(", ")}</p>
      </div>

      {/* Filtros */}
      <div className={styles.filtros}>
        <input
          type="text"
          placeholder="Buscar por nome ou e-mail"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select onChange={(e) => setFiltroStatus(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
        <select onChange={(e) => setFiltroTipo(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="cliente">Cliente</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Tabela de usuários */}
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Cadastro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((u, index) => (
            <tr key={index}>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>{u.tipo}</td>
              <td>{u.status}</td>
              <td>{new Date(u.dataCadastro).toLocaleDateString()}</td>
              <td>
                <button>Editar</button>
                <button>{u.status === "ativo" ? "Inativar" : "Ativar"}</button>
                <button>Excluir</button>
                <button>Resetar Senha</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulário de novo usuário */}
      <form className={styles.formulario}>
        <h2>Criar Novo Usuário</h2>
        <input type="text" placeholder="Nome" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Senha" required />
        <select required>
          <option value="">Tipo de acesso</option>
          <option value="cliente">Cliente</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
    </>
  );
}
