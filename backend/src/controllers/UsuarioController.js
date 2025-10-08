import jwt from 'jsonwebtoken';

import {
  selectUsuarios,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  insertUsuario,
  updateUsuario,
  deletarUsuario,
} from "../models/UsuarioModels.js"

//export async function getPerfilUsuario(req, res)

// Consulta de todos os usuários
export async function getUsuarios(req, res) {
  try {
    const usuarios = await selectUsuarios();
    res.status(200).json(usuarios);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
}

// Consulta de usuário por E-mail
export async function getUsuarioPorEmail(req, res) {
  const { email } = req.params;
  try {
    const usuario = await buscarUsuarioPorEmail(email);
    res.status(200).json(usuario)
  } catch (err) {
    console.error('Erro ao buscar o usuário por E-mail: ', err);
    res.status(500).json({ error: 'Erro ao buscar o usuário.'})
  }
}

// Consulta de usuário por ID
export async function getUsuarioPorId(req, res) {
  const { id } = req.params;
  try {
    const usuario = await buscarUsuarioPorId(id);
    res.status(200).json(usuario)
  } catch (err) {
    console.error('Erro ao buscar o usuário por Id: ', err);
    res.status(500).json({ error: 'Erro ao buscar o usuário.'})
  }
}

// Cadastro de usuário
export async function postUsuario(req, res) {
  const { nome, telefone, email, senha } = req.body
  try {
    const id = await insertUsuario(nome, telefone, email, senha) ;
    return res.status(200).json({ id, message: `Cadastro realizado com sucesso.`})
  } catch (err) {
    console.error('Erro ao cadastrar o usuário: ', err);
    return res.status(500).json({ error: 'Erro interno ao realizar o cadastro.'})
  }
}

// Atualização de usuário
export async function putUsuarios(req, res) {
  const { id } = req.params; // o id deve vir como um parâmetro no url
  const { nome, telefone, email, senha } = req.body;
  try {
    await updateUsuario(id, nome, telefone, email, senha)
    return res.status(200).json({
      id: Number(id),
      message: 'Usuário atualizado com sucesso.'
    });
  } catch (err) {
    console.error('Erro ao atualizar o parceiro: ', err);
    return res.status(500).json({ error: 'Erro interno ao atualizar o usuário. '})
  }
}

// Exclusão de usuário
export async function deleteUsuario(req, res) {
  const { id } = req.params;
  try {
    await deletarUsuario(id)
    return res.status(200).json({
      id: Number(id),
      message: 'Usuário deletado com sucesso.'
    })
  } catch (err) {
    console.error('Erro ao deletar o usuário: ', err);
    res.status(500).json({ error: 'Erro interno ao tentar deletar o usuário.'})
  }
} teste