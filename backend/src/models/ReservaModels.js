import { db } from '../config/db.js';

// Selecionar todas as reservas
export async function SelectReserva() {
    const [rows] = await db.query("SELECT * FROM RESERVA");
    return rows;
}


async function QuadraDisponivel(quadra_id, data_hora) {
    const [rows] = await db.query(
        "SELECT * FROM RESERVA WHERE QUADRA_ID = ? AND DATA_HORA = ? AND STATUS != 'CANCELADO'",
        [quadra_id, data_hora]
    );
    return rows.length === 0;
}


export async function criarReserva({ quadra_id, usuario_id, data_hora, duracao_min, valor }) {
    const disponivel = await QuadraDisponivel(quadra_id, data_hora);
    if (!disponivel) {
        throw new Error("Quadra já está reservada nesse horário");
    }

    const [result] = await db.execute(
        `INSERT INTO RESERVA (quadra_id, usuario_id, data_hora, duracao_min, valor)
         VALUES (?, ?, ?, ?, ?)`,
        [quadra_id, usuario_id, data_hora, duracao_min || 60, valor || 0.0]
    );

    return result.insertId;
}


export async function BuscarReservaPorId(id) {
    const [rows] = await db.query("SELECT * FROM RESERVA WHERE ID = ?", [id]);
    return rows[0] || null;
}

export async function BuscarReservaUsuario(usuario_id) {
    const [rows] = await db.query("SELECT * FROM RESERVA WHERE USUARIO_ID = ?", [usuario_id]);
    return rows;
}


export async function AtualizarReserva(id, { data_hora, duracao_min, status }) {
    if (data_hora) {
        const reserva = await BuscarReservaPorId(id);
        if (!reserva) throw new Error("Reserva não encontrada");

        if (reserva.data_hora !== data_hora) {
            const disponivel = await QuadraDisponivel(reserva.quadra_id, data_hora);
            if (!disponivel) throw new Error("Novo horário não disponível");
        }
    }

    await db.execute(
        `UPDATE RESERVA SET 
            data_hora = COALESCE(?, data_hora),
            duracao_min = COALESCE(?, duracao_min),
            status = COALESCE(?, status),
            atualizado_em = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [data_hora, duracao_min, status, id]
    );

    return await BuscarReservaPorId(id);
}

// Cancelar reserva
export async function CancelarReserva(id) {
    await db.execute(
        "UPDATE RESERVA SET STATUS = 'CANCELADO', ATUALIZADO_EM = CURRENT_TIMESTAMP WHERE ID = ?",
        [id]
    );
    return await BuscarReservaPorId(id);
}
