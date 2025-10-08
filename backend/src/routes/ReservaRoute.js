import express from 'express';
import { 
    getReserva,
    getReservaId,
    getReservaUsuario,
    postReserva,
    putReserva,
    deleteReserva
} from '../controllers/ReservaController.js';

const router = express.Router();

router.get('/reservas/consultar', getReserva);
router.get('/reservas/consultar/:id', getReservaId);
router.get('/reservas/usuario/:usuario_id', getReservaUsuario);
router.post('/reservas/cadastrar', postReserva);
router.put('/reservas/atualizar/:id', putReserva);
router.delete('/reservas/deletar/:id', deleteReserva);

export default router;
