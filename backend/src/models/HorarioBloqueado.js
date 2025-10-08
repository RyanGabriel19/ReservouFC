import { db } from '../config/db.js'

export async function SelectHorarioBloqueado(){
    const [rows] = await db.query("SELECT * FROM HORARIO_BLOQUEADO")
    return rows;
}

export async function SelectHorarioBloqueadoId(id){
    const [rows] = await db.query("SELECT *  FROM HORARIO_BLOQUEADO WHERE ID = ?", [id])
    return rows[0];
}

export async function InsertHorarioBloq({quadra_id, horario, motivo, criado_por}){
    const [result] = await db.execute(
        `INSERT INTO HORARIO_BLOQUEADO (quadra_id, horario, motivo, criado_por)
        VALUES (?, ?, ?, ?)`
        [quadra_id, horario, motivo, criado_por]
    );
    return result.insertId;
}

export async function UpdateHorarioBloquado(id,{horario, motivo}){
    await db.execute(
        `UPDATE HORARIO_BLOQUEADO SET
            horario = COALESCE(?, horario),
            motivo = COALESCE(?, motivo)
            WHERE id = ?`,
            [horario, motivo, id]
    );
    return await SelectHorarioBloqueadoId(id);
}

export async function DeleteHorario(id){
    await db.execute("DELETE FROM HORARIO_BLOQUEADO WHERE id = ?", [id])
}

