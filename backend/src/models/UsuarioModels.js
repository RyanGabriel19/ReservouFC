import {db} from "../config/db.js"

// selectUsuarios,
//   buscarUsuarios,
//   insertUsuarios,
//   updateUsuarios,
//   deletarUsuarios,
//   
//buscarUsuariosPorEmail 

// Selecionar todos os usuários
export async function selectUsuarios(){
    const [rows] = await db.query("SELECT * FROM USUARIO");
    return rows;
}

// Selecionar o usuário de acordo com seu email
export async function buscarUsuarioPorEmail(email){
    const [rows] = await db.query('SELECT * FROM USUARIO WHERE EMAIL = ?', [email]);
    return rows[0];
}

// Selecionar usuário pelo seu ID
export async function buscarUsuarioPorId(id){
    const [rows] = await db.query('SELECT * FROM USUARIO WHERE ID = ?', [id]);
    return rows[0];
}

// Inserir usuário
export async function insertUsuario(nome, telefone, email, senha){
    const [result] = await db.execute(
        "INSERT INTO USUARIO(nome, telefone, email, senha) VALUES(?, ?, ?, ?)", [nome, telefone, email, senha]
    );
    return result.insertId
}

// Atualizar usuário
export async function updateUsuario(id, nome, telefone, email, senha) {
    await db.execute(
        // Aqui ele vai verificar se a informação está nula. Se o usuário enviar um valor, o campo será atualizado. Se mandar NULL, o campo permanece como está.
        `UPDATE USUARIO
        SET
            NOME = COALESCE(?, NOME),
            TELEFONE =  COALESCE(?, TELEFONE),
            EMAIL =  COALESCE(?, EMAIL),
            SENHA =  COALESCE(?, SENHA)
        WHERE ID = ?;`, [nome, telefone, email, senha, id] ) 
}

// Deletar um usuário de acordo com seu ID (precisamos que o backend envie o ID do usuário conectado)
export async function deletarUsuario(id){
    const [result] = await db.execute("DELETE FROM USUARIO WHERE ID = ?", [id]);
    return result;
}