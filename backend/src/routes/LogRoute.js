import express from 'express';
import { 
    getLogs,
    getLogByUserId,
    getLogById 
} from '../controllers/logController.js';

const router = express.Router();

router.get('/logs/consultar', getLogs);
router.get('/logs/consultar/usuario/:id_usuario', getLogByUserId);
router.get('/logs/consultar/:id', getLogById);

export default router;
