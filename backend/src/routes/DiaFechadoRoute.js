import express from 'express';
import { 
    getDiasFechados,
    getDiaFechadoById,
    postDiaFechado,
    putDiaFechado,
    deleteDiaFechado
} from '../controllers/diaFechadoController.js';

const router = express.Router();

router.get('/dias/consultar', getDiasFechados);
router.get('/dias/consultar/:id', getDiaFechadoById);
router.post('/dias/cadastrar', postDiaFechado);
router.put('/dis/atualizar/:id', putDiaFechado);
router.delete('/dias/deletar/:id', deleteDiaFechado);

export default router;
