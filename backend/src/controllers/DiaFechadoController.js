import { 
    SelectDiaFechado, 
    SelectDiaFechadoPorId, 
    InsertDiaFechado, 
    UpdateDiaFechado, 
    DeleteDiaFechado 
} from '../models/diaFechadoModel.js';

// GET 
export async function getDiasFechados(req, res) {
    try {
        const dias = await SelectDiaFechado();
        return res.status(200).json(dias);
    } catch (err) {
        console.error("Erro ao buscar dias fechados:", err);
        return res.status(500).json({ error: "Erro interno ao buscar dias fechados" });
    }
}

// GET 
export async function getDiaFechadoById(req, res) {
    const { id } = req.params;
    try {
        const dia = await SelectDiaFechadoPorId(id);
        if (!dia || dia.length === 0) {
            return res.status(404).json({ error: "Dia fechado não encontrado" });
        }
        return res.status(200).json(dia[0]);
    } catch (err) {
        console.error("Erro ao buscar dia fechado:", err);
        return res.status(500).json({ error: "Erro interno ao buscar dia fechado" });
    }
}

// POST 
export async function postDiaFechado(req, res) {
    const { quadra_id, data_fechada, motivo } = req.body;
    try {
        const id = await InsertDiaFechado({ quadra_id, data_fechada, motivo });
        return res.status(200).json({ id, message: "Dia fechado cadastrado com sucesso" });
    } catch (err) {
        console.error("Erro ao inserir dia fechado:", err);
        return res.status(500).json({ error: "Erro interno ao cadastrar dia fechado" });
    }
}

// PUT 
export async function putDiaFechado(req, res) {
    const { id } = req.params;
    const { data_fechada, motivo } = req.body;
    try {
        const diaAtualizado = await UpdateDiaFechado(id, { data_fechada, motivo });
        return res.status(200).json({ id: Number(id), message: "Dia fechado atualizado com sucesso", data: diaAtualizado[0] });
    } catch (err) {
        console.error("Erro ao atualizar dia fechado:", err);
        return res.status(500).json({ error: "Erro interno ao atualizar dia fechado" });
    }
}

// DELETE 
export async function deleteDiaFechado(req, res) {
    const { id } = req.params;
    try {
        await DeleteDiaFechado(id);
        return res.status(200).json({ id: Number(id), message: "Dia fechado removido com sucesso" });
    } catch (err) {
        console.error("Erro ao remover dia fechado:", err);
        return res.status(500).json({ error: "Erro interno ao remover dia fechado" });
    }
}