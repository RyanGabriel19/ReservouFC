import { 
    SelectHorarioBloqueado, 
    SelectHorarioBloqueadoId, 
    InsertHorarioBloq, 
    UpdateHorarioBloquado, 
    DeleteHorario 
} from '../models/horarioBloqueadoModel.js';

// GET 
export async function getHorariosBloqueados(req, res) {
    try {
        const horarios = await SelectHorarioBloqueado();
        return res.status(200).json(horarios);
    } catch (err) {
        console.error("Erro ao buscar horários bloqueados:", err);
        return res.status(500).json({ error: "Erro interno ao buscar horários bloqueados" });
    }
}

// GET 
export async function getHorarioBloqueadoById(req, res) {
    const { id } = req.params;
    try {
        const horario = await SelectHorarioBloqueadoId(id);
        if (!horario) {
            return res.status(404).json({ error: "Horário bloqueado não encontrado" });
        }
        return res.status(200).json(horario);
    } catch (err) {
        console.error("Erro ao buscar horário bloqueado:", err);
        return res.status(500).json({ error: "Erro interno ao buscar horário bloqueado" });
    }
}

// POST 
export async function postHorarioBloqueado(req, res) {
    const { quadra_id, horario, motivo, criado_por } = req.body;
    try {
        const id = await InsertHorarioBloq({ quadra_id, horario, motivo, criado_por });
        return res.status(200).json({ id, message: "Horário bloqueado cadastrado com sucesso" });
    } catch (err) {
        console.error("Erro ao inserir horário bloqueado:", err);
        return res.status(500).json({ error: "Erro interno ao cadastrar horário bloqueado" });
    }
}

// PUT 
export async function putHorarioBloqueado(req, res) {
    const { id } = req.params;
    const { horario, motivo } = req.body;
    try {
        const horarioAtualizado = await UpdateHorarioBloquado(id, { horario, motivo });
        return res.status(200).json({ id: Number(id), message: "Horário bloqueado atualizado com sucesso", data: horarioAtualizado });
    } catch (err) {
        console.error("Erro ao atualizar horário bloqueado:", err);
        return res.status(500).json({ error: "Erro interno ao atualizar horário bloqueado" });
    }
}

// DELETE 
export async function deleteHorarioBloqueado(req, res) {
    const { id } = req.params;
    try {
        await DeleteHorario(id);
        return res.status(200).json({ id: Number(id), message: "Horário bloqueado removido com sucesso" });
    } catch (err) {
        console.error("Erro ao remover horário bloqueado:", err);
        return res.status(500).json({ error: "Erro interno ao remover horário bloqueado" });
    }
}