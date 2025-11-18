import express from "express";
import{
    getQuadra,
    getQuadraID,
    postQuadra,
    putQuadra
} from '../controllers/QuadraController.js';

const router = express.Router();

router.get('/quadra/consultar', getQuadra);
router.get('/quadra/consultar/:id', getQuadraID);
router.post('/quadra/cadastrar', postQuadra);
router.put("/quadra/atualizar/:id", putQuadra);

export default router;