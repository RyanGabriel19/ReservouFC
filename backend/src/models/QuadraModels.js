import { db } from '../config/db.js'

export async function SelectQuadra(){
    const [rows] = await db.query("SELECT * FROM QUADRA")
    return rows;
}
export async function SelectQuadraID(id){
    const [rows] = await db.query("SELECT * FROM QUADRA WHERE ID = ?", [id])
    return rows[0];
}

export async function InsertQuadra(nome, localizacao, valor_hora, idUsuarioLogado){
    let connection;
    try {
        connection = await db.getConnection();

        await connection.query('SET @current_user_id = ?', [idUsuarioLogado])

        const [result] = await connection.execute(
        "INSERT INTO QUADRA(nome, localizacao, valor_hora) VALUES(?,?,?)",
        [nome, localizacao, valor_hora]
    );

    await connection.query('SET @current_user_id = NULL');

    return { id: result.insertId };

    } catch (err) {
        throw err;
    } finally {
        if (connection) connection.release();
    }

}

export async function UpdateQuadra(id, {nome, localizacao, valor_hora}, idUsuarioLogado){
    let connection;
    try {
        connection = await db.getConnection();

        await connection.query('SET @current_user_id = ?', [idUsuarioLogado]);

        const [result] = await connection.execute(
        `UPDATE QUADRA SET 
        nome = COALESCE(?, nome), 
        localizacao = COALESCE(?, localizacao),
        valor_hora = COALESCE(?, valor_hora)
        WHERE ID = ?`, [ nome ?? null,
        localizacao ?? null,
        valor_hora ?? null,
        id]);

        await connection.query('SET @current_user_id = NULL')

        return result.affectedRows

    } catch(err){
        console.error("erro ao atualizar os dados da quadra", err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    
}

export async function DeleteQuadra(id, idUsuarioLogado){
    let connection;
    try {
        connection = await db.getConnection();

        await connection.query('SET @current_user_id = ?', [idUsuarioLogado])

        const [result] = await db.execute("DELETE FROM QUADRA WHERE ID = ?", [id])

        await connection.query('SET @current_user_id = NULL')

        return result;

    } catch (err){
        throw err;
    } finally {
        if (connection) connection.release();
    }
    
}