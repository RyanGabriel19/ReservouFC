import Header from "../../../components/header/Header";
import Funcionalidade from "../opcoes_nav/Funcionalidade";
import styles from "./Historico.module.css"
import { getDecodedToken } from "../perfil/perfil";
import { useEffect, useState } from "react";
import { UsuarioReserva } from "../../../services/ReservaService";




function HistoricoReservas(){

const user = getDecodedToken();
const [reservas, setReservas] = useState([]);
const [erro, setErro] = useState("");

useEffect(()=>{
    
    async function carregarReservas(){
        try{
            const data = await UsuarioReserva(user.id);
            setReservas(data);
        }catch(err){
            setErro("erro ao consultar reservas")
        }
    }
    carregarReservas();
}, []);
        return(
        <>
      <Header />
      <Funcionalidade />
      <div className={styles.container}>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        {reservas.length === 0 ? (
          <p>Nenhuma reserva encontrada</p>
        ) : (
          reservas.map((r) => (
            <div key={r.id} className={styles.card}>
              <h3>ID DA RESERVA: {r.id}</h3>
              <p className={styles.data}>DATA E HORA DA RESERVA: {r.criado_em}</p>
              <p className={styles.status}>STATUS DA RESERVA: {r.status}</p>
            </div>
          ))
        )}
      </div>
    </>
    )
}

export default HistoricoReservas;