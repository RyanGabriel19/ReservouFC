import express from 'express';

import{
     getHorariosBloqueados,
    getHorarioBloqueadoById,
    postHorarioBloqueado,
    putHorarioBloqueado,
    deleteHorarioBloqueado
} from '../controllers/HorarioBloqueadoController';

const router = express.Router();

router.get('/horario/consultar', getHorariosBloqueados);
router.get('/horario/consultar/:id', getHorarioBloqueadoById);
router.post('/horario/cadastrar', postHorarioBloqueado);
router.put('/horarios/atualizar/:id', putHorarioBloqueado);
router.delete('/horario/deletar/:id', deleteHorarioBloqueado);

export default router;