import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/UsuarioRoute.js'

const app = express()

// https://reservou-fc.vercel.app
//http://localhost:5173
const allowedOrigin = process.env.ALLOWED_ORIGIN;

const corsOptions = {
  origin: allowedOrigin
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(usuarioRoutes)



app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`servidor rodando na porta ${PORT}`)
});
