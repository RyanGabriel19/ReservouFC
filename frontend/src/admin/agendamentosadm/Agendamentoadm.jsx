import { useState, useEffect } from 'react';
import styles from './Agendamentoadm.module.css';
import Headeradm from '../../components/header-adm/headeradm';

function Agendamentoadm() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    async function fetchAgendamentos() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/agendamentos`);
        const data = await response.json();
        setAgendamentos(data);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    }

    fetchAgendamentos();
  }, []);

  return (
    <>
      <Headeradm />
      <div className={styles["containe-agend-adm"]}>
        <h1 className={styles['h1agendamentoadm']}>Agendamentos - Society</h1>

        <div className={styles["tabela-agend-adm"]}>
          <table>
            <thead>
              <tr>
                <th>Nome do Cliente</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Campo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map((agendamento, index) => (
                <tr key={index}>
                  <td>{agendamento.nome}</td>
                  <td>{agendamento.data}</td>
                  <td>{agendamento.hora}</td>
                  <td>{agendamento.campo}</td>
                  <td>{agendamento.status}</td>
                  <td>
                    <button className={styles["btn-aprovar"]}>Aprovar</button>
                    <button className={styles["btn-rejeitar"]}>Rejeitar</button>
                    <button className={styles["btn-pagamendo"]}>Pagamento</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Agendamentoadm;
