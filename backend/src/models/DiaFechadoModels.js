import { db } from '../config/db.js'

export async function SelectDiaFechado(){
    const [rows] = await db.query("SELECT * FROM DIA_FECHADO")
    return rows;
}

export async function SelectDiaFechadoPorId(id){
    const [rows] = await db.query("SELECT * FROM DIA_FECHADO WHERE id = ?", [id])
    return rows;
}

export async function InsertDiaFechado({ quadra_id, data_fechada, motivo}){
    const [result] = await db.execute(
        `INSERT INTO DIA_FECHADO (quadra_id, data_fechada, motivo)
        VALUES (?, ?, ?)`,
        [quadra_id, data_fechada, motivo]
    );
    return result.insertId;
}

export async function UpdateDiaFechado(id, {data_fechada, motivo}){
    await db.execute(
        `UPDATE DIA_FECHADO SET
        data_fechada = COALESCE(?, data_fechada),
        motivo = COALESCE(?, motivo)
        WHERE id = ?`, [data_fechada, motivo, id]

    );
    return await SelectDiaFechadoPorId(id);
}

export async function DeleteDiaFechado(id){
    await db.execute("DELETE FROM DIA_FECHADO WHERE id = ?", [id]);
}