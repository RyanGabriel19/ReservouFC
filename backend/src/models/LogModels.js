import { db } from '../config/db.js'

export async function SelectLog(){
    const [rows] = await db.query("SELECT * FROM LOG")
    return rows;
}

export async function BuscarLogIdUsuario(id_usuario) {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM LOG WHERE ID_USUARIO = ?",
            [id_usuario]
        );

        if (rows.length === 0) {
            // Erro customizado para tratar no front
            const error = new Error("Log não encontrado");
            error.code = "NOT_FOUND"; 
            throw error;
        }

        return rows[0];
    } catch (err) {
        console.error("Erro ao buscar log por ID:", err);
        throw err; // repassa o erro
    }
}
export async function BuscarLogId(id){
    const [rows] = await db.query("SELECT * FROM LOG WHERE ID = ?", [id])
    return rows[0];
}

