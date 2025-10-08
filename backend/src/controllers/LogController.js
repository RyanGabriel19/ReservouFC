// controllers/logController.js
import { SelectLog,
     BuscarLogIdUsuario,
      BuscarLogId } from '../models/logModel.js';

/
export async function getLogs(req, res) {
    try {
        const logs = await SelectLog();
        return res.status(200).json(logs);
    } catch (err) {
        console.error("Erro ao buscar logs:", err);
        return res.status(500).json({ error: "Erro interno ao buscar logs" });
    }
}

export async function getLogByUserId(req, res) {
    const { id_usuario } = req.params;

    try {
        const log = await BuscarLogIdUsuario(id_usuario);
        return res.status(200).json(log);
    } catch (err) {
        if (err.code === "NOT_FOUND") {
            return res.status(404).json({ error: err.message });
        }
        console.error("Erro ao buscar log pelo usuário:", err);
        return res.status(500).json({ error: "Erro interno ao buscar log pelo usuário" });
    }
}


export async function getLogById(req, res) {
    const { id } = req.params;

    try {
        const log = await BuscarLogId(id);
        if (!log) {
            return res.status(404).json({ error: "Log não encontrado" });
        }
        return res.status(200).json(log);
    } catch (err) {
        console.error("Erro ao buscar log pelo ID:", err);
        return res.status(500).json({ error: "Erro interno ao buscar log pelo ID" });
    }
}
