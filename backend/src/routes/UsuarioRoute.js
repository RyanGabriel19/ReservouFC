import express from 'express';
//import {  autenticarToken } from '../middleware/autenticacao.js';

import { 
    //getPerfilUsuario,
    getUsuarios,
    getUsuarioPorEmail,
    //postUsuariosLogin,
    LoginUsuario,
    postUsuario,
    putUsuarios,
    deleteUsuario,
    getUsuarioPorId
 } from '../controllers/UsuarioController.js';

const router = express.Router();
//router.get('/perfil', autenticarToken, getPerfilUsuario);
router.get('/usuarios/consultar', getUsuarios);
router.get('/usuarios/consultar/email', getUsuarioPorEmail)
router.get('/usuarios/consultar/:id', getUsuarioPorId)
//router.post('/usuarios/entrar', postUsuariosLogin);
router.post('/usuarios/cadastrar', postUsuario);
router.post("/usuarios/login", LoginUsuario);
router.put('/usuarios/atualizar/:id', putUsuarios);
router.delete('/usuarios/deletar/:id', deleteUsuario);

export default router;