import {
  SelectDisponibilidade,
  SelectDisponibilidadePorId,
  DeleteDisponibilidade,
  InsertDisponibilidade,
  UpdateDisponibilidade
} from "../models/DisponibilidadeModels.js";

// Consulta todas disponibilidades do banco de dados
export async function getDisponibilidades(req, res) {
  try {
    const disponibilidades = await SelectDisponibilidade();
    res.json(disponibilidades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Consulta disponibilidade por id
export async function getDisponibilidadeById(req, res) {
  try {
    const { id } = req.params;
    const disponibilidade = await SelectDisponibilidadePorId(id);

    if (!disponibilidade) {
      return res.status(404).json({ error: "Disponibilidade não encontrada." });
    }

    res.json(disponibilidade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Criar disponibilidade
export async function postDisponibilidade(req, res) {
  try {
    const id = await InsertDisponibilidade(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Atualizar disponibilidade (id como parâmetro)
export async function putDisponibilidade(req, res) {
  try {
    const { id } = req.params;
    const updated = await UpdateDisponibilidade(id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Disponibilidade não encontrada." });
    }

    res.json({ message: "Disponibilidade atualizada com sucesso." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Deletar disponibilidade (id como parâmetro)
export async function deleteDisponibilidade(req, res) {
  try {
    const { id } = req.params;
    const deleted = await DeleteDisponibilidade(id);

    if (!deleted) {
      return res.status(404).json({ error: "Disponibilidade não encontrada." });
    }

    res.json({ message: "Disponibilidade deletada com sucesso." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
