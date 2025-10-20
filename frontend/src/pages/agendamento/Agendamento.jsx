import React, { useState } from 'react';
import styles from './Agendamento.module.css';

const quadrasDisponiveis = ['Quadra 1', 'Quadra 2', 'Quadra Coberta'];
const horariosDisponiveis = [
  '08:00', '09:00', '10:00', '11:00',
  '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00'
];

export default function Agendamento() {
  const [etapa, setEtapa] = useState(1);
  const [quadra, setQuadra] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [confirmado, setConfirmado] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirmar = async () => {
    setLoading(true);

    const reserva = {
      quadra,
      data,
      horario
    };

    try {
      const response = await fetch('http://localhost:3000/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reserva)
      });

      if (response.ok) {
        setConfirmado(true);
      } else {
        alert('Erro ao confirmar reserva');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Reservar Quadra</h2>

      {etapa === 1 && (
        <div className={styles.etapa}>
          <h3>1️⃣ Escolha a quadra</h3>
          {quadrasDisponiveis.map((q) => (
            <button key={q} onClick={() => { setQuadra(q); setEtapa(2); }}>
              {q}
            </button>
          ))}
        </div>
      )}

      {etapa === 2 && (
        <div className={styles.etapa}>
          <h3>📅 Escolha a data</h3>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <button disabled={!data} onClick={() => setEtapa(3)}>Avançar</button>
        </div>
      )}

      {etapa === 3 && (
        <div className={styles.etapa}>
          <h3>⏰ Escolha o horário</h3>
          {horariosDisponiveis.map((h) => (
            <button key={h} onClick={() => { setHorario(h); setEtapa(4); }}>
              {h}
            </button>
          ))}
        </div>
      )}

      {etapa === 4 && (
        <div className={styles.etapa}>
          <h3>✅ Confirmar Reserva</h3>
          <p><strong>Quadra:</strong> {quadra}</p>
          <p><strong>Data:</strong> {data}</p>
          <p><strong>Horário:</strong> {horario}</p>
          <button onClick={handleConfirmar} disabled={loading}>
            {loading ? 'Confirmando...' : 'Confirmar'}
          </button>
        </div>
      )}

      {confirmado && (
        <div className={styles.confirmado}>
          <h3>🎉 Reserva Confirmada!</h3>
          <p>Nos vemos em campo, craque!</p>
        </div>
      )}
    </div>
  );
}

