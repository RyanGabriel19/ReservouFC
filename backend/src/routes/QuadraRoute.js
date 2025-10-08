import express from "express";
import{
    getQuadra,
    postQuadra,
    putQuadra
} from '../controllers/QuadraController';

const router = express.Router();

router.get('/quadra/consultar', getQuadra);
router.post('/quadra/cadastrar', postQuadra);
router.put("/quadra/atualizar/:id", putQuadra);

export default router;