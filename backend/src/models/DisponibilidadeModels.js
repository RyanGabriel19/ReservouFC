import { db } from '../config/db.js'

export async function SelectDisponibilidade(){
    const [rows] = await db.query("SELECT * FROM DISPONIBILIDADE_SEMANA")
    return rows;
}

export async function SelectDisponibilidadePorId(id){
    const [rows] = await db.query("SELECT * FROM DISPONIBILIDADE_SEMANA")
    return rows[0];
}

export async function InsertDisponibilidade({quadra_id, dia_semana, hora_inicio, hora_fim, duracao_min, ativo}){
    const [result] = await db.execute(
        `INSERT INTO DISPONIBILIDADE_SEMANA (quadra_id, dia_semana, hora_inicio, hora_fim, duracao_min, ativo)
        VALUES(? ,? ,? ,? ,? ,?)`,
        [quadra_id, dia_semana, hora_inicio, hora_fim, duracao_min, ativo ?? 1]
    );
    return result.insertId;
}

export async function UpdateDisponibilidade(id,{dia_semana, hora_inicio, hora_fim, duracao_min, ativo}){
    try{
        const [result] = await db.execute(
            `UPDATE DISPONIBILIDADE_SEMANA SET
            dia_semana = COALESCE(?, dia_semana),
            hora_inicio = COALESCE(?, hora_inicio),
            hora_fim = COALESCE(?, hora_fim),
            duracao_min = COALESCE(?, duracao_min),
            ativo = COALESCE(?, ativo)
            WHERE id = ?`,
            [dia_semana, hora_inicio, hora_fim, duracao_min, ativo, id]
        );
        return await SelectDisponibilidadePorId(id);
    }catch(err){
        console.error("erro ao atualizar os dados da tabela de disponibilidade", err)
        throw err;
    }
     
}
//Chama a funcao assim
 // UptadeDisponibilidade(1, { dia_semana: null, hora_inicio: "09:00" })


 export async function DeleteDisponibilidade(id){
    await db.execute("DELETE FROM DISPONIBILIDADE_SEMANA WHERE ID  = ?", [id]);
 }
