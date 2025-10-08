import express from 'express';
import { 
  getDisponibilidades, 
  getDisponibilidadeById, 
  postDisponibilidade, 
  putDisponibilidade, 
  deleteDisponibilidade 
} from '../controllers/DisponibilidadeController.js';

const router = express.Router();

router.get('/disponibilidades/consultar', getDisponibilidades);
router.get('/disponibilidades/consultar/:id', getDisponibilidadeById);
router.post('/disponibilidades/cadastrar', postDisponibilidade);
router.put('/disponibilidades/atualizar/:id', putDisponibilidade);
router.delete('/disponibilidades/deletar/:id', deleteDisponibilidade);

export default router;
