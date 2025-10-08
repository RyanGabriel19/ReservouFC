import { db } from '../config/db.js'

export async function SelectQuadra(){
    const [rows] = await db.query("SELECT * FROM QUADRA")
    return rows;
}

export async function UpdateQuadra(id, {nome, valor_hora, ativo, localizacao}){
   try{
    const [result] = await db.execute(
        `UPDATE QUADRA SET 
        nome = COALESCE(?, nome),
        valor_hora = COALESCE(?, valor_hora), 
        ativo = COALESCE(?, ativo), 
        localizacao = COALESCE(?, localizacao)
        WHERE ID = ?`, [nome, valor_hora, ativo, localizacao, id]);
        return result.affectedRows
     } catch(err){
            console.error("erro ao atualizar os dados da quadra", err);
            throw err;
        }
    
}

export async function InsertQuadra(nome, valor_hora, ativo, localizacao){
    const [result] = await db.execute(
        "INSERT INTO QUADRA(nome, valor_hora, ativo, localizacao) VALUES(?,?,?,?)",
        [nome, valor_hora, ativo, localizacao]
    );
    return result.insertId
}

export async function DeletQuadra(id){
    const [result] = await db.execute("DELET FROM QUADRA WHERE ID = ?", [id])
    return result;
}