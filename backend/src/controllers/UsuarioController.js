import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";


import {
  selectUsuarios,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  insertUsuario,
  updateUsuario,
  deletarUsuario,
} from "../models/UsuarioModels.js"

export async function LoginUsuario(req, res){
  const {email, senha} = req.body;
  console.log(email);

  try{
    const usuario = await buscarUsuarioPorEmail(email);
    if(!usuario){
      return res.status(404).json({error: "usuario nao encontrado"});
    }
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if(!senhaValida){
      return res.status(401).json({error: "senha incorreta"})
    }

    const token = jwt.sign(
      {id:usuario.id, email:usuario.email},
      "ryan", //key
      {expiresIn:"2h"}
    ); 
    return res.status(200).json({
      message: "login realizado com sucesso",
      token,
      usuario : {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
        telefone: usuario.telefone,
    },
  });
}catch(err){
  console.error("error no login", err);
  return res.status(500).json({ error: "error interno ao realizar o login"})
}
}

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
  const { nome, telefone, email, senha } = req.body;

  if (!nome || !telefone || !email || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    // 1️⃣ Criptografar a senha
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // 2️⃣ Inserir usuário no banco com a senha codificada
    const id = await insertUsuario(nome, telefone, email, senhaHash);

    return res.status(201).json({ id, message: "Cadastro realizado com sucesso." });
  } catch (err) {
    console.error('Erro ao cadastrar o usuário: ', err);

    if (err.code === "ER_DUP_ENTRY") {
      const match = err.sqlMessage.match(/Duplicate entry '(.+)' for key '(.+)'/);
      let mensagem = "Dado duplicado";

      if (match) {
        const valorDuplicado = match[1];
        mensagem = `O "${valorDuplicado}" já está cadastrado.`;
      }

      return res.status(400).json({ error: mensagem });
    }

    return res.status(500).json({ error: 'Erro interno ao realizar o cadastro.' });
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
}
