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


export async function criarReserva({ quadra_id, usuario_id, data_hora, duracao_min, valor }, idUsuarioLogado) {
    const disponivel = await QuadraDisponivel(quadra_id, data_hora);
    if (!disponivel) {
        throw new Error("Quadra já está reservada nesse horário");
    }

    let connection;

    try {
        connection = await db.getConnection();

        await connection.query('SET @current_user_id = ?', [idUsuarioLogado])

        const [result] = await connection.execute(
        `INSERT INTO RESERVA (quadra_id, usuario_id, data_hora, duracao_min, valor, status)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [quadra_id, usuario_id, data_hora, duracao_min || 60, valor || 0.0, 'PENDENTE']
        );

        await connection.query('SET @current_user_id = NULL')

        return result.insertId;
    } catch (err) {
        throw err;
    } finally {
        if (connection) connection.release()
    }
    
}


export async function BuscarReservaPorId(id) {
    const [rows] = await db.query("SELECT * FROM RESERVA WHERE ID = ?", [id]);
    return rows[0] || null;
}

export async function BuscarReservaUsuario(usuario_id) {
    const [rows] = await db.query("SELECT * FROM RESERVA WHERE USUARIO_ID = ?", [usuario_id]);
    return rows;
}


export async function AtualizarReserva(id, { data_hora, duracao_min, status }, idUsuarioLogado) {
    if (data_hora) {
        const reserva = await BuscarReservaPorId(id);
        if (!reserva) throw new Error("Reserva não encontrada");

        if (reserva.data_hora !== data_hora) {
            const disponivel = await QuadraDisponivel(reserva.quadra_id, data_hora);
            if (!disponivel) throw new Error("Novo horário não disponível");
        }
    }
    const novoDataHora = data_hora ?? null;
    const novoDuracao = duracao_min ?? null;
    const novoStatus = status ?? null;

    let connection;
    try {
        connection = await db.getConnection();

        // Define o usuário para o log
        await connection.query('SET @current_user_id = ?', [idUsuarioLogado]);

        await connection.execute(
            `UPDATE RESERVA SET 
                data_hora = COALESCE(?, data_hora),
                duracao_min = COALESCE(?, duracao_min),
                status = COALESCE(?, status),
                atualizado_em = CURRENT_TIMESTAMP
             WHERE id = ?`,
            [novoDataHora, novoDuracao, novoStatus, id]
        );

        await connection.query('SET @current_user_id = NULL');

    } catch (err) {
        throw err;
    } finally {
        if (connection) connection.release();
    }

    return await BuscarReservaPorId(id);
}

// Cancelar reserva
export async function CancelarReserva(id, idUsuarioLogado) {
    let connection;
    try {
        connection = await db.getConnection();

        await connection.query('SET @current_user_id = ?', [idUsuarioLogado]);

        await connection.execute(
        `UPDATE RESERVA SET STATUS = 'CANCELADO', ATUALIZADO_EM = CURRENT_TIMESTAMP WHERE ID = ?`,
        [id]
        );

        await connection.query('SET @current_user_id = NULL');
                
    } catch (err) {
        throw err;
    } finally {
        if (connection) connection.release();
    }

    return await BuscarReservaPorId(id);
    
}
