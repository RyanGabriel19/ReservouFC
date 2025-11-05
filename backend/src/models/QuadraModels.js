import { db } from '../config/db.js'

export async function SelectQuadra(){
    const [rows] = await db.query("SELECT * FROM QUADRA")
    return rows;
}
export async function SelectQuadraID(id){
    const [rows] = await db.query("SELECT * FROM QUADRA WHERE ID = ?", [id])
    return rows[0];
}

export async function InsertQuadra(nome, localizacao, valor_hora){
    const [result] = await db.execute(
        "INSERT INTO QUADRA(nome, localizacao, valor_hora) VALUES(?,?,?)",
        [nome, localizacao, valor_hora]
    );
    return result.insertId
}

export async function UpdateQuadra(id, {nome, localizacao, valor_hora}){
   try{
    const [result] = await db.execute(
        `UPDATE QUADRA SET 
        nome = COALESCE(?, nome),
        valor_hora = COALESCE(?, valor_hora), 
        localizacao = COALESCE(?, localizacao)
        WHERE ID = ?`, [nome, localizacao, valor_hora, id]);
        return result.affectedRows
     } catch(err){
            console.error("erro ao atualizar os dados da quadra", err);
            throw err;
        }
    
}

export async function DeleteQuadra(id){
    const [result] = await db.execute("DELETE FROM QUADRA WHERE ID = ?", [id])
    return result;
}