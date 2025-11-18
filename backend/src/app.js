import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/UsuarioRoute.js'
import quadraRoutes from './routes/QuadraRoute.js'
import ReservaRoute from './routes/ReservaRoute.js'
const app = express()
const PORT = process.env.PORT || 3000;

const allowedOrigin = process.env.ALLOWED_ORIGIN;
const corsOptions = {
  origin: allowedOrigin
};

app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());

// Rotas Existentes
app.use(usuarioRoutes)
app.use(quadraRoutes)
app.use(ReservaRoute)

app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`servidor rodando na porta ${PORT}`)
});
